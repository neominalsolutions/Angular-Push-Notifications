import { USER_SUBSCRIPTIONS } from './in-memory-db';
const webpush = require('web-push');
// web-push paketi ile push notification atarız
// npm install web-push -g
// web-push generate-vapid-keys --json public key oluşturma

// 1. Push Server, bazı JSON bilgilerini private anahtarıyla imzalar
// 2. imzalanan bilgiler push service'a header üzerinden http post ile gönderilir.
// 3. client headerdan gönderilen public key'in push service'in private key tarafından imzalanıp imzalanmadığı kontrol edilir
// 4. client gönderdiği public key valid ise push notification atılır.

export function addPushSubscriber(req, res) {
  const sub = req.body;
  console.log('sub', sub);
  // web-push server subscribe olurken public key üzerinden abone olan uygulama kontrolü yapılır.
  USER_SUBSCRIPTIONS.push(sub);
  res.status(200).json({message: 'Subscription added successfully.'});
}

export function sendNotification(req, res) {
  // notification payload
  const notificationPayload = {
    notification: {
      title: 'OpenExO',
      body: 'You have a new message in the opportunity Community engagement',
      icon: 'assets/openexo_thumbnail.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [{
        action: 'explore',
        title: 'See opportunity'
      }]
    }
  };

  // USER_SUBSCRIPTIONS in-memory olarak subscriber oluşturduk. Bu subscriberlara webpush üzerinden sendNotification yaptık.
  Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
    sub, JSON.stringify(notificationPayload) )))
    .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
    .catch(err => {
      console.error('Error sending notification, reason: ', err);
      res.sendStatus(500);
    });

}
