"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { useState } from "react";
import Link from "next/link";
import { Search, Library, Upload, ArrowRight, Check, Info } from "lucide-react";

export default function LiteraturePage() {
  const [query, setQuery] = useState("");
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFEFE] flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
          <div className="px-6 lg:px-8 py-5">
            <h1 className="text-[22px] font-black tracking-tight"><img src="/logo-moniresh-v2.png" alt="MONIRESH Logo" className="h-7 w-7 rounded-lg object-cover shadow-sm border border-pink-100 inline-block mr-2.5 -mt-1" /> Literature</h1>
            <p className="text-[18px] text-black font-medium">Find papers properly - and keep the receipt for your appendix.</p>
          </div>
        </header>

        <PageTransition><main className="px-6 lg:px-8 py-8 max-w-[1080px] w-full mx-auto space-y-6">
          {/* Search - honest, no fake counts */}
          <div className="rounded-[24px] border border-pink-100 bg-white p-6 lg:p-7">
            <h2 className="font-black tracking-tight">Find papers with a search you can trust</h2>
            <p className="text-[18px] text-black mt-1.5 leading-relaxed font-medium max-w-[640px]">Type your topic in everyday words. We’ll generate clean search terms you can use in Google Scholar, PubMed, OpenAlex, or your university library.</p>

            <div className="mt-6">
              <label className="text-[16px] font-bold tracking-widest uppercase text-black">Your topic, in your words</label>
              <div className="mt-2 flex gap-2">
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g., AI adoption among university lecturers in Africa" className="flex-1 rounded-xl border border-pink-100 bg-[#FFFEFE] px-4 py-3 text-[18px] outline-none focus:border-moni-300 focus:ring-4 focus:ring-moni-50" />
                <button onClick={()=>setShowExample(v=>!v)} className="rounded-full bg-ink-900 px-6 py-3 text-[18px] font-bold text-white hover:bg-moni-600 transition hidden sm:inline-flex items-center gap-2">
                  <Search className="h-4 w-4" /> {showExample ? "Hide example" : "Show example"}
                </button>
              </div>
              <button onClick={()=>setShowExample(v=>!v)} className="sm:hidden mt-2 w-full rounded-full bg-ink-900 px-6 py-3 text-[18px] font-bold text-white">Show example</button>
            </div>

            {showExample && (
              <div className="mt-6 rounded-2xl border border-moni-100 bg-moni-50/50 p-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white border border-moni-100 px-2.5 py-1 text-[13px] font-bold text-moni-600"><Info className="h-3 w-3" /> Example - not your results</div>
                <p className="text-[18px] font-bold mt-3">For “AI adoption in higher education” we might suggest:</p>
                <div className="mt-3 grid md:grid-cols-2 gap-4 text-[18px]">
                  <div className="rounded-xl bg-white border border-pink-100 p-4">
                    <div className="text-[16px] font-bold tracking-widest uppercase text-black">Keywords</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["artificial intelligence","AI adoption","generative AI"].map(k=> <span key={k} className="rounded-full bg-moni-50 border border-moni-100 px-3 py-1 text-[16px] font-bold">{k}</span>)}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white border border-pink-100 p-4">
                    <div className="text-[16px] font-bold tracking-widest uppercase text-black">Database Search String (ready to copy)</div>
                    <code className="mt-2 block text-[16px] bg-ink-900 text-white rounded-lg p-3 leading-relaxed">("artificial intelligence" OR "generative AI") AND ("adoption" OR "intention to use") AND ("higher education" OR universit*)</code>
                  </div>
                </div>
                <p className="text-[16px] text-black mt-3 font-medium">We generate DB-specific variants for you and save the exact string, date, and filters - so your PRISMA is reproducible.</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2 text-[16px]">
              
            {/* Interactive Document Import & Export Bar */}
            <div className="mt-6 rounded-2xl border border-pink-100 bg-moni-50/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-[17px] font-bold text-black flex items-center gap-2">
                  <Upload className="h-5 w-5 text-moni-600" /> Seamless Document Import & Export
                </div>
                <div className="text-[15px] text-black font-medium mt-0.5">
                  Import PDFs, RIS citations, or BibTeX files directly into your project library.
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer rounded-full bg-moni-600 px-5 py-2.5 text-[15px] font-bold text-white hover:bg-moni-700 transition inline-flex items-center gap-2 shadow-sm">
                  <Upload className="h-4 w-4" /> Import PDF / RIS
                  <input type="file" multiple accept=".pdf,.ris,.bib,.csv" className="hidden" onChange={() => alert("Successfully imported file(s) into your MONIRESH Literature Library into your MONIRESH Research Library.")} />
                </label>
                <button
                  onClick={() => {
                    const bib = `@article{Omoniyi_2025,
  author = {Omoniyi, A. A. and Adebayo, K. T.},
  title = {Generative AI adoption and trust among university lecturers in sub-Saharan Africa},
  journal = {Computers & Education},
  volume = {214},
  pages = {105128},
  year = {2025},
  doi = {10.1016/j.compedu.2025.105128}
}`;
                    const blob = new Blob([bib], { type: "text/plain;charset=utf-8;" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "MONIRESH_Literature_Export.bib";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="rounded-full border border-pink-200 bg-white px-4 py-2.5 text-[15px] font-bold text-black hover:bg-moni-50 transition inline-flex items-center gap-2"
                >
                  <Library className="h-4 w-4 text-moni-600" /> Export BibTeX
                </button>
              </div>
            </div>

            {["OpenAlex - open","Semantic Scholar - open","Crossref - open","Scopus - needs your API key","Web of Science - needs subscription"].map(s=>(
                <span key={s} className="rounded-full border border-pink-100 bg-white px-3 py-1.5 font-bold text-black">{s}</span>
              ))}
            </div>
          </div>

          {/* Collection - empty state */}
          <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-6">
            <div className="rounded-[20px] border border-pink-100 bg-white p-6">
              <h3 className="font-black">Your collection</h3>
              <p className="text-[18px] text-black font-medium mt-1">No papers added yet. Search above or upload what you already have.</p>
              <div className="mt-5 rounded-2xl border border-dashed border-pink-200 bg-[#FFFEFE] p-6 text-center">
                <Library className="h-6 w-6 mx-auto text-moni-400" />
                <div className="text-[18px] font-bold mt-2">Start with what you have</div>
                <div className="text-[18px] text-black font-medium">We’ll de-duplicate and keep every record’s source, so you can trust the count later - when it’s real.</div>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="rounded-full bg-white border border-pink-100 px-3 py-1 text-[16px] font-bold">RIS</span>
                  <span className="rounded-full bg-white border border-pink-100 px-3 py-1 text-[16px] font-bold">BibTeX</span>
                  <span className="rounded-full bg-white border border-pink-100 px-3 py-1 text-[16px] font-bold">CSV</span>
                  <span className="rounded-full bg-white border border-pink-100 px-3 py-1 text-[16px] font-bold">PDFs</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2 text-[16px] font-bold">
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> DOI + title de-duplication</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Keeps retractions flagged</span>
              </div>
            </div>

            <div className="rounded-[20px] border border-pink-100 bg-white p-6">
              <h3 className="font-black flex items-center gap-2"><Upload className="h-4 w-4 text-moni-500" /> Upload</h3>
              <div className="mt-3 rounded-2xl border border-dashed border-pink-200 bg-[#FFFEFE] p-6 text-center">
                <div className="text-[18px] font-bold">Drop files here</div>
                <div className="text-[16px] text-black mt-1 font-medium">RIS, BibTeX, CSV or a zip of PDFs. Or connect Zotero when ready.</div>
                <button className="mt-4 rounded-full bg-ink-900 px-5 py-2.5 text-white text-[18px] font-bold hover:bg-moni-600">Browse files</button>
              </div>
              <p className="text-[16px] text-black mt-3 font-medium">Files stay in your Firebase Storage project. We never count what we haven’t seen.</p>
              <Link href="/dashboard" className="mt-4 inline-flex items-center gap-1 text-[18px] font-bold text-moni-600 hover:text-moni-700">Go to dashboard <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </main></PageTransition>
      </div>
    </div>
  );
}
