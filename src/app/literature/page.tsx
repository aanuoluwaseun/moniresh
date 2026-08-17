"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Library, Upload, ArrowRight, Check, Play, Sparkles } from "lucide-react";

export default function LiteraturePage() {
  const [query, setQuery] = useState("");
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar />
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-[#E2E8F0]">
          <div className="px-6 lg:px-8 py-5 flex items-center gap-3">
            <div className="h-9 w-9 rounded-[10px] bg-[#4F46E5] text-white grid place-items-center">
              <Library className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-[18px] font-semibold tracking-tight text-[#1E293B]">Literature</h1>
              <p className="text-[13px] text-[#64748B]">Find papers properly — and keep the receipt for your appendix.</p>
            </div>
          </div>
        </header>

        <main className="px-6 lg:px-8 py-6 max-w-[1120px] w-full mx-auto space-y-6">
          {/* Search builder - visual */}
          <div className="card p-6 lg:p-7 overflow-hidden">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-start">
              <div>
                <h2 className="font-semibold tracking-tight text-[#1E293B] text-[18px]">Build a search you can defend</h2>
                <p className="text-[14px] text-[#475569] mt-1.5 leading-relaxed max-w-[560px]">Type your topic in everyday words. We’ll generate clean search terms you can use in OpenAlex, PubMed, or your library — and save the exact string for your PRISMA.</p>
                <div className="mt-5">
                  <label className="text-[12px] font-semibold tracking-wide text-[#475569] uppercase">Your topic, in your words</label>
                  <div className="mt-2 flex gap-2">
                    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g., AI adoption among lecturers in Africa" className="flex-1 rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF2FF]" />
                    <button onClick={()=>setShowExample(v=>!v)} className="hidden sm:inline-flex btn-primary !py-3 !px-5 gap-2">
                      <Search className="h-4 w-4" /> {showExample ? "Hide" : "Show"} example
                    </button>
                  </div>
                  <button onClick={()=>setShowExample(v=>!v)} className="sm:hidden mt-2 w-full btn-primary">Show example</button>
                </div>
                {showExample && (
                  <div className="mt-5 rounded-[12px] border border-[#C7D2FE] bg-[#EEF2FF] p-4">
                    <span className="badge-bright">Example — not your results</span>
                    <div className="mt-3 grid gap-3">
                      <div className="rounded-[10px] bg-white border border-[#E2E8F0] p-4">
                        <div className="text-[11px] font-semibold tracking-wide text-[#64748B] uppercase">Keywords</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {["artificial intelligence","AI adoption","generative AI"].map(k=> <span key={k} className="rounded-full bg-[#EEF2FF] border border-[#C7D2FE] text-[#4338CA] px-3 py-1 text-[13px] font-medium">{k}</span>)}
                        </div>
                      </div>
                      <div className="rounded-[10px] bg-[#1E293B] text-white p-4">
                        <div className="text-[11px] font-semibold tracking-wide text-white/60 uppercase">Database search string — ready to copy</div>
                        <code className="mt-2 block text-[13px] leading-relaxed font-mono">("artificial intelligence" OR "generative AI") AND ("adoption" OR "intention") AND ("higher education" OR universit*)</code>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["OpenAlex — open","Crossref — open","PubMed — open","Scopus — needs key"].map(s=>(
                    <span key={s} className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1 text-[12px] font-medium text-[#475569]">{s}</span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Image src="/images/use-case-researcher.jpg" alt="Researcher searching" width={440} height={320} className="rounded-[12px] object-cover w-full h-[260px] border border-[#E2E8F0]" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur border border-[#E2E8F0] rounded-[10px] p-3 flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-[#4F46E5] text-white grid place-items-center"><Search className="h-4 w-4" /></span>
                  <div>
                    <div className="text-[13px] font-semibold">12 providers, one query</div>
                    <div className="text-[12px] text-[#64748B]">Failover: Serper → PubMed → Crossref → OpenAlex</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Import / Export bar */}
          <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F8FAFC]">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-[10px] bg-[#4F46E5] text-white grid place-items-center"><Upload className="h-4 w-4" /></div>
              <div>
                <div className="font-medium text-[14px]">Import & Export, seamlessly</div>
                <div className="text-[13px] text-[#64748B]">PDF, RIS, BibTeX — in and out, with DOIs verified</div>
              </div>
            </div>
            <div className="flex gap-2">
              <label className="btn-primary !py-2 !px-4 inline-flex items-center gap-1.5 cursor-pointer">
                <Upload className="h-4 w-4" /> Import
                <input type="file" multiple accept=".pdf,.ris,.bib,.csv" className="hidden" onChange={() => alert("Imported to your MONIRESH library.")} />
              </label>
              <button onClick={() => {
                const bib=`@article{Moniresh2025, author={Moniresh}, title={Generative AI adoption}, journal={Computers & Education}, year={2025}}`;
                const blob=new Blob([bib],{type:"text/plain"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="MONIRESH_Export.bib"; a.click(); URL.revokeObjectURL(url);
              }} className="btn-secondary !py-2 !px-4 inline-flex items-center gap-1.5"><Library className="h-4 w-4" /> Export BibTeX</button>
            </div>
          </div>

          {/* Collection empty - visual WOW */}
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="card p-6">
              <h3 className="font-semibold flex items-center gap-2"><Library className="h-4 w-4 text-[#4F46E5]" /> Your collection</h3>
              <div className="mt-4 rounded-[12px] border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFC] p-6 text-center">
                <Image src="/images/use-case-student.jpg" alt="Student" width={320} height={160} className="mx-auto rounded-[10px] object-cover w-full max-w-[320px] h-[140px] border border-[#E2E8F0]" />
                <div className="font-medium mt-4">No papers yet — start with what you have</div>
                <p className="text-[13px] text-[#64748B] mt-1">We’ll dedupe and keep every source, so your count is honest.</p>
                <div className="mt-3 flex justify-center gap-1.5">
                  {["RIS","BibTeX","CSV","PDFs"].map(s=> <span key={s} className="rounded-full border border-[#E2E8F0] bg-white px-2.5 py-1 text-[12px] font-medium">{s}</span>)}
                </div>
              </div>
              <div className="mt-3 flex gap-3 text-[13px]">
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> DOI dedupe</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-600" /> Retractions flagged</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card overflow-hidden">
                <video autoPlay muted loop playsInline poster="/images/hero-workspace.jpg" className="w-full h-[160px] object-cover">
                  <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
                </video>
                <div className="p-4">
                  <div className="font-medium text-[14px] flex items-center gap-2"><Play className="h-4 w-4 text-[#4F46E5]" /> See search in 15s</div>
                  <p className="text-[13px] text-[#64748B] mt-1">Concepts → synonyms → Boolean → providers → deduped results.</p>
                </div>
              </div>
              <div className="card p-4">
                <div className="font-medium text-[14px] flex items-center gap-2"><Sparkles className="h-4 w-4 text-[#4F46E5]" /> Pro tip</div>
                <p className="text-[13px] text-[#475569] mt-1 leading-relaxed">Paste your exact Boolean string into OpenAlex and save the date for your PRISMA. MONIRESH does it for you.</p>
                <div className="mt-3 flex gap-3">
                <Link href="/dashboard" className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#4F46E5]">Go to dashboard <ArrowRight className="h-3.5 w-3.5" /></Link>
                <Link href="/gaps" className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#4F46E5]">Find gaps →</Link>
              </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
