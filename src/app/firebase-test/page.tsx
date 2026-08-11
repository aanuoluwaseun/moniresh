"use client";
import { useEffect, useState } from "react";
import { firebaseApp, isFirebaseConfigured } from "@/lib/firebase";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export default function FirebaseTest() {
  const [status, setStatus] = useState("Checking Firebase...");
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isFirebaseConfigured()) { setStatus("❌ Not configured"); return; }
      try {
        setStatus("Connecting to moniresh Firebase...");
        const auth = getAuth(firebaseApp);
        // try anon auth (if enabled)
        try { await signInAnonymously(auth); } catch {}
        const db = getFirestore(firebaseApp);
        const ref = doc(db, "moniresh_health", "test");
        await setDoc(ref, { ping: Date.now(), at: new Date().toISOString(), from: "MONIRESH pink v1" }, { merge: true });
        const snap = await getDoc(ref);
        setDetails(snap.data());
        setStatus("✅ Firebase is LIVE - read/write OK");
      } catch (e: any) {
        setStatus(`⚠️ Connected but Firestore rules need allow: ${e.message}`);
        setDetails({ error: e.message, code: e.code });
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8FB] p-8">
      <div className="max-w-2xl mx-auto bg-white border border-pink-100 rounded-2xl p-6 shadow-card">
        <h1 className="text-[24px] font-black"><img src="/logo-moniresh-v2.png" alt="MONIRESH Logo" className="h-7 w-7 rounded-lg object-cover shadow-sm border border-pink-100 inline-block mr-2.5 -mt-1" /> MONIRESH → Firebase</h1>
        <p className="text-[18px] text-black mt-1">projectId: <b>moniresh</b> • storage: moniresh.firebasestorage.app</p>
        <div className="mt-4 rounded-xl bg-moni-50 border border-moni-100 p-4 font-mono text-[18px]">{status}</div>
        {details && <pre className="mt-3 bg-ink-900 text-white p-4 rounded-xl text-[16px] overflow-auto">{JSON.stringify(details, null, 2)}</pre>}
        <div className="mt-4 text-[16px] text-black">If you see “permission-denied”, go to Firebase Console → Firestore → Rules → set allow read/write for now, then we tighten with auth.</div>
      </div>
    </div>
  );
}
