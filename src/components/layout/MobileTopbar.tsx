"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export function MobileTopbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden sticky top-0 z-40 flex h-[56px] items-center justify-between border-b border-[#E2E8F0] bg-white/95 backdrop-blur px-4">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-[8px] bg-[#4F46E5] text-white grid place-items-center font-bold text-[11px]">M</div>
        <span className="font-semibold text-[14px]">MONIRESH</span>
      </Link>
      <div className="flex items-center gap-2">
        <button onClick={() => setOpen(!open)} className="h-9 w-9 grid place-items-center rounded-[8px] border border-[#E2E8F0]">
          <Menu className="h-4 w-4" />
        </button>
        <Link href="/signup" className="btn-primary !py-2 !px-4 text-[13px]">Start</Link>
      </div>
      {open && (
        <div className="absolute left-0 top-[56px] w-full border-b border-[#E2E8F0] bg-white p-3 shadow-sm">
          <div className="grid grid-cols-2 gap-2 text-[14px]">
            <Link href="/literature" className="rounded-[8px] border border-[#E2E8F0] p-3">Literature</Link>
            <Link href="/gaps" className="rounded-[8px] border border-[#E2E8F0] p-3">Gaps</Link>
            <Link href="/writing" className="rounded-[8px] border border-[#E2E8F0] p-3">Writing</Link>
            <Link href="/dashboard" className="rounded-[8px] border border-[#E2E8F0] p-3">Dashboard</Link>
          </div>
        </div>
      )}
    </div>
  );
}
