"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      if (!firebaseAuth) throw new Error("Firebase not configured");
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.push("/dashboard");
    } catch (e: any) {
      setErr(e.message || "Check your email and password");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="mx-auto w-full max-w-[1080px] px-6 lg:px-8 h-[64px] flex items-center justify-between border-b border-pink-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="/moniresh-logo.png" alt="MONIRESH Logo" className="h-8 w-8 rounded-lg object-cover shadow-sm border border-pink-100" />
          <span className="font-black tracking-tight">MONIRESH</span>
        </Link>
        <Link href="/signup" className="text-[18px] font-bold hover:text-moni-600">Need an account? Sign up</Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-[380px]">
          <h1 className="text-[28px] font-black tracking-tight leading-none">Welcome back</h1>
          <p className="text-[18px] text-black mt-2">Your research is where you left it.</p>

          {err && <div className="mt-4 rounded-xl bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-[18px]">{err}</div>}

          <label className="block text-[18px] font-bold mt-6">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@university.edu" className="mt-1.5 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-[18px] outline-none focus:border-moni-300 focus:ring-4 focus:ring-moni-50" />

          <label className="block text-[18px] font-bold mt-4">Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-[18px] outline-none focus:border-moni-300 focus:ring-4 focus:ring-moni-50" />

          <button disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-white font-bold hover:bg-moni-600 transition disabled:opacity-60">
            {loading ? "Signing in..." : "Sign in"} <ArrowRight className="h-4 w-4" />
          </button>

          <p className="text-[18px] text-center mt-6 text-black">New here? <Link href="/signup" className="font-bold text-black underline decoration-pink-200 underline-offset-4">Create an account</Link></p>
          <p className="text-[16px] text-center mt-3 text-black"><Link href="/" className="underline">Back to homepage</Link></p>
        </form>
      </div>
    </div>
  );
}
