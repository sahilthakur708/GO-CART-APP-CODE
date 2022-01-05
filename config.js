import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyD0mHdiO9JIWvaBPVwqBvPAGqG55wKejr4",
  authDomain: "go-cart-f031a.firebaseapp.com",
  projectId: "go-cart-f031a",
  storageBucket: "go-cart-f031a.appspot.com",
  messagingSenderId: "779131767847",
  appId: "1:779131767847:web:235d779feea6382061d202",
  measurementId: "G-5STSCPNZS1"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
