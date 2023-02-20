// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDzUkDmXRepWIZxhwUQs4AVd-__LAdH98k",
    authDomain: "flat-zone-9f598.firebaseapp.com",
    projectId: "flat-zone-9f598",
    storageBucket: "flat-zone-9f598.appspot.com",
    messagingSenderId: "1083728366416",
    appId: "1:1083728366416:web:ef021a170b9db8ecdd3a55",
    measurementId: "G-ZWKBPLR54E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authentication = getAuth();
export const storage = getStorage(app);


