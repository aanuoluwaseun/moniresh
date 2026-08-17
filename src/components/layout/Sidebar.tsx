"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  FileScan,
  Table2,
  Sparkles,
  PenLine,
  BookMarked,
  GraduationCap,
  FileCheck2,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Literature", icon: Search, href: "/literature" },
  { label: "Screening", icon: FileScan, href: "/systematic" },
  { label: "Evidence", icon: Table2, href: "/gaps" },
  { label: "Writing", icon: PenLine, href: "/writing" },
  { label: "Data", icon: BarChart3, href: "/data-analysis" },
  { label: "Journals", icon: GraduationCap, href: "/journals" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col border-r border-[#E2E8F0] bg-white">
      <div className="flex h-[56px] items-center gap-3 px-4 border-b border-[#E2E8F0]">
        <img src="/moniresh-logo-exceptional.png" alt="MONIRESH" className="h-8 w-8 rounded-[8px] object-contain bg-white border border-[#E2E8F0] p-1" />
        <span className="font-semibold tracking-tight text-[14px]">MONIRESH</span>
      </div>

      <div className="px-3 py-3">
        <div className="rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-3">
          <div className="text-[11px] tracking-wide text-[#64748B] uppercase font-medium">Research Lab</div>
          <div className="text-[13px] font-medium mt-1 leading-tight">Your complete workspace</div>
          <div className="text-[12px] text-[#64748B] mt-1">No invented citations.</div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-2 space-y-0.5">
        {nav.map(item => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-[14px] font-medium transition",
                active ? "bg-[#4F46E5] text-white" : "text-[#1E293B] hover:bg-[#F8FAFC]"
              )}
            >
              <item.icon className={cn("h-4 w-4", active ? "text-white" : "text-[#64748B]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#E2E8F0]">
        <div className="text-[12px] text-[#64748B] px-3 py-2">© MONIRESH</div>
      </div>
    </aside>
  );
}
