import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Import Realtime Database
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUMg_YQrATkruNrH_mjagurLosf7JO4WI",
  authDomain: "sparkedup-d5f76.firebaseapp.com",
  databaseURL: "https://sparkedup-d5f76-default-rtdb.firebaseio.com",
  projectId: "sparkedup-d5f76",
  storageBucket: "sparkedup-d5f76.firebasestorage.app",
  messagingSenderId: "500148731578",
  appId: "1:500148731578:web:df77fe6fba357800b68c83",
  measurementId: "G-5GSW274PWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app); // Initialize Realtime Database

export const auth = getAuth(app);

export { db, analytics }; // Export db for use in addProducts.js
