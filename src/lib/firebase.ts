import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDDRVG4T1lboU9Fa4haklAQztv495VRe7E",
  authDomain: "quickstore-9f66e.firebaseapp.com",
  projectId: "quickstore-9f66e",
  storageBucket: "quickstore-9f66e.firebasestorage.app",
  messagingSenderId: "944274985446",
  appId: "1:944274985446:web:6304e6443456ee11f28627",
  measurementId: "G-283NGX2YD7"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics is only available in browser
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
