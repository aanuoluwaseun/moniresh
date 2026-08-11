"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { useState } from "react";
import { Search, Copy, Database, Check, Sparkles, FileUp, Filter } from "lucide-react";

export default function LiteraturePage() {
  const [idea, setIdea] = useState("AI adoption in higher education");
  const [built, setBuilt] = useState(false);
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="px-6 lg:px-8 py-4">
            <h1 className="text-[20px] font-extrabold tracking-tight">Literature Search</h1>
            <p className="text-xs text-slate-500">Source connector layer • Authorized APIs • Reproducible search strings</p>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto space-y-6">
          {/* Search Builder */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <h2 className="text-sm font-black">Literature Search Builder</h2>
              <span className="ml-auto text-[11px] font-bold px-2 py-1 rounded-full bg-slate-900 text-white">RAG-aware</span>
            </div>
            <label className="text-xs font-bold text-slate-700">Research idea</label>
            <div className="mt-1 flex gap-2">
              <input value={idea} onChange={e=>setIdea(e.target.value)} className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:bg-white focus:border-slate-900" />
              <button onClick={()=>setBuilt(true)} className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white">Build Queries</button>
            </div>

            {built && (
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500">Generated</h3>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-bold">Keywords</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {["artificial intelligence","AI","generative AI","AI adoption","AI acceptance"].map(k=>(
                        <span key={k} className="rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-medium">{k}</span>
                      ))}
                    </div>
                    <div className="text-xs font-bold mt-3">Synonyms</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {["higher education","universities","tertiary education","academic institutions"].map(k=>(
                        <span key={k} className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-800">{k}</span>
                      ))}
                    </div>
                    <div className="text-xs font-bold mt-3">Boolean</div>
                    <pre className="mt-1 rounded-lg bg-slate-900 text-white p-3 text-xs leading-relaxed overflow-auto">
{`("artificial intelligence" OR "AI" OR "generative AI")
AND ("adoption" OR "acceptance" OR "intention to use")
AND ("higher education" OR universit*)`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-slate-500">Database-specific queries</h3>
                  {[
                    { db: "OpenAlex (open)", q: "filter: title.search:AI adoption, institution.country:all", ok: true },
                    { db: "Semantic Scholar (public)", q: "query: AI adoption higher education + TLDR", ok: true },
                    { db: "Crossref (open)", q: "query.container-title:Computers & Education", ok: true },
                    { db: "Scopus (API key required)", q: "TITLE-ABS-KEY(AI AND adoption AND higher education)", ok: false },
                    { db: "Web of Science (subscription)", q: "TS=(AI adoption) AND TS=(higher education)", ok: false },
                    { db: "PubMed", q: "(AI) AND (education) NOT needed for this topic", ok: true },
                  ].map(i=>(
                    <div key={i.db} className={`rounded-xl border p-3 flex gap-3 ${i.ok ? 'bg-white border-slate-200' : 'bg-amber-50 border-amber-200'}`}>
                      <Database className={`h-4 w-4 mt-0.5 ${i.ok ? 'text-slate-400' : 'text-amber-600'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold">{i.db}</div>
                        <div className="text-xs font-mono text-slate-600 truncate">{i.q}</div>
                      </div>
                      <button className="h-7 rounded-full border bg-white px-3 text-xs font-bold flex items-center gap-1"><Copy className="h-3 w-3" /> Copy</button>
                    </div>
                  ))}
                  <div className="rounded-xl bg-slate-900 text-white p-4">
                    <div className="text-xs font-bold">Reproducibility</div>
                    <div className="text-xs opacity-70 mt-1">Search string, database, date 2026-08-11, filters, result count 2,847 preserved for PRISMA. Export → RIS/BibTeX.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Collector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-sm font-bold">Literature Collector — 2,847 → 2,284 after dedup</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Scopus","Web of Science","PubMed","Semantic Scholar","OpenAlex","Crossref","Europe PMC","arXiv","DOAJ","CORE","Upload"].map(s=>(
                  <span key={s} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold">{s}</span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  "Retrieve metadata + DOI + authors + journal + year + citations",
                  "Retrieve abstracts where permitted (OpenAlex/Crossref)",
                  "Detect duplicates: DOI → title → near-title → preprint vs journal",
                  "Download permitted PDFs, flag retracted, detect corrections",
                ].map(t=>(
                  <div key={t} className="flex gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3"><Check className="h-4 w-4 text-emerald-600 shrink-0" /> <span className="font-medium leading-tight">{t}</span></div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <div className="text-xs font-bold">Deduplication result</div>
                <div className="text-sm mt-1"><span className="font-black">17 records → 8 unique publications</span> (example). Near-identical titles flagged with confidence.</div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-sm font-bold flex items-center gap-2"><FileUp className="h-4 w-4" /> Upload Library</h3>
              <div className="mt-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <div className="text-xs font-bold">Drag RIS, BibTeX, CSV, or PDFs</div>
                <div className="text-xs text-slate-500 mt-1">Or connect Zotero library (OAuth). Max 500 MB.</div>
                <button className="mt-3 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white">Browse files</button>
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 py-2"><span>zotero_export.ris</span><span className="font-bold">412 records</span></div>
                <div className="flex justify-between border-b border-slate-100 py-2"><span>manual_pdfs.zip</span><span className="font-bold">89 PDFs</span></div>
              </div>
              <button className="mt-3 w-full rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold">Import & Deduplicate</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
