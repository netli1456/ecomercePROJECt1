
import { initializeApp } from "firebase/app";
import {  getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPMEeGA9wKfPXTJ611OC1tn670fhaTyqY",
  authDomain: "ecommerce-project1-da0e3.firebaseapp.com",
  projectId: "ecommerce-project1-da0e3",
  storageBucket: "ecommerce-project1-da0e3.appspot.com",
  messagingSenderId: "125124364246",
  appId: "1:125124364246:web:d4b7cb85e6ada5a3b98677"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);