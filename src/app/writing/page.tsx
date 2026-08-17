"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import Image from "next/image";
import Link from "next/link";
import { PenLine, ShieldCheck, BookMarked, Play, Check, Layers } from "lucide-react";

export default function WritingPage(){
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar/>
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white border-b border-[#E2E8F0]">
          <div className="px-6 lg:px-8 py-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-[10px] bg-[#4F46E5] text-white grid place-items-center"><PenLine className="h-4 w-4" /></div>
            <h1 className="text-[15px] font-semibold">Manuscript</h1>
            <span className="hidden sm:inline text-[13px] text-[#64748B]">Write with sources at your side.</span>
            <div className="ml-auto flex gap-2">
              <Link href="/dashboard" className="btn-secondary !py-2 text-[13px]">Dashboard</Link>
              <button className="btn-primary !py-2 text-[13px]">Export DOCX</button>
            </div>
          </div>
        </header>
        <div className="flex-1 grid lg:grid-cols-[220px_1fr_320px] min-h-0">
          <div className="hidden lg:block border-r border-[#E2E8F0] bg-white p-4">
            <div className="text-[11px] font-semibold tracking-wide text-[#64748B] uppercase">Outline</div>
            <div className="mt-3 space-y-1 text-[13px]">
              {["Title","Abstract","Introduction","Literature Review","Framework","Method","Results","Discussion","Conclusion","References"].map(s=>(
                <div key={s} className="rounded-[8px] px-3 py-2 hover:bg-[#F8FAFC] cursor-pointer">{s}</div>
              ))}
            </div>
            <div className="mt-6">
              <Image src="/images/use-case-student.jpg" alt="Writing" width={200} height={140} className="rounded-[10px] w-full h-[120px] object-cover border border-[#E2E8F0]" />
              <div className="text-[12px] text-[#64748B] mt-2">Manuscript stays linked to evidence.</div>
            </div>
          </div>
          <div className="bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-[640px] card p-6">
              <div className="h-32 rounded-[12px] overflow-hidden border border-[#E2E8F0] bg-[#F8FAFC] grid place-items-center relative">
                <Image src="/images/hero-workspace.jpg" alt="Editor" width={640} height={200} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-[1px]">
                  <div className="bg-white border border-[#E2E8F0] rounded-full px-4 py-2 text-[13px] font-medium shadow-sm">Start writing — every claim can be traced</div>
                </div>
              </div>
              <h2 className="mt-5 font-semibold">Your manuscript starts here</h2>
              <p className="text-[14px] text-[#475569] mt-1">Open a project and this becomes a calm three-panel editor. No demo manuscript with fake results.</p>
              <div className="mt-4 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                <div className="text-[12px] font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> What you’ll get</div>
                <ul className="mt-2 space-y-1.5 text-[13px]">
                  <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-600" /> Citation Guardian — claim → source</li>
                  <li className="flex gap-2"><BookMarked className="h-4 w-4 text-[#4F46E5]" /> References via DOI</li>
                  <li className="flex gap-2"><Layers className="h-4 w-4 text-[#4F46E5]" /> Evidence chain on the right</li>
                </ul>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/literature" className="btn-primary">Create project</Link>
                <Link href="/dashboard" className="btn-secondary">Dashboard</Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:block border-l border-[#E2E8F0] bg-white p-4">
            <div className="text-[12px] font-semibold">Sources</div>
            <div className="mt-3 rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-3">
              <video autoPlay muted loop playsInline poster="/images/hero-workspace.jpg" className="w-full h-[120px] object-cover rounded-[8px] border border-[#E2E8F0]">
                <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
              </video>
              <p className="text-[13px] text-[#475569] mt-2">Add papers and citations appear here — linked to the sentence they support.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
