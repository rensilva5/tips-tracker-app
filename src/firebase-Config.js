// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider} from  'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// import JSON from 'json3'

// const firebaseConfig = (process.env.FIREBASE_CONFIG);
const firebaseConfig = {
    
  };
  


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
// const analytics = getAnalytics(app);
