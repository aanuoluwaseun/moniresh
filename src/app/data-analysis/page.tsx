"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileTopbar } from "@/components/layout/MobileTopbar";
import { BarChart3, Upload, ShieldAlert, Code2, Table2, CheckCircle2 } from "lucide-react";

export default function DataPage(){
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0">
        <MobileTopbar/>
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-pink-100">
          <div className="px-6 lg:px-8 py-4">
            <h1 className="text-[20px] font-extrabold tracking-tight flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Data Analysis — Statistical Intelligence</h1>
            <p className="text-xs text-ink-500">Upload CSV/Excel/SPSS • Assumption checker • Python/R generation • No invented statistics</p>
          </div>
        </header>
        <main className="px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border-2 border-dashed border-pink-100 bg-white p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-slate-400" />
                <div className="text-sm font-black mt-2">Upload dataset</div>
                <div className="text-xs text-ink-500">CSV, Excel, SPSS (.sav), Stata (.dta), R (.rds) — max 100MB. Data stays in your project, RLS protected.</div>
                <button className="mt-4 rounded-full bg-ink-900 px-6 py-2.5 text-xs font-bold text-white">Browse & Profile Data</button>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-left">
                  {[
                    ["Data cleaning","missing, outliers, duplicates, impossible values"],
                    ["Descriptives","mean, SD, frequency, distribution"],
                    ["Inferential","t-test, ANOVA, regression, SEM, mediation"],
                  ].map(([t,d])=>(
                    <div key={t} className="rounded-xl border border-slate-100 bg-moni-50 p-3"><div className="font-bold">{t}</div><div className="text-slate-600 leading-tight mt-1">{d}</div></div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-card">
                <h3 className="text-sm font-black flex items-center gap-2"><ShieldAlert className="h-4 w-4 text-amber-600" /> Statistical Assumption Checker (before analysis)</h3>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {[
                    ["Normality", "Shapiro p=.04 → non-normal", "warn"],
                    ["Multicollinearity", "VIF max 1.8 → OK", "ok"],
                    ["Homoscedasticity", "Breusch p=.22 → OK", "ok"],
                    ["Sample adequacy", "n=412, KMO .84 → adequate", "ok"],
                  ].map(([k,v,s])=>(
                    <div key={k} className={`rounded-xl border p-3 ${s==='ok' ? 'bg-emerald-50 border-emerald-200' : 'bg-moni-50 border-moni-200'}`}>
                      <div className="font-bold">{k}</div><div className="mt-1 leading-tight">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-ink-900 text-white p-3 text-xs">
                  <span className="font-bold">Recommendation:</span> Use robust standard errors due to slight normality violation. Consider PLS-SEM if you have formative constructs.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-card">
                <h3 className="text-sm font-bold flex items-center gap-2"><Code2 className="h-4 w-4" /> Statistical Code Generator</h3>
                <p className="text-xs text-ink-500 mt-1">Analysis → Code → Output → Interpretation. Reproducible.</p>
                <div className="mt-3 rounded-xl bg-ink-900 text-slate-100 p-3 font-mono text-xs leading-relaxed">
                  <div className="opacity-60"># Python (statsmodels)</div>
                  <div>import statsmodels.api as sm</div>
                  <div>X = df[["AI_literacy","Trust","Support"]]</div>
                  <div>y = df["Intention"]</div>
                  <div>model = sm.OLS(y, sm.add_constant(X)).fit(cov_type="HC3")</div>
                  <div>print(model.summary())</div>
                </div>
                <div className="mt-2 rounded-xl bg-moni-50 border p-3 font-mono text-xs">
                  <div className="opacity-60"># R</div>
                  <div>fit &lt;- lm(Intention ~ AI_literacy + Trust + Support, data=df)</div>
                  <div>summary(fit)</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-full bg-ink-900 py-2 text-xs font-bold text-white">Run Python</button>
                  <button className="flex-1 rounded-full border border-pink-100 py-2 text-xs font-bold">Copy R</button>
                </div>
              </div>

              <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-card">
                <h3 className="text-sm font-bold flex items-center gap-2"><Table2 className="h-4 w-4" /> Table Analyzer</h3>
                <div className="mt-2 text-xs leading-relaxed">
                  Upload manuscript — MONIRESH checks <span className="font-bold">Text → Table → Output</span> agreement. E.g. H1 says supported but p=.183 → flag.
                </div>
                <div className="mt-3 rounded-xl border border-moni-200 bg-moni-50 p-3 text-xs">
                  <div className="font-bold flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> HTMT, AVE, CR, VIF, R², model fit auto-checked</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
