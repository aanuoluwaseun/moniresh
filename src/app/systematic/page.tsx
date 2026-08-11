"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { FileScan, Check, X, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SystematicPage(){
  return (
    <div className="min-h-screen bg-[#FFFEFE] flex">
      <Sidebar/>
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
          <div className="px-6 lg:px-8 py-5">
            <h1 className="text-[22px] font-black tracking-tight flex items-center gap-2"><img src="/logo-moniresh-v2.png" alt="MONIRESH Logo" className="h-7 w-7 rounded-lg object-cover shadow-sm border border-pink-100 inline-block mr-2.5 -mt-1" /> <FileScan className="h-5 w-5 text-moni-500" /> Screening & PRISMA</h1>
            <p className="text-[18px] text-black font-medium">Decide include / exclude / maybe - with a trail you can show your supervisor.</p>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-8 max-w-[1080px] w-full mx-auto space-y-6">
          {/* No fake PRISMA numbers - show how it will look when real */}
          <div className="rounded-[24px] border border-pink-100 bg-white p-6 lg:p-7">
            <h2 className="font-black">PRISMA - built from your real collection</h2>
            <p className="text-[18px] text-black mt-1.5 leading-relaxed font-medium max-w-[680px]">When you add papers, we generate the flow automatically from your actual searches - database, date, exact query, filters. Nothing invented.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                ["Your searches", "-", "Where you searched, when"],
                ["After de-duplication", "-", "We remove exact & near-duplicates"],
                ["Screened", "-", "Title & abstract decisions"],
                ["Included", "-", "Your final set"], 
              ].map(([k,v,sub])=>(
                <div key={k} className="rounded-2xl border border-pink-50 bg-[#FFFEFE] p-4 text-center">
                  <div className="text-[16px] font-bold tracking-widest uppercase text-black">{k}</div>
                  <div className="text-[28px] font-black mt-1 text-black">{v}</div>
                  <div className="text-[16px] text-black font-medium">{sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-moni-50 border border-moni-100 p-4 text-[18px]">
              <span className="font-bold">Empty for now.</span> <span className="text-black">Add papers in Literature - your numbers will appear here, honestly.</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="rounded-[20px] border border-pink-100 bg-white p-6">
              <h3 className="font-black">How screening works</h3>
              <div className="mt-4 space-y-3 text-[18px]">
                <div className="flex gap-3 rounded-xl border border-pink-50 bg-[#FFFEFE] p-4">
                  <span className="h-7 w-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0"><Check className="h-4 w-4 text-emerald-600" /></span>
                  <div><div className="font-bold">Include</div><div className="text-black leading-relaxed">Meets your population, intervention, design - and you can see why.</div></div>
                </div>
                <div className="flex gap-3 rounded-xl border border-pink-50 bg-[#FFFEFE] p-4">
                  <span className="h-7 w-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shrink-0"><X className="h-4 w-4 text-red-600" /></span>
                  <div><div className="font-bold">Exclude</div><div className="text-black leading-relaxed">Wrong population, not peer-reviewed, duplicate. Reason saved.</div></div>
                </div>
                <div className="flex gap-3 rounded-xl border border-moni-100 bg-moni-50 p-4">
                  <span className="h-7 w-7 rounded-full bg-white border border-moni-100 flex items-center justify-center shrink-0"><HelpCircle className="h-4 w-4 text-moni-600" /></span>
                  <div><div className="font-bold">Maybe - human decides</div><div className="text-black leading-relaxed">We never auto-exclude when unsure. You approve the maybes.</div></div>
                </div>
              </div>
            </div>

            <div className="rounded-[20px] border border-pink-100 bg-white p-6">
              <h3 className="font-black">Next steps</h3>
              <ol className="mt-3 space-y-2 text-[18px] font-medium list-decimal list-inside text-black">
                <li>Add papers in Literature</li>
                <li>Define your inclusion / exclusion</li>
                <li>Screen - export PRISMA when ready</li>
              </ol>
              <Link href="/literature" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-white text-[18px] font-bold hover:bg-moni-600">Go to Literature <ArrowRight className="h-4 w-4" /></Link>
              <p className="text-[16px] text-black mt-3">No demo rows. Your table will appear when your papers do.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
