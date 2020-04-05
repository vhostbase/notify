/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.13.0/firebase-messaging.js')

/*
Initialize the Firebase app in the service worker by passing in the messagingSenderId.
*/
firebase.initializeApp({
    'messagingSenderId': '740835687702'
})

/*
Retrieve an instance of Firebase Messaging so that it can handle background messages.
*/
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
        body: notification.body,
        icon: notification.icon,
		vibrate: [100, 50, 100],
		actions: [{
          action: 'coffee-action',
          title: 'Coffee',
          icon: '/images/demos/action-1-128x128.png'
        },
        {
          action: 'doughnut-action',
          title: 'Doughnut',
          icon: '/images/demos/action-2-128x128.png'
        },
        {
          action: 'gramophone-action',
          title: 'gramophone',
          icon: '/images/demos/action-3-128x128.png'
        },
        {
          action: 'atom-action',
          title: 'Atom',
          icon: '/images/demos/action-4-128x128.png'
        }]
    };
	//window.open();
    return self.registration.showNotification(notificationTitle,
        notificationOptions);

/*const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;*/
});