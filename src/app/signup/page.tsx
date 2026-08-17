"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      if (!firebaseAuth) throw new Error("Firebase not configured");
      const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      router.push("/dashboard");
    } catch (e: any) { setErr(e.message || "Something went wrong"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container-content h-[56px] flex items-center justify-between border-b border-[#E2E8F0]">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-[8px] bg-[#4F46E5] text-white grid place-items-center font-bold text-[11px]">M</div>
          <span className="font-semibold text-[14px]">MONIRESH</span>
        </Link>
        <Link href="/login" className="text-[14px] font-medium hover:underline">Log in</Link>
      </div>
      <div className="flex-1 grid lg:grid-cols-[1fr_400px] max-w-[1120px] w-full mx-auto">
        <div className="hidden lg:flex flex-col justify-center px-8 py-12 border-r border-[#E2E8F0] bg-[#F8FAFC]">
          <h1 className="text-[28px] font-semibold tracking-tight leading-none">Create work you<br />can stand behind.</h1>
          <p className="text-[14px] text-[#64748B] mt-3 max-w-[420px]">Every claim linked to its source. No invented citations.</p>
          <ul className="mt-6 space-y-2 text-[14px]">
            <li>• Free for one project</li>
            <li>• Export to DOCX / BibTeX</li>
            <li>• Your data stays yours</li>
          </ul>
        </div>
        <div className="grid place-items-center p-6">
          <form onSubmit={onSubmit} className="w-full max-w-[360px] card p-6">
            <h2 className="text-[20px] font-semibold tracking-tight">Create your account</h2>
            <p className="text-[14px] text-[#64748B] mt-1">Start free — no credit card.</p>
            {err && <div className="mt-4 rounded-[8px] border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-[13px]">{err}</div>}
            <label className="block text-[14px] font-medium mt-5">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ada Lovelace" className="mt-1.5 w-full rounded-[8px] border border-[#E2E8F0] px-3 py-2.5 text-[14px] outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#0A0A0A]" />
            <label className="block text-[14px] font-medium mt-4">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@university.edu" className="mt-1.5 w-full rounded-[8px] border border-[#E2E8F0] px-3 py-2.5 text-[14px] outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#0A0A0A]" />
            <label className="block text-[14px] font-medium mt-4">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="At least 8 characters" className="mt-1.5 w-full rounded-[8px] border border-[#E2E8F0] px-3 py-2.5 text-[14px] outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#0A0A0A]" />
            <button disabled={loading} className="btn-primary w-full mt-6 !py-2.5">{loading ? "Creating..." : "Create account"}</button>
            <p className="text-[12px] text-center mt-4 text-[#64748B]">By continuing, you agree to Terms and Privacy.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
