// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage'; // if using Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyDDQMalsgxVBK9WADcO93gX3oPrVh2YxWU",
    authDomain: "subsync-89795.firebaseapp.com",
    projectId: "subsync-89795",
    storageBucket: "subsync-89795.appspot.com",
    messagingSenderId: "414928180856",
    appId: "1:414928180856:web:681bb4a02f80d58ae27f8d",
    measurementId: "G-QFJCP466LC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app); // if using Firebase Storage

// Export for use in other files
export { auth, db};