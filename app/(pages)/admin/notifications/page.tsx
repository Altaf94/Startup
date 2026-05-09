'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, CheckCircle, Loader2, Share, Plus } from 'lucide-react';

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    OneSignal?: any;
  }
}

export default function AdminNotificationsPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [error, setError] = useState('');
  const [isIOS, setIsIOS] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const oneSignalRef = useRef<any>(null);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);
    
    // Check if running as PWA (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;
    setIsPWA(standalone);
    
    // If iOS but not PWA, don't try to load OneSignal
    if (iOS && !standalone) {
      setIsLoading(false);
      return;
    }
    
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    
    if (!appId) {
      setError('OneSignal App ID not configured. Add NEXT_PUBLIC_ONESIGNAL_APP_ID to Vercel environment variables.');
      setIsLoading(false);
      return;
    }

    // Timeout - if SDK doesn't load in 10 seconds, show error
    const timeout = setTimeout(() => {
      if (isLoading) {
        setError('OneSignal is taking too long to load. Please ensure Web Push is configured in OneSignal dashboard for your domain.');
        setIsLoading(false);
      }
    }, 10000);

    // Load OneSignal SDK
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    
    // Check if script already exists
    if (!document.querySelector('script[src*="OneSignalSDK"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
      script.defer = true;
      script.onerror = () => {
        clearTimeout(timeout);
        setError('Failed to load notification script. Check your internet connection.');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    }

    window.OneSignalDeferred.push(async function(OneSignal: any) {
      clearTimeout(timeout);
      try {
        await OneSignal.init({
          appId: appId,
          allowLocalhostAsSecureOrigin: true,
        });

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
        setError('Failed to initialize: ' + (err?.message || 'Unknown error. Make sure Web Push is configured in OneSignal for this domain.'));
        setIsLoading(false);
      }
    });
  }, []);

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
              <h1 className="text-2xl font-bold text-gray-900">Install App First</h1>
              <p className="text-gray-600 mt-2">
                To receive push notifications on iPhone, you need to install this website as an app.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">How to install:</h3>
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <p>Tap the <strong>Share</strong> button</p>
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
                  <p>Open the app from your home screen and return to this page</p>
                </li>
              </ol>
            </div>

            <p className="text-sm text-gray-500 text-center">
              After installing, you&apos;ll be able to subscribe to push notifications.
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
                onClick={handleUnsubscribe}
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
              {!sdkReady && !error ? (
                <>
                  <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading notification service...</span>
                  </div>
                  <button
                    disabled
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                  >
                    <Bell className="w-5 h-5" />
                    Please wait...
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribing || !sdkReady}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {isSubscribing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Bell className="w-5 h-5" />
                  )}
                  Subscribe to Order Notifications
                </button>
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
