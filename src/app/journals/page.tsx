"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function JournalsPage(){
  return (
    <div className="min-h-screen bg-[#FFFEFE] flex">
      <Sidebar/>
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-pink-50">
          <div className="px-6 lg:px-8 py-5">
            <h1 className="text-[20px] font-black tracking-tight flex items-center gap-2"><GraduationCap className="h-5 w-5 text-moni-500" /> Journals</h1>
            <p className="text-sm text-ink-500 font-medium">Find a fit — and see risks before you submit.</p>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-8 max-w-[1080px] w-full mx-auto space-y-6">
          <div className="rounded-[24px] border border-pink-100 bg-white p-6 lg:p-7">
            <h2 className="font-black">Journal matching — when you’re ready</h2>
            <p className="text-sm text-ink-500 mt-1.5 leading-relaxed font-medium max-w-[640px]">Add your manuscript and we suggest venues by scope fit, not by invented impact. We show APC, open-access, and integrity checks — verifiable, not scraped hype.</p>
            <div className="mt-6 rounded-2xl border border-dashed border-pink-200 bg-[#FFFEFE] p-6 text-center">
              <div className="text-sm font-bold">No manuscript yet — no matches yet</div>
              <div className="text-sm text-ink-500 font-medium">Your suggestions will appear here once you have a title, abstract, and references.</div>
              <Link href="/writing" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-white text-sm font-bold">Go to manuscript <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-[20px] border border-pink-100 bg-white p-6">
              <h3 className="font-black flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> What we check</h3>
              <ul className="mt-3 space-y-1.5 text-sm font-medium text-ink-700 list-disc list-inside">
                <li>Indexing claim vs authoritative source</li>
                <li>APC transparency and waiver policy</li>
                <li>Scope fit from recent articles — not marketing copy</li>
              </ul>
            </div>
            <div className="rounded-[20px] border border-pink-100 bg-white p-6">
              <h3 className="font-black">No fake metrics</h3>
              <p className="text-sm text-ink-500 font-medium leading-relaxed">You won’t see a “94% fit” out of nowhere. When we can’t verify, we say so.</p>
              <div className="mt-4 inline-flex rounded-full bg-moni-50 border border-moni-100 px-3 py-1.5 text-xs font-bold text-moni-700">Predatory check included</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
