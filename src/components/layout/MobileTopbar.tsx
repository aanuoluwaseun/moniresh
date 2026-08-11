"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export function MobileTopbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden sticky top-0 z-40 flex h-14 items-center justify-between border-b border-pink-100 bg-white/90 backdrop-blur px-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(!open)} className="rounded-xl border border-pink-100 p-2 bg-white">
          <Menu className="h-4 w-4 text-black" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo-moniresh-v2.png" alt="MONIRESH Logo" className="h-7 w-7 rounded-lg object-cover shadow-sm border border-pink-100" />
          <span className="text-[18px] font-black tracking-tight text-black">MONIRESH</span>
        </Link>
      </div>
      <button className="rounded-full pink-gradient px-4 py-1.5 text-[16px] font-black text-white shadow-pink">New Project</button>
      {open && (
        <div className="absolute left-0 top-14 w-full border-b border-pink-100 bg-white p-3 shadow-xl animate-rise">
          <div className="grid grid-cols-2 gap-2 text-[16px]">
            <Link href="/agent-mode" className="rounded-xl border border-pink-100 p-3 font-bold bg-moni-50 text-moni-600">Agent Mode SOP</Link>
            <Link href="/literature" className="rounded-xl border border-pink-100 p-3 font-bold bg-moni-50">Literature Search</Link>
            <Link href="/gaps" className="rounded-xl border border-pink-100 p-3 font-bold bg-moni-50">GapFinder</Link>
            <Link href="/writing" className="rounded-xl border border-pink-100 p-3 font-bold bg-moni-50">Manuscript</Link>
            <Link href="/journals" className="rounded-xl border border-pink-100 p-3 font-bold bg-moni-50">Journals</Link>
          </div>
        </div>
      )}
    </div>
  );
}
