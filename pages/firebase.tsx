// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage'; // if using Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCMOFIgb1T_IdSnp4j05UwNKBsKb54qsFc",
    authDomain: "finlit23-70365.firebaseapp.com",
    databaseURL: "https://finlit23-70365-default-rtdb.firebaseio.com",
    projectId: "finlit23-70365",
    storageBucket: "finlit23-70365.appspot.com",
    messagingSenderId: "91956313937",
    appId: "1:91956313937:web:ddd833c708ea8e16ef1d70",
    measurementId: "G-NDZXH1V5KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app); // if using Firebase Storage

// Export for use in other files
export { auth, db };