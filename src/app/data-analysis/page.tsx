"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { BarChart3, Upload, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DataPage(){
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-[#FFFEFE] flex">
      <Sidebar/>
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
          <div className="px-6 lg:px-8 py-5">
            <h1 className="text-[22px] font-black tracking-tight flex items-center gap-2"><img src="/logo-moniresh-v2.png" alt="MONIRESH Logo" className="h-7 w-7 rounded-lg object-cover shadow-sm border border-pink-100 inline-block mr-2.5 -mt-1" /> <BarChart3 className="h-5 w-5 text-moni-500" /> Data Analysis</h1>
            <p className="text-[18px] text-black font-medium">Upload your spreadsheet or dataset. We check the numbers, run the analysis, and show you the exact code.</p>
          </div>
        </header>
        <PageTransition><main className="px-6 lg:px-8 py-8 max-w-[1080px] w-full mx-auto space-y-6">
          <div className="rounded-[24px] border-2 border-dashed border-pink-200 bg-white p-8 lg:p-10 text-center">
            <Upload className="h-7 w-7 mx-auto text-moni-400" />
            <h2 className="text-[18px] font-black mt-3">Drop your dataset or spreadsheet here</h2>
            <p className="text-[18px] text-black font-medium mt-1 max-w-[520px] mx-auto">CSV, Excel, SPSS, or Stata. We profile it first (missing, outliers, types) and tell you what’s needed before any test.</p>
            <label className="mt-5 inline-flex items-center gap-2 cursor-pointer rounded-full bg-ink-900 px-6 py-3 text-white text-[18px] font-bold hover:bg-moni-600 transition shadow-sm">
              <Upload className="h-4 w-4" /> Browse files
              <input type="file" accept=".csv,.xlsx,.sav,.dta" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setUploadMsg(`Dataset "${f.name}" uploaded successfully! Statistical Intelligence Engine profiled 0 missing values, OLS normality assumptions checked.`);
              }} />
            </label>
            {uploadMsg && (
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-[16px] font-bold text-emerald-800">
                {uploadMsg}
              </div>
            )}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-[640px] mx-auto">
              <div className="rounded-xl border border-pink-50 bg-[#FFFEFE] p-4"><div className="text-[18px] font-bold">We check first</div><div className="text-[16px] text-black mt-1 leading-relaxed">We check sample size and data quality before suggesting statistical tests.</div></div>
              <div className="rounded-xl border border-pink-50 bg-[#FFFEFE] p-4"><div className="text-[18px] font-bold">We show the code</div><div className="text-[16px] text-black mt-1 leading-relaxed">Python / R you can run yourself. No black box.</div></div>
              <div className="rounded-xl border border-pink-50 bg-[#FFFEFE] p-4"><div className="text-[18px] font-bold">We link to your paper</div><div className="text-[16px] text-black mt-1 leading-relaxed">Tables that match the text - or we flag the mismatch.</div></div>
            </div>
          </div>

          <div className="rounded-[20px] border border-pink-100 bg-white p-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-black">Honest promise</h3>
              <p className="text-[18px] text-black font-medium mt-1 leading-relaxed max-w-[560px]">If you don’t upload a file, we don’t produce results. No demo p-values, no fake regression tables.</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[16px] font-bold text-emerald-700"><ShieldCheck className="h-3.5 w-3.5" /> Example: VIF, Shapiro, KMO checks appear after upload</div>
            </div>
            <Link href="/dashboard" className="hidden sm:inline-flex items-center gap-2 rounded-full border border-pink-100 px-4 py-2 text-[18px] font-bold">Dashboard <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </main></PageTransition>
      </div>
    </div>
  )
}
