const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const serviceAccount = require('./service-account-file.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/send-notification', (req, res) => {
  const { token, message } = req.body;

  const payload = {
    notification: {
      title: 'SOS Alert!',
      body: message,
    },
  };

  admin.messaging().sendToDevice(token, payload)
    .then(response => {
      console.log('Successfully sent message:', response);
      res.status(200).send('Notification sent');
    })
    .catch(error => {
      console.error('Error sending message:', error);
      res.status(500).send('Failed to send notification');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
