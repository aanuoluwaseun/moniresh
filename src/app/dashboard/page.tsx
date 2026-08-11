"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { ArrowRight, Plus, FileText, Search, PenLine, Sparkles, ShieldCheck, Clock } from "lucide-react";

type Project = { id: string; title: string; createdAt?: any; updatedAt?: any };

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth as any, async (u) => {
      setUser(u);
      if (!u) { setLoading(false); setProjects([]); return; }
      try {
        // Try to load real projects — if none, show empty state (no fake numbers)
        const q = query(collection(firebaseDb as any, "projects"), where("ownerId", "==", u.uid), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
        setProjects(list);
      } catch {
        // If Firestore not yet set up, treat as empty (honest)
        setProjects([]);
      } finally { setLoading(false); }
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFEFE] flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
          <div className="px-6 lg:px-8 py-5 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[22px] font-black tracking-tight leading-none">Dashboard</h1>
              <p className="text-sm text-ink-500 mt-1 font-medium">
                {user ? `Hi, ${user.displayName || user.email?.split("@")[0]} —` : ""} your workspace is ready. No clutter, just your work.
              </p>
            </div>
            <Link href="/literature" className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-white text-sm font-bold hover:bg-moni-600 transition">
              <Plus className="h-4 w-4" /> New project
            </Link>
          </div>
        </header>

        <main className="px-6 lg:px-8 py-8 max-w-[1080px] w-full mx-auto space-y-8">
          {/* Enticing but honest — no fake percentages */}
          <div className="rounded-[24px] border border-pink-100 bg-white p-6 lg:p-7 flex flex-col lg:flex-row gap-6 items-start justify-between">
            <div>
              <h2 className="text-[18px] font-black tracking-tight">Continue where you left off</h2>
              <p className="text-sm text-ink-500 mt-1.5 leading-relaxed max-w-[560px] font-medium">
                Pick up your literature, see what gaps emerged, or open your manuscript. Your progress is saved automatically.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/literature" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-white hover:bg-moni-600"><Search className="h-4 w-4" /> Search literature</Link>
                <Link href="/writing" className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-4 py-2 text-sm font-bold hover:bg-moni-50"><PenLine className="h-4 w-4" /> Open manuscript</Link>
              </div>
            </div>
            <div className="rounded-2xl bg-[#FFF8FB] border border-pink-100 p-4 min-w-[260px]">
              <div className="text-xs font-bold tracking-widest uppercase text-moni-500">What’s inside</div>
              <ul className="mt-2 space-y-1.5 text-sm font-medium">
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Sources stay attached</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Audit trail for screening</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Export for your appendix</li>
              </ul>
            </div>
          </div>

          {/* Projects — real only */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="font-black tracking-tight">Projects</h3>
              <Link href="/literature" className="text-sm font-bold text-moni-600 hover:text-moni-700 inline-flex items-center gap-1">Create project <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>

            {loading ? (
              <div className="mt-4 rounded-2xl border border-pink-50 bg-white p-8 text-sm text-ink-500">Loading your workspace…</div>
            ) : !user ? (
              <div className="mt-4 rounded-[20px] border border-pink-100 bg-white p-8 lg:p-10 text-center">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-moni-50 border border-moni-100 flex items-center justify-center"><FileText className="h-5 w-5 text-moni-500" /></div>
                <h4 className="mt-4 font-black text-[16px]">Sign in to see your projects</h4>
                <p className="text-sm text-ink-500 mt-1 max-w-[420px] mx-auto">Your projects live in Firebase under your account. No demo data — just your real work.</p>
                <div className="mt-5 flex justify-center gap-2">
                  <Link href="/login" className="rounded-full bg-ink-900 px-5 py-2.5 text-white text-sm font-bold">Log in</Link>
                  <Link href="/signup" className="rounded-full border border-pink-100 px-5 py-2.5 text-sm font-bold">Create account</Link>
                </div>
              </div>
            ) : projects && projects.length === 0 ? (
              <div className="mt-4 rounded-[20px] border border-dashed border-pink-200 bg-[#FFFEFE] p-8 lg:p-10 text-center">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-white border border-pink-100 flex items-center justify-center"><Sparkles className="h-5 w-5 text-moni-500" /></div>
                <h4 className="mt-4 font-black text-[16px]">No projects yet — let’s make your first</h4>
                <p className="text-sm text-ink-500 mt-1 max-w-[480px] mx-auto font-medium">Start with anything: an idea, a pile of PDFs, or a draft. MONIRESH will keep the structure for you.</p>
                <div className="mt-6 grid sm:grid-cols-3 gap-3 max-w-[720px] mx-auto text-left">
                  {[
                    ["I have an idea", "Find a defensible gap"],
                    ["I have papers", "Screen & synthesize"],
                    ["I have a draft", "Check every claim"],
                  ].map(([t, d]) => (
                    <Link key={t} href="/literature" className="rounded-2xl border border-pink-100 bg-white p-4 hover:border-moni-200 hover:bg-moni-50 transition">
                      <div className="text-sm font-bold">{t}</div>
                      <div className="text-xs text-ink-500">{d}</div>
                    </Link>
                  ))}
                </div>
                <Link href="/literature" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-white font-bold">Create first project <ArrowRight className="h-4 w-4" /></Link>
              </div>
            ) : (
              <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects!.map((p) => (
                  <Link key={p.id} href="/writing" className="rounded-2xl border border-pink-100 bg-white p-5 hover:border-moni-200 hover:shadow-sm transition">
                    <div className="flex items-center gap-2 text-xs text-ink-500"><Clock className="h-3.5 w-3.5" /> Recently updated</div>
                    <h4 className="mt-2 font-bold leading-tight line-clamp-2">{p.title}</h4>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-moni-600">Open <ArrowRight className="h-3.5 w-3.5" /></div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Helpful, not hype */}
          <section className="grid lg:grid-cols-3 gap-4">
            <Link href="/literature" className="rounded-2xl border border-pink-100 bg-white p-5 hover:bg-moni-50 transition">
              <Search className="h-5 w-5 text-moni-500" />
              <h4 className="font-bold mt-2">Literature</h4>
              <p className="text-sm text-ink-500 leading-relaxed">Search or upload. We keep your query for the appendix.</p>
            </Link>
            <Link href="/systematic" className="rounded-2xl border border-pink-100 bg-white p-5 hover:bg-moni-50 transition">
              <FileText className="h-5 w-5 text-moni-500" />
              <h4 className="font-bold mt-2">Screening</h4>
              <p className="text-sm text-ink-500 leading-relaxed">Include, exclude, maybe. Export PRISMA in one click.</p>
            </Link>
            <Link href="/gaps" className="rounded-2xl border border-pink-100 bg-white p-5 hover:bg-moni-50 transition">
              <Sparkles className="h-5 w-5 text-moni-500" />
              <h4 className="font-bold mt-2">Gaps & Writing</h4>
              <p className="text-sm text-ink-500 leading-relaxed">Turn patterns into a gap you can defend, then write with sources at hand.</p>
            </Link>
          </section>

          <p className="text-xs text-ink-500 text-center">No fabricated numbers anywhere. You’ll see real counts only after you add real papers.</p>
        </main>
      </div>
    </div>
  );
}
