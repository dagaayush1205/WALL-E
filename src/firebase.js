import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCjTEd4ImbFU76ty1vhldo19KA7TpAIoAY",
    authDomain: "women-safety-sos-1b356.firebaseapp.com",
    projectId: "women-safety-sos-1b356",
    storageBucket: "women-safety-sos-1b356.appspot.com",
    messagingSenderId: "693725542623",
    appId: "1:693725542623:web:a3d68e8ef4522c2085516a",
    measurementId: "G-3Q9J8EX619"
  };

/*firebase.initializeApp(firebaseConfig);*/
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging = firebase.messaging();

export const getToken = () => {
  return messaging.getToken().then((token) => {
    console.log('FCM Token:', token);
    return token;
  }).catch((error) => {
    console.error('Error getting token', error);
  });
};
