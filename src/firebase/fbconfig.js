import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

//configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAD138dGOOJ9sz_ASkKcofsZkNyZUUyEI',
  authDomain: 'blog-app-41cd7.firebaseapp.com',
  databaseURL: 'https://blog-app-41cd7.firebaseio.com',
  projectId: 'blog-app-41cd7',
  storageBucket: 'blog-app-41cd7.appspot.com',
  messagingSenderId: '1083609204631',
  appId: '1:1083609204631:web:ae6751321fea45716e66d2',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export { firebase as default, rrfConfig };
