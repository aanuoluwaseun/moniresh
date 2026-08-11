// MONIRESH - Firebase (User chose Firebase over Supabase)
// Config provided by user: moniresh project
// We read from NEXT_PUBLIC_ env first, fallback to hardcoded for demo (apiKey is public per Firebase)
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAQMVDzU4NEWudHl8JgE2hMDg2nPJtDAgQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "moniresh.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "moniresh",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "moniresh.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "140249653685",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:140249653685:web:f29b3119c3352f64c139fc",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-L4L4YESH3W",
};

// ⬇️ FIX: your snippet had "[moniresh.firebaseapp.com](http://moniresh.firebaseapp.com)" markdown brackets
// We stripped to "moniresh.firebaseapp.com" - correct per Firebase console.

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const firebaseApp = app;
export const firebaseAuth = (() => {
  try { return getAuth(app); } catch { return null as any; }
})();
export const firebaseDb = (() => {
  try { return getFirestore(app); } catch { return null as any; }
})();
export const firebaseStorage = (() => {
  try { return getStorage(app); } catch { return null as any; }
})();

// Analytics only in browser and if supported
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && await isSupported().catch(()=>false)) {
    try { return getAnalytics(app); } catch {}
  }
  return null;
};

export const isFirebaseConfigured = () => Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
