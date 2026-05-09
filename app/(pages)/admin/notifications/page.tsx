'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, BellOff, CheckCircle, Loader2 } from 'lucide-react';

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
  const oneSignalRef = useRef<any>(null);

  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    
    if (!appId) {
      setError('OneSignal App ID not configured. Add NEXT_PUBLIC_ONESIGNAL_APP_ID to environment variables.');
      setIsLoading(false);
      return;
    }

    // Load OneSignal SDK
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    
    // Check if script already exists
    if (!document.querySelector('script[src*="OneSignalSDK"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
      script.defer = true;
      document.head.appendChild(script);
    }

    window.OneSignalDeferred.push(async function(OneSignal: any) {
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
        setError('Failed to initialize: ' + (err?.message || 'Unknown error'));
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
