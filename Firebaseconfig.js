// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDPciWKCPjUli5ygCJZ2g-tQ9fLGcWsfI",
    authDomain: "groceries-f2994.firebaseapp.com",
    projectId: "groceries-f2994",
    storageBucket: "groceries-f2994.appspot.com",
    messagingSenderId: "908226267338",
    appId: "1:908226267338:web:a86ae9e556f50911130c33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app)
const database = getFirestore()

export { authentication, database }