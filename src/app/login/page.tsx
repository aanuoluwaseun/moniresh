"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

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
    } catch (e: any) { setErr(e.message || "Check your email and password"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container-content h-[56px] flex items-center justify-between border-b border-[#E5E7EB]">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-[8px] bg-[#0A0A0A] text-white grid place-items-center font-bold text-[11px]">M</div>
          <span className="font-semibold text-[14px]">MONIRESH</span>
        </Link>
        <Link href="/signup" className="text-[14px] font-medium hover:underline">Create account</Link>
      </div>
      <div className="flex-1 grid place-items-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-[360px] card p-6">
          <h1 className="text-[22px] font-semibold tracking-tight">Welcome back</h1>
          <p className="text-[14px] text-[#6B7280] mt-1">Sign in to your workspace.</p>
          {err && <div className="mt-4 rounded-[8px] border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-[13px]">{err}</div>}
          <label className="block text-[14px] font-medium mt-5">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@university.edu" className="mt-1.5 w-full rounded-[8px] border border-[#E5E7EB] px-3 py-2.5 text-[14px] outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A]" />
          <label className="block text-[14px] font-medium mt-4">Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="••••••••" className="mt-1.5 w-full rounded-[8px] border border-[#E5E7EB] px-3 py-2.5 text-[14px] outline-none focus:border-[#0A0A0A] focus:ring-1 focus:ring-[#0A0A0A]" />
          <button disabled={loading} className="btn-primary w-full mt-6 !py-2.5">{loading ? "Signing in..." : "Sign in"}</button>
          <p className="text-[13px] text-center mt-4 text-[#6B7280]">New here? <Link href="/signup" className="font-medium text-[#0A0A0A] underline">Create account</Link></p>
        </form>
      </div>
    </div>
  );
}
