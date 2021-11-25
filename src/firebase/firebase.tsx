import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIJaWiJa9Mc2CuEhTlyXPKHBCBu-q9fos",
    authDomain: "carb-cycling-planner.firebaseapp.com",
    projectId: "carb-cycling-planner",
    storageBucket: "carb-cycling-planner.appspot.com",
    messagingSenderId: "1041834545686",
    appId: "1:1041834545686:web:b14aedb8931a9ed2a61b37",
    measurementId: "G-JC2WC4XRQD"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore();
