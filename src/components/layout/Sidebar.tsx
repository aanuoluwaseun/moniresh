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
  Settings,
  HelpCircle,
  FlaskConical,
  ShieldCheck,
  Award,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", badge: null },
  { label: "Agent Mode SOP", icon: FlaskConical, href: "/agent-mode", badge: "AUTONOMOUS" },
  { label: "Research Lab", icon: Layers, href: "/systematic", badge: "LIVE" },
  { label: "Literature Search", icon: Search, href: "/literature", badge: null },
  { label: "Screening & PRISMA", icon: FileScan, href: "/systematic", badge: null },
  { label: "Evidence Matrix", icon: Table2, href: "/gaps", badge: "24-COL" },
  { label: "GapFinder", icon: Sparkles, href: "/gaps", badge: null },
  { label: "Manuscript Studio", icon: PenLine, href: "/writing", badge: null },
  { label: "References & APA 7", icon: BookMarked, href: "/writing", badge: null },
  { label: "Data Analysis", icon: BarChart3, href: "/data-analysis", badge: null },
  { label: "Journals", icon: GraduationCap, href: "/journals", badge: null },
  { label: "Quality Audit", icon: FileCheck2, href: "/writing", badge: "7-PASS" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-pink-100 bg-white">
      {/* Brand Header */}
      <div className="flex h-[68px] items-center gap-3 border-b border-pink-50 px-6">
        <img
          src="/logo-moniresh-v2.png"
          alt="MONIRESH Logo"
          className="h-9 w-9 rounded-xl object-cover shadow-sm border border-pink-100"
        />
        <div>
          <div className="text-[20px] font-black tracking-tight leading-none text-black">MONIRESH</div>
          <div className="text-[13px] font-bold tracking-[0.18em] text-moni-600 uppercase">Research OS</div>
        </div>
        
      </div>

      {/* High-Class Academic Workspace Indicator */}
      <div className="px-3 py-4">
        <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-moni-50/70 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-black tracking-widest text-moni-600 uppercase">Academic Lab</span>
            <span className="inline-flex items-center gap-1 text-[13px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5" /> APA 7th
            </span>
          </div>
          <div className="mt-2 text-[16px] font-extrabold leading-tight text-black">
            Authoritative Research Operating System
          </div>
          <div className="mt-1.5 text-[14px] text-black font-medium leading-relaxed">
            Zero invented citations. Crossref DOI verification across every claim.
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-bold transition-all duration-200",
                active
                  ? "bg-ink-900 text-white shadow-lg shadow-ink-900/15"
                  : "text-black hover:bg-moni-50 hover:text-moni-700"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] transition",
                  active ? "text-white" : "text-moni-500 group-hover:text-moni-600"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[12px] font-black",
                    active ? "bg-white/15 text-white" : "bg-moni-50 text-moni-600 border border-moni-100"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Calm Academic Standard */}
      <div className="border-t border-pink-100 p-4 bg-[#FFFEFE]">
        <div className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[15px] font-black text-black">
            <Award className="h-4 w-4 text-moni-600" /> APA 7th • Verified Citations
          </div>
          <div className="text-[14px] text-black mt-1 font-medium leading-relaxed">
            Crossref DOI Linkage • Retraction Watch Audited
          </div>
          <div className="mt-2 text-[13px] font-bold text-emerald-700">
            Zero Fabricated Citations or Statistics
          </div>
        </div>
        <div className="mt-3 px-1 text-[13px] leading-relaxed text-black font-semibold text-center">
          White & Pink • Evidence-First • Research OS
        </div>
      </div>
    </aside>
  );
}
