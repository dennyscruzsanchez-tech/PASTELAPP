import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_4YQggaD2n2M3IEw9CKBat4cheuo4RU0",
  authDomain: "pastelapp-33e3f.firebaseapp.com",
  projectId: "pastelapp-33e3f",
  storageBucket: "pastelapp-33e3f.firebasestorage.app",
  messagingSenderId: "335591117502",
  appId: "1:335591117502:web:824cdcbdb4003136f544ef",
  measurementId: "G-Z169BP0N76"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
