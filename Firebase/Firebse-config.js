import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBm830sMsqGfFB2JxyY_OJiQrx_Z2sjDQI",
  authDomain: "ctse-app1.firebaseapp.com",
  databaseURL:
    "https://ctse-app1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ctse-app1",
  storageBucket: "ctse-app1.appspot.com",
  messagingSenderId: "507123515577",
  appId: "1:507123515577:web:3de01ec62973b59c1a5b68",
  measurementId: "G-4B2Y4S43JB",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
export { firebase };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const auth = getAuth(app);

// export { app, db, storage, auth };
