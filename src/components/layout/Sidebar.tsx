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
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", badge: null },
  { label: "Research Lab", icon: FlaskConical, href: "/systematic", badge: "LIVE" },
  { label: "Literature Search", icon: Search, href: "/literature", badge: null },
  { label: "Screening & PRISMA", icon: FileScan, href: "/systematic", badge: "163" },
  { label: "Evidence Matrix", icon: Table2, href: "/gaps", badge: null },
  { label: "GapFinder", icon: Sparkles, href: "/gaps", badge: "3 gaps" },
  { label: "Manuscript", icon: PenLine, href: "/writing", badge: "84%" },
  { label: "References", icon: BookMarked, href: "/writing", badge: null },
  { label: "Data Analysis", icon: BarChart3, href: "/data-analysis", badge: "BETA" },
  { label: "Journals", icon: GraduationCap, href: "/journals", badge: null },
  { label: "Quality Audit", icon: FileCheck2, href: "/writing", badge: "94/100" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-pink-100 bg-white">
      {/* Logo - pink/white premium */}
      <div className="flex h-[68px] items-center gap-3 border-b border-pink-50 px-6">
        <img src="/logo-moniresh-v2.png" alt="MONIRESH Logo" className="h-9 w-9 rounded-xl object-cover shadow-sm border border-pink-100" />
        <div>
          <div className="text-[18px] font-black tracking-tight leading-none text-black">MONIRESH</div>
          <div className="text-[12px] font-bold tracking-[0.18em] text-moni-500 uppercase">Research OS</div>
        </div>
        <div className="ml-auto flex h-6 items-center rounded-full bg-moni-50 px-2.5 text-[12px] font-black text-moni-600 border border-moni-200">V1</div>
      </div>

      {/* Project switcher - pink glow */}
      <div className="px-3 py-4">
        <div className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-moni-50 p-4 pink-glow">
          <div className="text-[13px] font-bold tracking-widest text-moni-400 uppercase">Active Project</div>
          <div className="mt-1 text-[15px] font-extrabold leading-tight text-black">AI Adoption in Higher Education</div>
          <div className="text-[13px] text-black">Progress 62% • 163 included</div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-moni-100">
            <div className="h-full w-[62%] pink-gradient rounded-full" />
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold transition-all duration-200",
                active
                  ? "bg-ink-900 text-white shadow-lg shadow-ink-900/15"
                  : "text-black hover:bg-moni-50 hover:text-moni-700"
              )}
            >
              <item.icon className={cn("h-[18px] w-[18px] transition", active ? "text-white" : "text-moni-400 group-hover:text-moni-500")} />
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

      <div className="border-t border-pink-50 p-3 space-y-1">
        <Link href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-semibold text-black hover:bg-moni-50">
          <Settings className="h-4 w-4 text-moni-300" /> Settings
        </Link>
        <Link href="#" className="flex items-center gap-3 rounded-xl px-3 py-2 text-[15px] font-semibold text-black hover:bg-moni-50">
          <HelpCircle className="h-4 w-4 text-moni-300" /> Help & Docs
        </Link>
        <div className="rounded-2xl pink-gradient p-4 text-white mt-3 shadow-pink">
          <div className="text-[16px] font-black">Screen 2,284 abstracts in 8 minutes?</div>
          <div className="text-[16px] opacity-90 mt-1 leading-relaxed">Orchestrator routes via Hugging Face batch - 15× cheaper, full audit trail.</div>
          <button className="mt-3 w-full rounded-full bg-white py-2.5 text-[16px] font-black text-moni-600 hover:bg-moni-50 transition">Run Orchestrator</button>
        </div>
        <div className="px-3 py-3 text-[13px] leading-relaxed text-black font-medium">
          White & Pink • Evidence-first • No invented citations
        </div>
      </div>
    </aside>
  );
}
