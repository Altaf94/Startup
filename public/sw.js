// Simple service worker for web push notifications
self.addEventListener('push', function(event) {
  if (!event.data) {
    return;
  }

  try {
    const data = event.data.json();
    const title = data.title || 'New Order!';
    const options = {
      body: data.body || 'You have a new order',
      icon: data.icon || '/icon-192.png',
      badge: '/icon-192.png',
      data: data.data || {},
      tag: data.tag || 'order-notification',
      requireInteraction: true,
      vibrate: [200, 100, 200],
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } catch (e) {
    console.error('Error showing notification:', e);
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // Open the order tracking page when notification is clicked
  event.waitUntil(
    clients.openWindow('/admin/notifications')
  );
});

// Install and activate events
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});
