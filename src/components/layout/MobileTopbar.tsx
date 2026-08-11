"use client";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

export function MobileTopbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(!open)} className="rounded-lg border border-slate-200 p-2">
          <Menu className="h-4 w-4" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-white text-xs font-black">R.</div>
          <span className="text-sm font-black tracking-tight">RIGORA</span>
        </Link>
      </div>
      <button className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-bold text-white">New Project</button>
      {open && (
        <div className="absolute left-0 top-14 w-full border-b border-slate-200 bg-white p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link href="/literature" className="rounded-lg border p-3 font-medium">Literature Search</Link>
            <Link href="/gaps" className="rounded-lg border p-3 font-medium">GapFinder</Link>
            <Link href="/writing" className="rounded-lg border p-3 font-medium">Manuscript</Link>
            <Link href="/journals" className="rounded-lg border p-3 font-medium">Journals</Link>
          </div>
        </div>
      )}
    </div>
  );
}
