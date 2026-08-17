"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ArrowRight, Plus, Search, PenLine, Sparkles, Play, Layers } from "lucide-react";

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      const { firebaseStorage, firebaseDb } = await import("@/lib/firebase");
      const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { getAuth } = await import("firebase/auth");
      const cur = getAuth().currentUser;
      if (!cur) { alert("Please sign in to upload"); return; }
      for (const file of Array.from(files)) {
        const storageRef = ref(firebaseStorage as any, `users/${cur.uid}/library/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        const docRef = await addDoc(collection(firebaseDb as any, `users/${cur.uid}/library`), {
          title: file.name.replace(/\.[^/.]+$/, ""),
          fileName: file.name, fileUrl: url, fileType: file.type, size: file.size, ownerId: cur.uid, createdAt: serverTimestamp(),
        });
        setLibrary(prev => [{ id: docRef.id, title: file.name, fileUrl: url }, ...prev]);
      }
      alert(`Uploaded ${files.length} file(s) to Firebase Storage`);
    } catch (err: any) { alert(err.message); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[#E2E8F0]">
          <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-[20px] font-semibold tracking-tight text-[#1E293B]">Dashboard</h1>
              <p className="text-[13px] text-[#64748B]">Your research, in one place — honest numbers only.</p>
            </div>
            <label className="hidden md:inline-flex btn-primary !py-2 cursor-pointer">
              <Plus className="h-4 w-4" /> Upload papers
              <input type="file" multiple accept=".pdf,.ris,.bib,.csv" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </header>

        <main className="px-6 lg:px-8 py-6 max-w-[1120px] w-full mx-auto space-y-6">
          {/* Stats - clean */}
          <div className="card p-0 overflow-hidden">
            <div className="grid grid-cols-3 divide-x divide-[#E2E8F0]">
              {[
                [loading ? "—" : (projects?.length ?? 0), "Projects"],
                [library.length, "Papers"],
                ["—", "Drafts"],
              ].map(([n, l]) => (
                <div key={String(l)} className="px-5 py-4">
                  <div className="text-[24px] font-semibold tracking-tight text-[#1E293B]">{n}</div>
                  <div className="text-[12px] text-[#64748B]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual continue */}
          <div className="card p-0 overflow-hidden grid md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6">
              <h2 className="font-semibold text-[#1E293B]">Continue where you left off</h2>
              <p className="text-[14px] text-[#475569] mt-1">Open literature, evidence, or manuscript. Everything stays linked.</p>
              <div className="mt-4 flex gap-2">
                <Link href="/literature" className="btn-primary !py-2 !px-4 inline-flex items-center gap-1.5"><Search className="h-4 w-4" /> Search</Link>
                <Link href="/writing" className="btn-secondary !py-2 !px-4 inline-flex items-center gap-1.5"><PenLine className="h-4 w-4" /> Writing</Link>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-[12px] text-[#4F46E5] bg-[#EEF2FF] border border-[#C7D2FE] rounded-full px-3 py-1">Evidence stays attached • Export anytime</div>
            </div>
            <div className="relative bg-[#F8FAFC] border-l border-[#E2E8F0] hidden md:block">
              <Image src="/images/use-case-team.jpg" alt="Team" width={400} height={220} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-white border border-[#E2E8F0] rounded-[10px] px-3 py-2 flex items-center gap-2 shadow-sm">
                <span className="h-7 w-7 rounded-full bg-[#4F46E5] text-white grid place-items-center"><Layers className="h-4 w-4" /></span>
                <div className="text-[12px]"><div className="font-medium">Evidence chain</div><div className="text-[#64748B]">Claim → Paper → Source</div></div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Projects</h3>
              <Link href="/literature" className="text-[13px] font-medium text-[#4F46E5] hover:underline inline-flex items-center gap-1">Create project <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            {loading ? (
              <div className="mt-3 card p-8 text-[14px] text-[#64748B]">Loading…</div>
            ) : !user ? (
              <div className="mt-3 card p-8 text-center">
                <div className="font-medium">Sign in to see your projects</div>
                <p className="text-[14px] text-[#64748B] mt-1">Your projects live under your account.</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Link href="/login" className="btn-primary">Log in</Link>
                  <Link href="/signup" className="btn-secondary">Create account</Link>
                </div>
              </div>
            ) : projects && projects.length === 0 ? (
              <div className="mt-3 card p-0 overflow-hidden border-dashed text-center">
                <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-8">
                    <div className="h-10 w-10 rounded-[10px] bg-[#EEF2FF] border border-[#C7D2FE] grid place-items-center mx-auto"><Sparkles className="h-4 w-4 text-[#4F46E5]" /></div>
                    <div className="font-medium mt-3">No projects yet — let’s make your first</div>
                    <p className="text-[14px] text-[#64748B] mt-1">Start with an idea, a PDF, or a draft. We’ll keep the chain visible.</p>
                    <label className="btn-primary inline-flex mt-4 cursor-pointer">
                      <Plus className="h-4 w-4" /> Upload first papers
                      <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>
                  <div className="hidden md:block relative">
                    <Image src="/images/use-case-researcher.jpg" alt="Researcher" width={400} height={300} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 bg-white rounded-[10px] p-3 border border-white/50">
                      <div className="text-[13px] font-medium">From chaos to clarity</div>
                      <div className="text-[12px] text-[#475569]">One workspace, every artifact linked.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-3 grid md:grid-cols-3 gap-3">
                {projects!.map(p => (
                  <Link key={p.id} href="/writing" className="card p-4 card-hover block">
                    <div className="font-medium leading-tight">{p.title}</div>
                    <div className="text-[13px] text-[#4F46E5] mt-2 inline-flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Library preview - visual */}
          {library.length > 0 && (
            <section className="card p-5">
              <h3 className="font-semibold flex items-center gap-2">Library <span className="text-[12px] font-normal text-[#64748B]">({library.length})</span></h3>
              <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {library.slice(0,6).map(doc => (
                  <a key={doc.id} href={doc.fileUrl} target="_blank" className="rounded-[10px] border border-[#E2E8F0] p-3 hover:border-[#C7D2FE] transition block">
                    <div className="font-medium text-[13px] truncate">{doc.title || doc.fileName}</div>
                    <div className="text-[12px] text-[#64748B] truncate">{doc.fileName}</div>
                  </a>
                ))}
              </div>
            </section>
          )}

          <div className="card p-0 overflow-hidden">
            <video autoPlay muted loop playsInline poster="/images/hero-workspace.jpg" className="w-full h-[180px] object-cover">
              <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
            </video>
            <div className="p-4 flex items-center justify-between">
              <span className="text-[13px] font-medium flex items-center gap-2"><Play className="h-4 w-4 text-[#4F46E5]" /> Your research, running itself</span>
              <Link href="/literature" className="text-[13px] font-semibold text-[#4F46E5]">Search now →</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
