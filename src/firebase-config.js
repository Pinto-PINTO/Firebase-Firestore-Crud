import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATNMHodUguypIvL0nmLEdfP1zMSaaLz78",
  authDomain: "react-book-crud.firebaseapp.com",
  projectId: "react-book-crud",
  storageBucket: "react-book-crud.appspot.com",
  messagingSenderId: "933086480787",
  appId: "1:933086480787:web:10a70c4307787fd5be8066",
  measurementId: "G-7SJVJX6E7L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
