import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD2PfHUSK2ncm7yLhIOlwGN5i09ZsvfoBs",
  authDomain: "clothcommerce-976ad.firebaseapp.com",
  databaseURL: "https://clothcommerce-976ad-default-rtdb.firebaseio.com",
  projectId: "clothcommerce-976ad",
  storageBucket: "clothcommerce-976ad.appspot.com",
  messagingSenderId: "134225688596",
  appId: "1:134225688596:web:b1b734dd993e6dd4f80f01",
  measurementId: "G-0V0J4LST90"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const gooleAuth= new GoogleAuthProvider()

export const db = getFirestore(app)