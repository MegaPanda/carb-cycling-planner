import { initializeApp } from "firebase/app";
import { getFirestore, FirestoreDataConverter, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { getKeywords } from "../helpers/helpers";
import { Food } from "../redux/reducers/userSlice";

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

export const foodDocConverter: FirestoreDataConverter<Food> = {
    toFirestore: (food: Food) => {
        return {
            ...food,
            keywords: [...getKeywords(food.name)]
        }
    },
    fromFirestore: (foodDoc: QueryDocumentSnapshot<DocumentData>) => {
        const data = foodDoc.data() as Food;
        delete data.keywords;
        return {
            ...data
        }
    }
};