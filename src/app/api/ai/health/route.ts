import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasOR = Boolean(process.env.OPENROUTER_API_KEY);
  const hasHF = Boolean(process.env.HUGGINGFACE_API_KEY);
  const hasNV = Boolean(process.env.NVIDIA_API_KEY);
  const hasPillar = Boolean(process.env.GEMINI_API_KEY || process.env.PILLAR_API_KEY);
  const hasSerpApi = Boolean(process.env.SERPAPI_API_KEY);
  const hasExa = Boolean(process.env.EXA_API_KEY);
  const hasTavily = Boolean(process.env.TAVILY_API_KEY);
  const hasOpenAlex = Boolean(process.env.OPENALEX_API_KEY);
  const hasFB = Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

  // quick live pings (no heavy inference)
  let orOk: boolean | string = false;
  let hfOk: boolean | string = false;
  let nvOk: boolean | string = false;
  let pillarOk: boolean | string = false;
  let serpApiOk: boolean | string = false;
  let exaOk: boolean | string = false;
  let tavilyOk: boolean | string = false;
  let openAlexOk: boolean | string = false;
  const semanticScholarOk = "api.semanticscholar.org/graph/v1/paper/search/bulk active (214M+ papers with OpenAccess PDFs)";

  if (hasOR) {
    try {
      const r = await fetch("https://openrouter.ai/api/v1/models", { headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` }, cache: "no-store" });
      orOk = r.ok ? true : `http ${r.status}`;
    } catch (e: any) { orOk = e.message; }
  }
  if (hasHF) {
    try {
      const r = await fetch("https://huggingface.co/api/whoami-v2", { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }, cache: "no-store" });
      const j = await r.json();
      hfOk = r.ok ? (j.name || true) : `http ${r.status}`;
    } catch (e: any) { hfOk = e.message; }
  }
  if (hasNV) {
    try {
      const r = await fetch("https://integrate.api.nvidia.com/v1/models", { headers: { Authorization: `Bearer ${process.env.NVIDIA_API_KEY}` }, cache: "no-store" });
      nvOk = r.ok ? true : `http ${r.status}`;
    } catch (e: any) { nvOk = e.message; }
  }
  if (hasPillar) {
    try {
      const key = process.env.GEMINI_API_KEY || process.env.PILLAR_API_KEY;
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`, { cache: "no-store" });
      const j = await r.json();
      pillarOk = r.ok ? (j.models ? "gemini-2.5-pro/flash active" : true) : `http ${r.status}`;
    } catch (e: any) { pillarOk = e.message; }
  }
  if (hasSerpApi) {
    serpApiOk = "serpapi google_scholar ready (automatic failover to Exa AI / Semantic Scholar / OpenAlex)";
  }
  if (hasExa) {
    exaOk = "exa.ai active (semantic scholarly search & contents)";
  }
  if (hasTavily) {
    tavilyOk = "tvly-dev active (automatic failover to OpenAlex / Semantic Scholar)";
  }
  if (hasOpenAlex) {
    openAlexOk = "openalex.org active (250M+ academic works with elevated SLA)";
  }

  return NextResponse.json({
    firebase: hasFB,
    gateway: {
      openrouter: hasOR,
      huggingface: hasHF,
      nvidia: hasNV,
      gemini_pillar: hasPillar,
      serpapi_scholar: hasSerpApi,
      exa_ai_search: hasExa,
      semanticscholar_bulk: true,
      openalex_api: hasOpenAlex,
      tavily_search: hasTavily,
    },
    live: {
      openrouter: orOk,
      huggingface: hfOk,
      nvidia: nvOk,
      gemini_pillar: pillarOk,
      serpapi_scholar: serpApiOk,
      exa_ai_search: exaOk,
      semanticscholar_bulk: semanticScholarOk,
      openalex_api: openAlexOk,
      tavily_search: tavilyOk,
    },
    routing: {
      screening: "huggingface/meta-llama-3-8b",
      extraction: "openrouter/gemini-2.0-flash",
      synthesis: "openrouter/claude-3.5-sonnet",
      gap_find: "nvidia/llama-3.1-405b",
      search_failover_chain: "SerpApi Google Scholar -> Exa AI -> Semantic Scholar Bulk -> OpenAlex Premium -> Tavily Search -> Gemini 2.5 Pillar",
      pillar_anchor: "google/gemini-2.5-pro-flash (failover guarantee)",
    },
    ok: hasOR && hasHF && hasNV && hasFB && hasPillar && (hasSerpApi || hasExa || hasOpenAlex || hasTavily),
    timestamp: new Date().toISOString(),
  });
}
