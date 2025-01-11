import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAD3w8_wJBJPhI38uMEJHFs7w3qpz87JLA",
    authDomain: "project-zen-1dc8e.firebaseapp.com",
    projectId: "project-zen-1dc8e",
    storageBucket: "project-zen-1dc8e.firebasestorage.app",
    messagingSenderId: "1040406421937",
    appId: "1:1040406421937:web:474c5998c6e32e9fb75d90",
    measurementId: "G-FG7MSPS612"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase)

