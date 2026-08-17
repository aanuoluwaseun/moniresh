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
    <aside className="hidden lg:flex w-[240px] shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
      <div className="flex h-[56px] items-center gap-2 px-5 border-b border-[#E5E7EB]">
        <div className="h-7 w-7 rounded-[8px] bg-[#0A0A0A] text-white grid place-items-center font-bold text-[11px]">M</div>
        <span className="font-semibold tracking-tight text-[14px]">MONIRESH</span>
      </div>

      <div className="px-3 py-3">
        <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-3">
          <div className="text-[11px] tracking-wide text-[#6B7280] uppercase font-medium">Research Lab</div>
          <div className="text-[13px] font-medium mt-1 leading-tight">Your complete workspace</div>
          <div className="text-[12px] text-[#6B7280] mt-1">No invented citations.</div>
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
                active ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A] hover:bg-[#F9FAFB]"
              )}
            >
              <item.icon className={cn("h-4 w-4", active ? "text-white" : "text-[#6B7280]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#E5E7EB]">
        <div className="text-[12px] text-[#6B7280] px-3 py-2">© MONIRESH</div>
      </div>
    </aside>
  );
}
