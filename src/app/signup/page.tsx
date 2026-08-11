"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { firebaseAuth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="mx-auto w-full max-w-[1080px] px-6 lg:px-8 h-[64px] flex items-center justify-between border-b border-pink-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-ink-900 text-white flex items-center justify-center font-black text-[16px]">M</div>
          <span className="font-black tracking-tight">MONIRESH</span>
        </Link>
        <Link href="/login" className="text-[18px] font-bold hover:text-moni-600">Already have an account? Log in</Link>
      </div>

      <div className="flex-1 grid lg:grid-cols-[1fr_520px] max-w-[1080px] mx-auto w-full">
        <div className="hidden lg:flex flex-col justify-center px-8 lg:px-12 py-12 bg-[#FFF8FB] border-r border-pink-50">
          <h1 className="text-[34px] font-black tracking-tight leading-none">Create work you<br /><span className="font-light italic">can stand behind.</span></h1>
          <p className="text-black mt-3 leading-relaxed font-medium max-w-[420px]">MONIRESH keeps every claim linked to its source. Your supervisor will see the evidence, not just the prose.</p>
          <div className="mt-8 space-y-3 text-[18px]">
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Free for one project</div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Export to Word / BibTeX anytime</div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Your data stays yours</div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-10">
          <form onSubmit={onSubmit} className="w-full max-w-[380px]">
            <h2 className="text-[24px] font-black tracking-tight">Create your account</h2>
            <p className="text-[18px] text-black mt-1">Start free - no credit card.</p>

            {err && <div className="mt-4 rounded-xl bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-[18px]">{err}</div>}

            <label className="block text-[18px] font-bold mt-6">Full name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Aanuoluwa Omoniyi" className="mt-1.5 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-[18px] outline-none focus:border-moni-300 focus:ring-4 focus:ring-moni-50" />

            <label className="block text-[18px] font-bold mt-4">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder="you@university.edu" className="mt-1.5 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-[18px] outline-none focus:border-moni-300 focus:ring-4 focus:ring-moni-50" />

            <label className="block text-[18px] font-bold mt-4">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required placeholder="At least 8 characters" className="mt-1.5 w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-[18px] outline-none focus:border-moni-300 focus:ring-4 focus:ring-moni-50" />

            <button disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-white font-bold hover:bg-moni-600 transition disabled:opacity-60">
              {loading ? "Creating..." : "Create account"} <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-[16px] text-black mt-4 text-center">By continuing, you agree to our Terms and Privacy.</p>
            <p className="text-[18px] text-center mt-4"><Link href="/login" className="font-bold underline decoration-pink-200 underline-offset-4 hover:text-moni-600">Sign in instead</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
