"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Library,
  GitBranch,
  FileScan,
  Table2,
  Sparkles,
  PenLine,
  BookMarked,
  GraduationCap,
  FileCheck2,
  Database,
  BarChart3,
  Settings,
  HelpCircle,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", badge: null },
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
    <aside className="hidden lg:flex w-[272px] shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-[64px] items-center gap-3 border-b border-slate-100 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white font-black text-[13px] tracking-tight">
          R<span className="text-amber-500">.</span>
        </div>
        <div>
          <div className="text-[15px] font-extrabold tracking-tight leading-none text-slate-900">RIGORA</div>
          <div className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">Research OS</div>
        </div>
        <div className="ml-auto flex h-6 items-center rounded-full bg-amber-50 px-2 text-[10px] font-bold text-amber-700 border border-amber-200">V1</div>
      </div>

      {/* Project switcher */}
      <div className="px-3 py-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase">Active Project</div>
          <div className="mt-1 text-[13px] font-bold leading-tight text-slate-900">AI Adoption in Higher Education</div>
          <div className="text-[11px] text-slate-500">Progress 62% • 163 included</div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[62%] bg-slate-900" />
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
                "flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium transition",
                active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("h-4 w-4", active ? "text-white" : "text-slate-500")} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3 space-y-1">
        <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50">
          <Settings className="h-4 w-4 text-slate-400" /> Settings
        </Link>
        <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50">
          <HelpCircle className="h-4 w-4 text-slate-400" /> Help & Docs
        </Link>
        <div className="rounded-xl bg-slate-900 p-4 text-white mt-3">
          <div className="text-xs font-bold">Need 1,000+ papers screened?</div>
          <div className="text-xs opacity-70 mt-1 leading-relaxed">RIGORA Orchestrator can screen 2,284 abstracts with audit trail in &lt; 8 min.</div>
          <button className="mt-3 w-full rounded-lg bg-white py-2 text-xs font-bold text-slate-900">Run Orchestrator</button>
        </div>
        <div className="px-3 py-3 text-[11px] leading-relaxed text-slate-400">
          Evidence-first • No invented citations • No fabricated data
        </div>
      </div>
    </aside>
  );
}
