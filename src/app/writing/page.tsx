"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import Link from "next/link";
import { PenLine, ShieldCheck, BookMarked, ArrowRight } from "lucide-react";

export default function WritingPage(){
  return (
    <div className="min-h-screen bg-[#FFFEFE] flex">
      <Sidebar/>
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white border-b border-pink-50">
          <div className="px-6 lg:px-8 py-3 flex items-center gap-3">
            <PenLine className="h-4 w-4 text-moni-500" />
            <h1 className="text-[15px] font-black">Manuscript</h1>
            <span className="ml-2 hidden sm:inline text-xs text-ink-500">Write with sources at your side.</span>
            <div className="ml-auto flex gap-2">
              <Link href="/dashboard" className="rounded-full border border-pink-100 bg-white px-4 py-1.5 text-xs font-bold">Back to dashboard</Link>
            </div>
          </div>
        </header>
        <div className="flex-1 flex min-h-0 flex-col lg:flex-row">
          <div className="hidden lg:block w-[220px] border-r border-pink-50 bg-white p-4">
            <div className="text-[11px] font-bold tracking-widest uppercase text-ink-500">Outline</div>
            <div className="mt-3 space-y-1 text-xs font-medium text-ink-700">
              {["Title","Abstract","Introduction","Literature Review","Framework","Method","Results","Discussion","Conclusion","References"].map(s=>(
                <div key={s} className="rounded-lg px-3 py-2 hover:bg-moni-50">{s}</div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-moni-50 border border-moni-100 p-3 text-xs">
              <div className="font-bold">No fake citations</div>
              <div className="text-ink-600 mt-1 leading-relaxed">References are pulled via DOI (Crossref). If we can’t find it, we tell you — we don’t invent it.</div>
            </div>
          </div>

          <div className="flex-1 bg-[#FFFEFE] flex items-center justify-center p-6 lg:p-10">
            <div className="w-full max-w-[680px] bg-white border border-pink-100 rounded-[20px] p-8 lg:p-9 text-center">
              <div className="mx-auto h-12 w-12 rounded-2xl bg-moni-50 border border-moni-100 flex items-center justify-center"><PenLine className="h-5 w-5 text-moni-500" /></div>
              <h2 className="mt-4 text-[18px] font-black">Your manuscript starts here</h2>
              <p className="text-sm text-ink-500 mt-1.5 font-medium leading-relaxed">Open a project and this becomes a calm editor — with your sources on the right. Every sentence can be opened to the papers behind it.</p>

              <div className="mt-6 text-left rounded-2xl border border-pink-50 bg-[#FFFEFE] p-4">
                <div className="text-xs font-bold">What you’ll get when you start</div>
                <ul className="mt-2 space-y-1.5 text-sm font-medium text-ink-700">
                  <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" /> Citation Guardian checks claim → source</li>
                  <li className="flex gap-2"><BookMarked className="h-4 w-4 text-moni-500 shrink-0" /> References via DOI, formatted correctly</li>
                  <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" /> Warnings if text and table disagree</li>
                </ul>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                <Link href="/literature" className="rounded-full bg-ink-900 px-6 py-3 text-white text-sm font-bold">Create a project</Link>
                <Link href="/dashboard" className="rounded-full border border-pink-100 bg-white px-6 py-3 text-sm font-bold">Go to dashboard</Link>
              </div>
              <p className="text-xs text-ink-500 mt-4">This preview is empty until you write. No demo manuscript with fake results.</p>
            </div>
          </div>

          <div className="hidden xl:block w-[320px] border-l border-pink-50 bg-white p-4">
            <div className="text-xs font-black">Sources</div>
            <div className="mt-3 rounded-xl bg-moni-50 border border-moni-100 p-4 text-sm text-ink-600">Add papers and your citations will appear here — linked to the exact sentence they support.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
