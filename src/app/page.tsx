"use client";
import Link from "next/link";
import { ArrowRight, Check, X, ArrowDown } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      {/* Nav - unibeing style: thin, spacious */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#E5E7EB]">
        <div className="container-content h-[56px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-[8px] bg-[#0A0A0A] text-white grid place-items-center font-bold text-[12px] tracking-tight">M</div>
            <span className="font-semibold tracking-tight text-[15px]">MONIRESH</span>
            <span className="hidden sm:inline text-[11px] tracking-wide text-[#6B7280] border border-[#E5E7EB] rounded-full px-2 py-0.5 ml-1">Research OS</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[14px] text-[#0A0A0A]">
            <a href="#how" className="hover:text-black">How it works</a>
            <a href="#research" className="hover:text-black">Research</a>
            <Link href="/login" className="hover:text-black">Sign in</Link>
            <Link href="/signup" className="btn-primary inline-flex items-center gap-1.5 !py-2 !px-4 !text-[14px]">Start free <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <Link href="/login" className="text-[14px] font-medium">Sign in</Link>
            <Link href="/signup" className="btn-primary !py-2">Start free</Link>
          </div>
        </div>
      </nav>

      {/* Hero - unibeing: large, centered, clean */}
      <section className="container-content pt-12 md:pt-20 pb-10">
        <div className="max-w-[720px]">
          <p className="text-[13px] tracking-wide text-[#6B7280]">Research operating system for your papers</p>
          <h1 className="mt-3 text-[42px] md:text-[56px] font-semibold tracking-[-0.03em] leading-[0.95]">Your research, running<br />itself.</h1>
          <p className="mt-4 text-[17px] md:text-[18px] leading-[1.6] text-[#4B5563] max-w-[600px]">
            MONIRESH learns your topic, finds the papers, and keeps every claim linked to its source — so your work stays defensible while you do the thinking.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="btn-primary inline-flex justify-center items-center gap-2 !px-6 !py-3 !text-[15px]">Start free <ArrowRight className="h-4 w-4" /></Link>
            <a href="#how" className="btn-secondary inline-flex justify-center items-center gap-2 !px-6 !py-3 !text-[15px]">See it in action <ArrowDown className="h-4 w-4" /></a>
          </div>
          <p className="mt-3 text-[13px] text-[#6B7280]">No credit card required. Set up in about 5 minutes. Review once a week.</p>
        </div>

        {/* Dashboard preview - unibeing style: hairline, numbers */}
        <div className="mt-10 card overflow-hidden">
          <div className="px-4 md:px-6 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
            <span className="text-[13px] font-medium flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#0A0A0A]" /> moniresh — dashboard</span>
            <span className="text-[12px] text-[#6B7280]">This week</span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] border-b border-[#E5E7EB]">
            {[
              ["3", "Projects"],
              ["18", "Papers"],
              ["2", "Drafts ready"],
            ].map(([n, l]) => (
              <div key={l} className="px-4 md:px-6 py-5">
                <div className="text-[28px] font-semibold tracking-tight leading-none">{n}</div>
                <div className="text-[12px] text-[#6B7280] mt-1">{l}</div>
              </div>
            ))}
          </div>
          <div className="p-4 md:p-6">
            <div className="text-[13px] font-medium mb-3">Upcoming work</div>
            <div className="space-y-2">
              {[
                ["Literature review", "Due tomorrow • 12 papers to screen", "Ready"],
                ["Evidence extraction", "5 papers • APA 7", "In progress"],
                ["Gap note", "Population gap • Africa", "Draft"],
              ].map(([t, d, s]) => (
                <div key={t} className="flex items-center justify-between rounded-[8px] border border-[#E5E7EB] px-4 py-3">
                  <div>
                    <div className="text-[14px] font-medium">{t}</div>
                    <div className="text-[13px] text-[#6B7280]">{d}</div>
                  </div>
                  <span className="text-[12px] font-medium border border-[#E5E7EB] rounded-full px-2.5 py-1">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Built for */}
      <section className="hairline">
        <div className="container-content py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#6B7280]">Built for the sources you trust</span>
          <div className="flex flex-wrap gap-2 text-[12px] font-medium">
            {["OpenAlex", "Crossref", "PubMed", "Semantic Scholar", "Unpaywall"].map(s => (
              <span key={s} className="border border-[#E5E7EB] rounded-full px-3 py-1">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="container-content py-12 md:py-16">
        <h2 className="text-[28px] md:text-[32px] font-semibold tracking-tight">Presence takes a full-time job.</h2>
        <p className="mt-2 text-[15px] text-[#4B5563] max-w-[640px]">Most tools make you do the work. They store what you've already found, but they don't help you find, appraise, or connect.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-3 max-w-[720px]">
          {[
            "Tabs, PDFs, and spreadsheets everywhere",
            "Claims without sources",
            "Deduplication by hand",
            "Reference formatting at midnight",
            "Gaps you can't defend",
            "Drafts that never become papers",
          ].map(t => (
            <div key={t} className="flex items-center gap-2 text-[14px]"><span className="h-5 w-5 grid place-items-center rounded-full border border-[#E5E7EB] text-[#6B7280]"><X className="h-3 w-3" /></span> {t}</div>
          ))}
        </div>
      </section>

      {/* Transformation */}
      <section className="hairline bg-[#F9FAFB]">
        <div className="container-content py-12 md:py-16 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[18px] font-semibold">Before</h3>
            <p className="text-[14px] text-[#6B7280] mt-1">You search, download, dedupe, extract, and reformat. Every week.</p>
            <ul className="mt-4 space-y-2 text-[14px] list-disc list-inside text-[#4B5563]">
              <li>Hours lost to literature every week</li>
              <li>Evidence dies in folders</li>
              <li>Consistency depends on willpower</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="text-[18px] font-semibold">After</h3>
            <p className="text-[14px] text-[#6B7280] mt-1">MONIRESH finds, links, and keeps evidence ready while you review in minutes.</p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-[#0A0A0A]" /> A week of reading, traced to sources</li>
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-[#0A0A0A]" /> Approved claims stay linked</li>
              <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-[#0A0A0A]" /> Manuscript stays defensible</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container-content py-12 md:py-16">
        <h2 className="text-[28px] md:text-[32px] font-semibold tracking-tight">Four steps. A few minutes a day.</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {[
            ["1", "Tell MONIRESH your topic", "5 minutes", "Title, question, and inclusion criteria. You do this once."],
            ["2", "MONIRESH finds & dedupes", "0 minutes", "Search runs across 12 scholarly providers with failover."],
            ["3", "You appraise, or let it draft", "10 minutes", "Approve what you like. Evidence stays linked."],
            ["4", "Your paper stays defensible", "0 minutes", "Every claim traces to its DOI. Every gap is verifiable."],
          ].map(([n, t, time, d]) => (
            <div key={n} className="border border-[#E5E7EB] rounded-[12px] p-5 bg-white">
              <div className="h-7 w-7 grid place-items-center rounded-full bg-[#0A0A0A] text-white text-[13px] font-semibold">{n}</div>
              <h3 className="mt-3 font-semibold text-[15px] leading-tight">{t}</h3>
              <div className="text-[12px] text-[#6B7280] mt-1">{time}</div>
              <p className="text-[14px] text-[#4B5563] mt-2 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence chain */}
      <section className="hairline bg-[#F9FAFB]">
        <div className="container-content py-12 md:py-16">
          <h2 className="text-[22px] font-semibold tracking-tight">Every claim, traceable to its source.</h2>
          <p className="text-[14px] text-[#6B7280] mt-1">The Evidence Chain is MONIRESH's signature — not a network graph, but a lineage.</p>
          <div className="mt-6 card p-4 md:p-6 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-[640px] text-[13px]">
              {["Claim", "Citation", "Paper", "Evidence", "Source"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="border border-[#E5E7EB] rounded-full px-3 py-1.5 bg-white font-medium">{s}</span>
                  {i < 4 && <span className="text-[#9CA3AF]">→</span>}
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#6B7280] mt-4">Click any node to see provenance: provider, DOI, timestamp. No invented citations.</p>
          </div>
        </div>
      </section>

      {/* Made for */}
      <section className="container-content py-12 md:py-16">
        <h2 className="text-[28px] font-semibold tracking-tight">Built for people with real work to do.</h2>
        <div className="mt-6 grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            ["Researcher", "A paper that holds up to review."],
            ["PhD Student", "Thesis chapters without chaos."],
            ["Lecturer", "Evidence for promotion, faster."],
            ["Analyst", "Reports your supervisor trusts."],
            ["Team", "One library, one truth."],
          ].map(([t, d]) => (
            <div key={t} className="card p-5">
              <div className="font-semibold text-[15px]">{t}</div>
              <div className="text-[13px] text-[#6B7280] mt-1 leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="hairline bg-[#F9FAFB]">
        <div className="container-content py-12 md:py-16 max-w-[720px] mx-auto">
          <h2 className="text-[22px] font-semibold tracking-tight">Frequently asked</h2>
          <div className="mt-6 divide-y divide-[#E5E7EB] border border-[#E5E7EB] rounded-[12px] bg-white">
            {[
              ["Will it invent citations?", "No. Every reference comes from Crossref/OpenAlex/Semantic Scholar via DOI. If we can't verify, we say so."],
              ["Do I need API keys?", "No. Open tiers work out of the box. Add Serper/PubMed keys for Tier 1 Google Scholar if you want."],
              ["Can I export?", "Yes. DOCX, BibTeX, RIS, and PRISMA diagram — one click."],
              ["Is my data private?", "Yes. Firestore `users/{uid}/library` with `allow read, write: if request.auth != null;`"],
            ].map(([q, a]) => (
              <details key={q} className="group px-5 py-4">
                <summary className="flex justify-between items-center cursor-pointer list-none font-medium text-[14px]">{q} <span className="text-[#6B7280] group-open:rotate-45 transition">+</span></summary>
                <p className="text-[14px] text-[#4B5563] mt-2 leading-relaxed pr-6">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-content py-16 text-center">
        <h2 className="text-[28px] font-semibold tracking-tight">Start your next paper with evidence you can defend.</h2>
        <p className="text-[15px] text-[#6B7280] mt-2">No credit card required.</p>
        <Link href="/signup" className="btn-primary inline-flex items-center gap-2 mt-6 !px-8 !py-3 !text-[15px]">Create your free account <ArrowRight className="h-4 w-4" /></Link>
        <div className="mt-8 flex justify-center gap-6 text-[13px] text-[#6B7280]">
          <span>OpenAlex • Crossref • PubMed</span>
          <span className="hidden sm:inline">•</span>
          <span>MONIRESH • Research OS</span>
        </div>
      </section>

      <footer className="hairline py-6">
        <div className="container-content flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-[#6B7280]">
          <span>© {new Date().getFullYear()} MONIRESH — Evidence, with care.</span>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-black">Sign in</Link>
            <Link href="/signup" className="hover:text-black">Create account</Link>
            <a href="mailto:team@moniresh.ai" className="hover:text-black">team@moniresh.ai</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
