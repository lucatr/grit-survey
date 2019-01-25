import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD3__KgjYyEzRt4Luyyu99wv0xQKIJw224',
  authDomain: 'grit-survey.firebaseapp.com',
  databaseURL: 'https://grit-survey.firebaseio.com',
  projectId: 'grit-survey',
  storageBucket: 'grit-survey.appspot.com',
  messagingSenderId: '66374232966',
};

firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

export default db;