import * as Firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBbSWqoToaDUaH5MHPN8xjVPzo6jtvKbxo",
  authDomain: "library-357fa.firebaseapp.com",
  databaseURL: "https://library-357fa.firebaseio.com",
  storageBucket: "library-357fa.appspot.com",
  messagingSenderId: "338664189898"
};

const firebase = Firebase.initializeApp(config);

export const database = firebase.database()
export const auth = firebase.auth()
