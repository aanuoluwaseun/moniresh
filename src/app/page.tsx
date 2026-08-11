"use client";
import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, PenLine, Sparkles, FileText, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-ink-900 selection:bg-moni-100">
      {/* Nav — minimal, editorial */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-pink-50">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-8 flex items-center justify-between h-[64px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-ink-900 text-white flex items-center justify-center font-black text-[12px] tracking-tighter">M</div>
            <span className="text-[15px] font-black tracking-tight">MONIRESH</span>
            <span className="hidden sm:inline text-[10px] font-bold tracking-[0.16em] text-moni-500 border border-moni-100 bg-moni-50 px-2 py-0.5 rounded-full">RESEARCH OS</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-ink-700">
            <a href="#features" className="hover:text-ink-900">Features</a>
            <a href="#how" className="hover:text-ink-900">How it works</a>
            <a href="#pricing" className="hover:text-ink-900">Pricing</a>
            <Link href="/login" className="hover:text-ink-900">Log in</Link>
            <Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2 text-white font-bold text-[13px] hover:bg-moni-600 transition">Start for free <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <Link href="/login" className="text-sm font-bold">Log in</Link>
            <Link href="/signup" className="rounded-full bg-ink-900 px-4 py-2 text-white text-sm font-bold">Start</Link>
          </div>
        </div>
      </nav>

      {/* Hero — clean, editorial, no AI hype */}
      <section className="mx-auto max-w-[1080px] px-6 lg:px-8 pt-14 lg:pt-20 pb-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-moni-50 px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-moni-600">
              <span className="h-2 w-2 rounded-full bg-moni-500" /> For serious researchers
            </div>
            <h1 className="mt-5 text-[42px] lg:text-[52px] font-black tracking-[-0.035em] leading-[0.92] text-ink-900">
              Research,<br />
              <span className="font-light italic tracking-tight">without the chaos.</span>
            </h1>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-500 font-medium max-w-[520px]">
              One calm workspace to find literature, spot real gaps, and write papers that hold up to scrutiny. No invented citations. No invented data. Just evidence.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 text-white font-bold hover:bg-moni-600 transition shadow-lg shadow-ink-900/10">
                Start your first project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-pink-100 bg-white px-7 py-3.5 font-bold hover:bg-moni-50 transition">See how it works</Link>
            </div>
            <p className="mt-3 text-xs text-ink-500">Free for one project. No credit card. Your data stays yours.</p>
            <div className="mt-8 flex items-center gap-6 text-xs text-ink-500 border-t border-pink-50 pt-6">
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> No fake references</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> No made-up stats</span>
              <span className="inline-flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> Export anytime</span>
            </div>
          </motion.div>

          {/* Preview — like a real doc, not a dashboard of numbers */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="rounded-[24px] bg-[#FFF8FB] border border-pink-100 p-3 shadow-card">
              <div className="rounded-[18px] bg-white border border-pink-50 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-pink-50">
                  <div className="h-2.5 w-2.5 rounded-full bg-moni-200" />
                  <div className="h-2.5 w-2.5 rounded-full bg-pink-100" />
                  <div className="h-2.5 w-2.5 rounded-full bg-moni-50" />
                  <span className="ml-3 text-xs font-bold text-ink-700">Manuscript — Introduction</span>
                  <span className="ml-auto text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Evidence linked</span>
                </div>
                <div className="p-6 lg:p-7">
                  <div className="text-[11px] font-bold tracking-widest uppercase text-moni-500">Working title</div>
                  <h3 className="text-[18px] font-bold leading-tight mt-1">AI Literacy and Trust Among University Lecturers</h3>
                  <p className="text-sm leading-relaxed text-ink-500 mt-3">
                    “We reviewed <span className="bg-moni-50 border border-moni-100 px-1.5 py-0.5 rounded-full text-moni-700 font-semibold">42 papers</span> that actually met our criteria. The gap became obvious once we plotted who was studied and where.”
                  </p>
                  <div className="mt-5 rounded-xl border border-pink-100 bg-moni-50/60 p-4">
                    <div className="text-xs font-bold">Gap note — found in Sources</div>
                    <p className="text-sm text-ink-600 mt-1 leading-relaxed">Most studies look at students in North America and Asia. Few look at lecturers in Africa. That’s our contribution.</p>
                    <div className="mt-3 flex gap-2">
                      <span className="text-[11px] font-bold bg-white border border-pink-100 px-2.5 py-1 rounded-full">Population gap</span>
                      <span className="text-[11px] font-bold bg-white border border-pink-100 px-2.5 py-1 rounded-full">Context gap</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs">
                    <span className="h-6 w-6 rounded-full bg-ink-900 text-white flex items-center justify-center font-bold">A</span>
                    <span className="font-medium">Aanuoluwa is writing</span>
                    <span className="text-ink-500">• 2 sources attached</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 hidden lg:block rounded-full bg-ink-900 text-white px-4 py-2 text-xs font-bold shadow-lg">Evidence-first, always</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features — quiet, useful */}
      <section id="features" className="mx-auto max-w-[1080px] px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[620px]">
          <h2 className="text-[28px] font-black tracking-tight leading-none">A workspace that respects the work.</h2>
          <p className="text-ink-500 mt-3 leading-relaxed font-medium">Not a chatbot. Not a paper mill. A calm place to do rigorous work, step by step.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { icon: Search, title: "Find what matters", desc: "Build a proper search, not a guess. Save your exact query for your appendix. No hidden scraping." },
            { icon: Sparkles, title: "See the gap, for real", desc: "We map who was studied, where, and how — so you can defend your contribution." },
            { icon: PenLine, title: "Write with sources attached", desc: "Every claim can be opened to its source. If you delete the source, the warning appears." },
            { icon: FileText, title: "Screen with an audit trail", desc: "Decide include / exclude / maybe. Export PRISMA when you're ready." },
            { icon: ShieldCheck, title: "No hallucinations, period", desc: "References come from Crossref/DOI, not from a language model. Stats come from your file." },
            { icon: Search, title: "Your lab, your rules", desc: "Start with an idea, a pile of PDFs, a dataset, or a draft. Enter anywhere." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-pink-100 bg-white p-6 hover:border-moni-200 transition">
              <f.icon className="h-5 w-5 text-moni-500" />
              <h3 className="mt-3 font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500 font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — timeline, not numbers */}
      <section id="how" className="bg-[#FFF8FB] border-y border-pink-50">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-[24px] font-black tracking-tight">How it flows</h2>
              <div className="mt-6 space-y-5">
                {[
                  ["1 — Collect", "Add papers via search or upload (RIS, BibTeX, PDFs). We de-duplicate quietly."],
                  ["2 — Screen", "Apply your inclusion criteria. Keep the maybe pile for human review."],
                  ["3 — Synthesize", "Extract what each paper did, found, and missed. Your matrix stays editable."],
                  ["4 — Discover", "Turn patterns into a gap statement you can defend in front of your supervisor."],
                  ["5 — Write", "Draft with sources at your side. Check coverage before you submit."],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-white border border-pink-100 flex items-center justify-center text-xs font-black shrink-0">{t[0]}</div>
                    <div>
                      <div className="font-bold text-sm">{t}</div>
                      <div className="text-sm text-ink-500 leading-relaxed font-medium">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-white border border-pink-100 p-7">
              <div className="text-sm font-bold">What MONIRESH will never do</div>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li className="flex gap-2"><span className="text-moni-500">—</span> Invent a citation to make your paragraph look better</li>
                <li className="flex gap-2"><span className="text-moni-500">—</span> Fake a p-value or a table to support your hypothesis</li>
                <li className="flex gap-2"><span className="text-moni-500">—</span> Write an ethics approval you don’t have</li>
                <li className="flex gap-2"><span className="text-moni-500">—</span> Bypass detection — we help you write in your voice, clearly</li>
              </ul>
              <div className="mt-6 rounded-2xl bg-ink-900 text-white p-5">
                <div className="text-sm font-bold">Promise</div>
                <p className="text-sm opacity-80 mt-1 leading-relaxed">If data doesn’t exist, MONIRESH says: “I can’t produce that until you provide the dataset.” That’s the whole point.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing — honest */}
      <section id="pricing" className="mx-auto max-w-[1080px] px-6 lg:px-8 py-12 lg:py-16">
        <h2 className="text-[24px] font-black tracking-tight">Simple, honest pricing</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[
            { name: "Free", price: "₦0", desc: "One active project. Try the full flow.", cta: "Start free", featured: false },
            { name: "Researcher", price: "₦8,500 / mo", desc: "Unlimited projects, exports, and checks. For theses & papers.", cta: "Choose Researcher", featured: true },
            { name: "Lab", price: "Custom", desc: "For supervisors and teams. Shared libraries & review.", cta: "Contact us", featured: false },
          ].map((p) => (
            <div key={p.name} className={`rounded-3xl border p-7 flex flex-col ${p.featured ? "bg-ink-900 text-white border-ink-900 shadow-xl" : "bg-white border-pink-100"}`}>
              <div className="text-sm font-bold tracking-widest uppercase opacity-60">{p.name}</div>
              <div className="text-[22px] font-black mt-1">{p.price}</div>
              <div className={`text-sm mt-2 ${p.featured ? "opacity-70" : "text-ink-500"} font-medium`}>{p.desc}</div>
              <Link href="/signup" className={`mt-6 inline-flex justify-center rounded-full px-5 py-3 font-bold ${p.featured ? "bg-white text-ink-900 hover:bg-moni-50" : "bg-ink-900 text-white hover:bg-moni-600"}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-500 mt-4">No invented limits. If you hit one, we’ll talk before we block you.</p>
      </section>

      {/* Footer — quiet */}
      <footer className="border-t border-pink-50">
        <div className="mx-auto max-w-[1080px] px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-ink-900 text-white flex items-center justify-center font-black text-xs">M</div>
            <span className="text-sm font-bold">MONIRESH</span>
            <span className="text-xs text-ink-500">© {new Date().getFullYear()} — Evidence, with care.</span>
          </div>
          <div className="flex gap-5 text-xs font-bold text-ink-600">
            <Link href="/login" className="hover:text-ink-900">Log in</Link>
            <Link href="/signup" className="hover:text-ink-900">Create account</Link>
            <a href="mailto:aoomoniyi@student.lautech.edu.ng" className="hover:text-ink-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
