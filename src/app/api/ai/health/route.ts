import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasOR = Boolean(process.env.OPENROUTER_API_KEY);
  const hasHF = Boolean(process.env.HUGGINGFACE_API_KEY);
  const hasNV = Boolean(process.env.NVIDIA_API_KEY);
  const hasFB = Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

  // quick live pings (no heavy inference)
  let orOk: boolean | string = false;
  let hfOk: boolean | string = false;
  let nvOk: boolean | string = false;

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

  return NextResponse.json({
    firebase: hasFB,
    gateway: { openrouter: hasOR, huggingface: hasHF, nvidia: hasNV },
    live: { openrouter: orOk, huggingface: hfOk, nvidia: nvOk },
    routing: {
      screening: "huggingface/meta-llama-3-8b",
      extraction: "openrouter/gemini-2.0-flash",
      synthesis: "openrouter/claude-3.5-sonnet",
      gap_find: "nvidia/llama-3.1-405b",
    },
    ok: hasOR && hasHF && hasNV && hasFB,
    timestamp: new Date().toISOString(),
  });
}
