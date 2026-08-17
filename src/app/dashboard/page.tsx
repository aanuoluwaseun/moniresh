"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ArrowRight, Plus, Search, PenLine, Sparkles } from "lucide-react";

type Project = { id: string; title: string };

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [library, setLibrary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth as any, async (u) => {
      setUser(u);
      if (!u) { setProjects([]); setLibrary([]); setLoading(false); return; }
      try {
        const q = query(collection(firebaseDb as any, "projects"), where("ownerId", "==", u.uid));
        const snap = await getDocs(q);
        setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
        const libQ = query(collection(firebaseDb as any, `users/${u.uid}/library`));
        const libSnap = await getDocs(libQ);
        setLibrary(libSnap.docs.map(d => ({ id: d.id, ...d.data() } as any)));
      } catch { setProjects([]); }
      finally { setLoading(false); }
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[#E5E7EB]">
          <div className="container-content !px-6 lg:!px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight">Dashboard</h1>
              <p className="text-[13px] text-[#6B7280]">Your research, in one place.</p>
            </div>
            <Link href="/literature" className="hidden md:inline-flex btn-primary !py-2"><Plus className="h-4 w-4" /> New project</Link>
          </div>
        </header>

        <main className="container-content !px-6 lg:!px-8 py-6 space-y-6">
          {/* Top stats - unibeing style: hairline numbers */}
          <div className="card p-0 overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-[#E5E7EB]">
              {[
                [projects?.length ?? (loading ? "—" : 0), "Projects"],
                [library.length, "Papers"],
                ["—", "Drafts"],
              ].map(([n, l]) => (
                <div key={String(l)} className="px-5 py-4">
                  <div className="text-[24px] font-semibold tracking-tight">{n}</div>
                  <div className="text-[12px] text-[#6B7280]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue */}
          <div className="card p-5 flex flex-col md:flex-row gap-4 items-start justify-between">
            <div>
              <h2 className="font-semibold">Continue where you left off</h2>
              <p className="text-[14px] text-[#6B7280] mt-1">Open your literature, evidence, or manuscript. Everything stays linked.</p>
              <div className="mt-3 flex gap-2">
                <Link href="/literature" className="btn-primary !py-2 !px-4 inline-flex items-center gap-1.5 text-[14px]"><Search className="h-4 w-4" /> Search</Link>
                <Link href="/writing" className="btn-secondary !py-2 !px-4 inline-flex items-center gap-1.5 text-[14px]"><PenLine className="h-4 w-4" /> Writing</Link>
              </div>
            </div>
            <div className="text-[12px] text-[#6B7280] border border-[#E5E7EB] rounded-[8px] px-3 py-2 bg-[#F9FAFB]">Evidence stays attached • Export anytime</div>
          </div>

          {/* Projects - honest empty */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Projects</h3>
              <Link href="/literature" className="text-[13px] font-medium hover:underline inline-flex items-center gap-1">Create project <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            {loading ? (
              <div className="mt-3 card p-8 text-[14px] text-[#6B7280]">Loading…</div>
            ) : !user ? (
              <div className="mt-3 card p-8 text-center">
                <div className="font-medium">Sign in to see your projects</div>
                <p className="text-[14px] text-[#6B7280] mt-1">Your projects live under your account.</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Link href="/login" className="btn-primary">Log in</Link>
                  <Link href="/signup" className="btn-secondary">Create account</Link>
                </div>
              </div>
            ) : projects && projects.length === 0 ? (
              <div className="mt-3 card p-8 text-center border-dashed">
                <div className="h-10 w-10 rounded-[10px] border border-[#E5E7EB] grid place-items-center mx-auto"><Sparkles className="h-4 w-4" /></div>
                <div className="font-medium mt-3">No projects yet</div>
                <p className="text-[14px] text-[#6B7280] mt-1">Start with an idea, a PDF, or a draft.</p>
                <Link href="/literature" className="btn-primary inline-flex mt-4">Create first project</Link>
              </div>
            ) : (
              <div className="mt-3 grid md:grid-cols-3 gap-3">
                {projects!.map(p => (
                  <Link key={p.id} href="/writing" className="card p-4 card-hover block">
                    <div className="font-medium leading-tight">{p.title}</div>
                    <div className="text-[13px] text-[#6B7280] mt-1">Open <ArrowRight className="h-3 w-3 inline" /></div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <div className="grid md:grid-cols-3 gap-3">
            {[
              ["Literature", "Search or upload. We keep your query."],
              ["Screening", "Include, exclude, maybe. PRISMA in one click."],
              ["Gaps & Writing", "From pattern to gap to manuscript."],
            ].map(([t, d]) => (
              <div key={t} className="card p-4">
                <div className="font-medium text-[14px]">{t}</div>
                <div className="text-[13px] text-[#6B7280] mt-1">{d}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
