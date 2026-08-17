"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Check, Sparkles, Search, Layers, FileText, PenLine, Users, Award, Clock } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white text-[#1E293B]">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[#E2E8F0]">
        <div className="container-content h-[56px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/moniresh-logo-exceptional.png" alt="MONIRESH" className="h-7 w-7 rounded-[8px] object-contain bg-white border border-[#E2E8F0] p-1" />
            <span className="font-semibold tracking-tight text-[15px]">MONIRESH</span>
            <span className="hidden sm:inline text-[11px] tracking-wide text-[#64748B] border border-[#E2E8F0] rounded-full px-2 py-0.5 ml-1">Research OS</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[14px]">
            <a href="#cases" className="hover:text-[#0F172A]">Use cases</a>
            <a href="#how" className="hover:text-[#0F172A]">How it works</a>
            <a href="#demo" className="hover:text-[#0F172A]">Demo</a>
            <Link href="/login" className="hover:text-[#0F172A]">Sign in</Link>
            <Link href="/signup" className="btn-primary inline-flex items-center gap-1.5 !py-2 !px-4">Start free <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <Link href="/login" className="text-[14px] font-medium">Sign in</Link>
            <Link href="/signup" className="btn-primary !py-2">Start</Link>
          </div>
        </div>
      </nav>

      {/* HERO - split with image/video */}
      <section className="container-content pt-10 md:pt-16 pb-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] px-3 py-1 text-[12px] font-semibold text-[#4F46E5]"> <Sparkles className="h-3 w-3" /> From idea to evidence, without chaos</div>
            <h1 className="mt-4 text-[40px] md:text-[54px] font-bold tracking-[-0.03em] leading-[0.92]">Your research, <br /><span className="text-[#4F46E5]">running itself.</span></h1>
            <p className="mt-4 text-[17px] leading-[1.6] text-[#475569] max-w-[560px]">
              MONIRESH finds the papers, keeps every claim linked to its source, and turns your reading into a defensible manuscript — while you stay in flow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary inline-flex items-center gap-2 !px-6 !py-3 !text-[15px]">Start free <ArrowRight className="h-4 w-4" /></Link>
              <button onClick={() => setVideoOpen(true)} className="btn-secondary inline-flex items-center gap-2 !px-6 !py-3 !text-[15px]"><Play className="h-4 w-4 fill-[#1E293B]" /> Watch 90s demo</button>
            </div>
            <p className="mt-3 text-[13px] text-[#64748B]">No credit card • 5-min setup • Review once a week</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`/images/use-case-${i===1?'researcher':i===2?'student':'team'}.jpg`} alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <span className="text-[13px] text-[#475569]"><b>1,200+</b> researchers onboarded • 4.9/5</span>
            </div>
          </div>
          <div className="relative">
            <div className="card overflow-hidden shadow-bright">
              <Image src="/images/hero-workspace.jpg" alt="MONIRESH workspace" width={640} height={420} className="w-full h-auto object-cover" priority />
              <div className="absolute inset-0 grid place-items-center">
                <button onClick={() => setVideoOpen(true)} className="h-14 w-14 rounded-full bg-white shadow-lg grid place-items-center border border-[#E2E8F0] hover:scale-105 transition">
                  <Play className="h-5 w-5 ml-0.5 fill-[#4F46E5] text-[#4F46E5]" />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-[12px] px-4 py-3 shadow-soft">
              <div className="h-9 w-9 rounded-full bg-[#EEF2FF] grid place-items-center"><Check className="h-4 w-4 text-[#4F46E5]" /></div>
              <div><div className="text-[13px] font-semibold">18 papers deduped</div><div className="text-[12px] text-[#64748B]">3 duplicates merged automatically</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Video modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur flex items-center justify-center p-4" onClick={() => setVideoOpen(false)}>
          <div className="bg-white rounded-[16px] overflow-hidden max-w-[800px] w-full" onClick={e => e.stopPropagation()}>
            <div className="aspect-video bg-[#0F172A] grid place-items-center relative">
              <video controls autoPlay poster="/images/hero-workspace.jpg" className="w-full h-full object-cover">
                <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
              </video>
              <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white grid place-items-center">✕</button>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-[14px] font-medium">MONIRESH — 90s product tour</span>
              <Link href="/signup" className="btn-primary !py-2">Try it free</Link>
            </div>
          </div>
        </div>
      )}

      {/* LOGOS */}
      <section className="border-y border-[#E2E8F0] bg-[#F8FAFC]">
        <div className="container-content py-4 flex flex-wrap items-center justify-between gap-3 text-[12px] font-medium text-[#475569]">
          <span>Works with</span>
          <span className="flex gap-2 flex-wrap">
            {["OpenAlex 250M", "Crossref 150M", "PubMed 36M", "Semantic Scholar 214M", "Unpaywall"].map(s => (
              <span key={s} className="bg-white border border-[#E2E8F0] rounded-full px-3 py-1">{s}</span>
            ))}
          </span>
        </div>
      </section>

      {/* USE CASES - image driven WOW */}
      <section id="cases" className="container-content py-12 md:py-16">
        <div className="max-w-[640px]">
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight">One workspace, every researcher.</h2>
          <p className="text-[15px] text-[#475569] mt-2">Pick your starting point — MONIRESH adapts.</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { img: "/images/use-case-researcher.jpg", icon: Award, title: "The Researcher", who: "Publishing under pressure", bullets: ["Finds gap you can defend", "Keeps audit trail for reviewers", "Manuscript stays linked"], cta: "/literature" },
            { img: "/images/use-case-student.jpg", icon: PenLine, title: "The PhD Student", who: "Thesis without chaos", bullets: ["Chapter → papers → evidence", "No midnight reformatting", "Supervisor sees provenance"], cta: "/writing" },
            { img: "/images/use-case-team.jpg", icon: Users, title: "The Lab", who: "One library, one truth", bullets: ["Shared evidence canvas", "No duplicate PDFs", "Progress without meetings"], cta: "/dashboard" },
          ].map(card => (
            <div key={card.title} className="card overflow-hidden card-hover group">
              <div className="h-[180px] overflow-hidden">
                <Image src={card.img} alt={card.title} width={400} height={220} className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <span className="h-7 w-7 rounded-full bg-[#EEF2FF] grid place-items-center"><card.icon className="h-3.5 w-3.5 text-[#4F46E5]" /></span>
                  <span className="font-semibold">{card.title}</span>
                </div>
                <div className="text-[13px] text-[#64748B] mt-1">{card.who}</div>
                <ul className="mt-3 space-y-1.5 text-[14px]">
                  {card.bullets.map(b => <li key={b} className="flex gap-2"><Check className="h-4 w-4 text-[#4F46E5] mt-0.5 shrink-0" /> {b}</li>)}
                </ul>
                <Link href={card.cta} className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#4F46E5] hover:gap-2 transition-all">Explore {card.title.toLowerCase()} <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO VIDEO + Dashboard preview combined */}
      <section id="demo" className="bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="container-content py-12 md:py-16 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight">See the Evidence Chain in motion.</h2>
            <p className="text-[15px] text-[#475569] mt-2 leading-relaxed">Not a screenshot — a living lineage. Every claim opens to its citation, paper, evidence, and source metadata. Click, don't guess.</p>
            <div className="mt-6 space-y-3">
              {[
                ["Search Builder", "Concepts → synonyms → Boolean live preview"],
                ["Evidence Chain", "Claim → Citation → Paper → Evidence → Source"],
                ["Manuscript", "Three panels: structure | editor | evidence"],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-[#4F46E5] text-white grid place-items-center text-[11px] font-bold mt-0.5">✓</span>
                  <div><div className="font-medium text-[14px]">{t}</div><div className="text-[13px] text-[#64748B]">{d}</div></div>
                </div>
              ))}
            </div>
            <Link href="/signup" className="btn-primary inline-flex mt-6">Try the interactive demo</Link>
          </div>
          <div className="card p-2 shadow-bright">
            <div className="rounded-[8px] overflow-hidden border border-[#E2E8F0] bg-white">
              <video autoPlay muted loop playsInline poster="/images/hero-workspace.jpg" className="w-full aspect-[16/10] object-cover">
                <source src="https://videos.pexels.com/video-files/18069234/18069234-uhd_1440_1440_24fps.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="flex items-center justify-between px-2 py-3">
              <span className="text-[13px] font-medium flex items-center gap-2"><Layers className="h-4 w-4 text-[#4F46E5]" /> Live workspace preview</span>
              <span className="text-[12px] text-[#64748B] flex items-center gap-1"><Clock className="h-3 w-3" /> 90s loop</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - visual steps with images */}
      <section id="how" className="container-content py-12 md:py-16">
        <h2 className="text-[28px] md:text-[32px] font-bold tracking-tight">Four steps. A few minutes a day.</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {[
            ["01", "Tell it your topic", "Title, question, criteria — once."],
            ["02", "It finds & dedupes", "12 providers, visible dedup."],
            ["03", "You appraise", "Evidence stays linked."],
            ["04", "It stays defensible", "Every claim → DOI."],
          ].map(([n, t, d]) => (
            <div key={n} className="card p-5">
              <div className="text-[12px] font-bold tracking-widest text-[#4F46E5]">{n}</div>
              <div className="font-semibold mt-1">{t}</div>
              <div className="text-[13px] text-[#64748B] mt-1">{d}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 card p-0 overflow-hidden grid md:grid-cols-[1.2fr_0.8fr]">
          <Image src="/images/hero-workspace.jpg" alt="Workspace detail" width={700} height={400} className="w-full h-[260px] object-cover" />
          <div className="p-6 flex flex-col justify-center">
            <h3 className="font-semibold">Built for the way you actually work</h3>
            <p className="text-[14px] text-[#475569] mt-2 leading-relaxed">Start with an idea, a folder of PDFs, or a half-written draft. MONIRESH meets you there and keeps the chain of custody visible.</p>
            <div className="mt-4 flex gap-2">
              <span className="badge-bright">No fake numbers</span>
              <span className="badge-bright">Export anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL WOW CTA with image */}
      <section className="bg-[#4F46E5] text-white">
        <div className="container-content py-12 md:py-16 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div>
            <h2 className="text-[30px] md:text-[36px] font-bold tracking-tight leading-none">Make your next paper <br />undeniable.</h2>
            <p className="text-white/80 mt-3 text-[15px] leading-relaxed">Join researchers who ship with evidence, not anxiety.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-[#4F46E5] rounded-[8px] px-6 py-3 font-semibold mt-6 hover:bg-[#EEF2FF] transition">Create your free account <ArrowRight className="h-4 w-4" /></Link>
            <p className="text-white/60 text-[13px] mt-2">No credit card • 5-min setup</p>
          </div>
          <div className="hidden md:block">
            <Image src="/images/use-case-team.jpg" alt="Team success" width={500} height={340} className="rounded-[16px] object-cover w-full h-[280px] shadow-xl" />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E2E8F0] py-6">
        <div className="container-content flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-[#64748B]">
          <span>© {new Date().getFullYear()} MONIRESH — Evidence, with care.</span>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-[#1E293B]">Sign in</Link>
            <Link href="/signup" className="hover:text-[#1E293B]">Create account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
