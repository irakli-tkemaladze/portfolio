import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDh5qsy73Jn6HUqf8ASXz32CgcpetJEF5I",
  authDomain: "project-1-e442b.firebaseapp.com",
  databaseURL: "https://project-1-e442b-default-rtdb.firebaseio.com",
  projectId: "project-1-e442b",
  storageBucket: "project-1-e442b.appspot.com",
  messagingSenderId: "277379812321",
  appId: "1:277379812321:web:a4e362049f42b989a060a0",
  measurementId: "G-Z3BGHP2JTJ",
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
