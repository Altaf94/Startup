'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, CheckCircle, Loader2, Share, Plus, Zap } from 'lucide-react';

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    OneSignal?: any;
  }
}

// VAPID public key for direct push subscription
const VAPID_PUBLIC_KEY = 'BKT14c4lbywJXA5HLebK3qQRB6fjuxDZdr3wBSIUeq_OLlZE_nHxEiYdJNhXfmv0rLArLmTJH5bBO_3LP12vMD8';

export default function AdminNotificationsPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState('');
  const [isIOS, setIsIOS] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const [useDirectMethod, setUseDirectMethod] = useState(false);
  const [testResult, setTestResult] = useState('');
  const oneSignalRef = useRef<any>(null);
  const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || 'a7a990dd-02e8-4d63-bf78-0f75cc879629';

  useEffect(() => {
    // Detect iOS browsers that support home-screen web push.
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
    
    // Check if running as PWA (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
    setIsPWA(standalone);
    
    // Check if already subscribed via direct method
    checkDirectSubscription();
    
    // If iOS but not PWA, don't try to load OneSignal
    if (iOS && !standalone) {
      setIsLoading(false);
      return;
    }
    
    // For iOS PWA, prefer direct method to avoid SDK timeout issues
    if (iOS && standalone) {
      setUseDirectMethod(true);
      setIsLoading(false);
      return;
    }
    
    const appId = oneSignalAppId;
    
    if (!appId) {
      setError('OneSignal App ID not configured. Add NEXT_PUBLIC_ONESIGNAL_APP_ID to Vercel environment variables.');
      setIsLoading(false);
      return;
    }

    // The SDK is loaded in the app head using the documented OneSignal setup.
    window.OneSignalDeferred = window.OneSignalDeferred || [];

    // Timeout - if OneSignal never becomes ready, show a useful error.
    const timeout = setTimeout(() => {
      if (!oneSignalRef.current) {
        // Switch to direct method if SDK times out
        console.log('OneSignal SDK timed out, switching to direct method');
        setUseDirectMethod(true);
        setIsLoading(false);
      }
    }, 10000);

    window.OneSignalDeferred.push(async function(OneSignal: any) {
      clearTimeout(timeout);
      try {
        // Store reference
        oneSignalRef.current = OneSignal;
        setSdkReady(true);

        // Wait a moment for SDK to fully initialize
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check current subscription status safely
        let isCurrentlySubscribed = false;
        try {
          const permission = OneSignal.Notifications?.permission;
          const optedIn = await OneSignal.User?.PushSubscription?.optedIn;
          isCurrentlySubscribed = !!(permission && optedIn);
        } catch {
          isCurrentlySubscribed = false;
        }
        
        setIsSubscribed(isCurrentlySubscribed);
        setIsLoading(false);
      } catch (err: any) {
        console.error('OneSignal init error:', err);
        // Switch to direct method on error
        setUseDirectMethod(true);
        setIsLoading(false);
      }
    });

    return () => clearTimeout(timeout);
  }, [oneSignalAppId]);

  // Check if already subscribed via direct method
  const checkDirectSubscription = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        setIsSubscribed(true);
        localStorage.setItem('admin_notif_subscribed', 'true');
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  // Direct subscription using native Web Push API
  const handleDirectSubscribe = async () => {
    setIsSubscribing(true);
    setError('');

    try {
      console.log('Starting subscription process...');
      
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        setError('Push notifications are not supported in this browser');
        setIsSubscribing(false);
        return;
      }

      console.log('Registering service worker...');
      // Register service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker registered, waiting for ready...');
      await navigator.serviceWorker.ready;
      console.log('Service worker ready!');

      // Request permission
      console.log('Requesting notification permission...');
      const permission = await Notification.requestPermission();
      console.log('Permission result:', permission);
      
      if (permission !== 'granted') {
        setError('Permission denied. Please allow notifications in your browser settings.');
        setIsSubscribing(false);
        return;
      }

      // Subscribe to push notifications
      console.log('Creating push subscription...');
      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
        console.log('Push subscription created:', subscription.endpoint);

        // Send subscription to backend
        console.log('Sending subscription to backend...');
        const response = await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription.toJSON()),
        });

        console.log('Backend response status:', response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Subscription saved successfully:', result);

        setIsSubscribed(true);
        localStorage.setItem('admin_notif_subscribed', 'true');
        
      } catch (subError: any) {
        console.error('Subscription creation error:', subError);
        throw new Error(`Subscription failed: ${subError.message}`);
      }
      
    } catch (err: any) {
      console.error('Direct subscription error:', err);
      setError(err?.message || 'Failed to subscribe. Check console for details.');
    } finally {
      setIsSubscribing(false);
    }
  };

  // Helper function to convert VAPID key
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Direct unsubscribe
  const handleDirectUnsubscribe = async () => {
    setIsSubscribing(true);
    
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        // Unsubscribe from push
        await subscription.unsubscribe();
        
        // Remove from backend
        await fetch('/api/push/subscribe', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
      }
      
      setIsSubscribed(false);
      localStorage.removeItem('admin_notif_subscribed');
    } catch (err: any) {
      console.error('Unsubscribe error:', err);
      setError(err?.message || 'Failed to unsubscribe');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    setError('');

    try {
      const OneSignal = oneSignalRef.current || window.OneSignal;
      
      if (!OneSignal || !OneSignal.Notifications) {
        // Try waiting a bit more
        await new Promise(resolve => setTimeout(resolve, 1000));
        const retryOneSignal = oneSignalRef.current || window.OneSignal;
        if (!retryOneSignal || !retryOneSignal.Notifications) {
          setError('Notification service is loading. Please wait a few seconds and try again.');
          setIsSubscribing(false);
          return;
        }
      }
      
      const os = oneSignalRef.current || window.OneSignal;
      
      // Request permission
      await os.Notifications.requestPermission();
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Check if permission was granted
      const permission = os.Notifications?.permission;
      
      if (permission) {
        // Tag this user as admin - ONLY admins get order notifications
        await os.User.addTag('role', 'admin');
        setIsSubscribed(true);
        // Save to localStorage so the bell icon disappears
        localStorage.setItem('admin_notif_subscribed', 'true');
      } else {
        setError('Permission denied. Please allow notifications in your browser settings.');
      }
    } catch (err: any) {
      console.error('Subscription error:', err);
      setError(err?.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsSubscribing(true);
    
    try {
      const OneSignal = oneSignalRef.current || window.OneSignal;
      if (!OneSignal) {
        setError('Notification service not ready');
        setIsSubscribing(false);
        return;
      }
      await OneSignal.User?.PushSubscription?.optOut();
      await OneSignal.User?.removeTag('role');
      setIsSubscribed(false);
      // Remove from localStorage so the bell icon reappears
      localStorage.removeItem('admin_notif_subscribed');
    } catch (err: any) {
      console.error('Unsubscribe error:', err);
      setError(err?.message || 'Failed to unsubscribe');
    } finally {
      setIsSubscribing(false);
    }
  };

  // Show iOS install instructions if on iOS but not PWA
  if (isIOS && !isPWA) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24 pb-20">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Add To Home Screen First</h1>
              <p className="text-gray-600 mt-2">
                iPhone web push only works after this website is added to your home screen and opened from there.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">How to install:</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <p>Open this page in Safari, then tap the <strong>Share</strong> button</p>
                    <div className="flex items-center gap-1 text-blue-600 mt-1">
                      <Share className="w-5 h-5" />
                      <span className="text-sm">(at the bottom of Safari)</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <p>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong></p>
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <Plus className="w-5 h-5" />
                      <span className="text-sm">Add to Home Screen</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <p>Tap <strong>&quot;Add&quot;</strong> in the top right corner</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <p>Open the installed app from your home screen, then tap the bell or return to this page to subscribe</p>
                </li>
              </ol>
            </div>

            <p className="text-sm text-gray-500 text-center">
              Apple requires this exact flow before the native notification prompt can appear.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Notifications</h1>
            <p className="text-gray-600 mt-2">
              Subscribe to receive instant push notifications when customers place orders
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
            </div>
          ) : isSubscribed ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold">You&apos;re subscribed!</span>
              </div>
              <p className="text-gray-600 mb-6">
                You will receive push notifications on this device when new orders come in.
              </p>
              <button
                onClick={handleTestNotification}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-3"
              >
                <Bell className="w-5 h-5" />
                Send Test Notification
              </button>
              {testResult && (
                <div className={`mb-3 p-2 rounded text-sm ${testResult.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {testResult}
                </div>
              )}
              <button
                onClick={useDirectMethod ? handleDirectUnsubscribe : handleUnsubscribe}
                disabled={isSubscribing}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                {isSubscribing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <BellOff className="w-5 h-5" />
                )}
                Unsubscribe
              </button>
            </div>
          ) : (
            <div className="text-center">
              {useDirectMethod ? (
                <>
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 justify-center text-blue-700 mb-2">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">Direct Method</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      Using native browser push (faster, no SDK needed)
                    </p>
                  </div>
                  <button
                    onClick={handleDirectSubscribe}
                    disabled={isSubscribing}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                  >
                    {isSubscribing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Bell className="w-5 h-5" />
                    )}
                    Subscribe to Order Notifications
                  </button>
                </>
              ) : !sdkReady && !error ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading notification service...</span>
                  </div>
                  <button
                    onClick={handleDirectSubscribe}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-3"
                  >
                    <Zap className="w-5 h-5" />
                    Use Direct Method Instead
                  </button>
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    <Bell className="w-5 h-5" />
                    Please wait...
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSubscribe}
                    disabled={isSubscribing || !sdkReady}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 mb-3"
                  >
                    {isSubscribing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Bell className="w-5 h-5" />
                    )}
                    Subscribe with OneSignal
                  </button>
                  <button
                    onClick={handleDirectSubscribe}
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Zap className="w-5 h-5" />
                    Or Use Direct Method
                  </button>
                </>
              )}
              <p className="text-sm text-gray-500 mt-4">
                Only you (admins) will receive these notifications, not customers.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">How it works:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Click &quot;Subscribe&quot; and allow notifications</li>
              <li>✅ You&apos;ll get instant alerts on this device when orders come in</li>
              <li>✅ Subscribe on multiple devices (phone, laptop) for redundancy</li>
              <li>✅ Only admin-subscribed devices receive order notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
