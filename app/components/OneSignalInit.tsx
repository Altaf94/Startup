'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    OneSignal?: any;
  }
}

export function OneSignalInit() {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    
    if (!appId) {
      console.warn('OneSignal App ID not configured');
      return;
    }

    // Load OneSignal SDK
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    
    const script = document.createElement('script');
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    script.defer = true;
    document.head.appendChild(script);

    window.OneSignalDeferred.push(async function(OneSignal: any) {
      await OneSignal.init({
        appId: appId,
        allowLocalhostAsSecureOrigin: true, // For development
        notifyButton: {
          enable: true, // Show the notification bell
          size: 'medium',
          position: 'bottom-right',
          prenotify: true,
          showCredit: false,
          text: {
            'tip.state.unsubscribed': 'Subscribe to order notifications',
            'tip.state.subscribed': 'You\'re subscribed to notifications',
            'tip.state.blocked': 'You\'ve blocked notifications',
            'dialog.main.title': 'Manage Notifications',
            'dialog.main.button.subscribe': 'SUBSCRIBE',
            'dialog.main.button.unsubscribe': 'UNSUBSCRIBE',
          },
        },
        welcomeNotification: {
          title: 'The Saucy Pan',
          message: 'You will now receive order notifications!',
        },
      });
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}
