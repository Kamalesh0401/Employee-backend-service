const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://employee-details-80ab4.firebaseio.com'
});

const db = admin.firestore();

module.exports = db;
