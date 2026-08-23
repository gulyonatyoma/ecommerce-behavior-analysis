"use client";

import { ArrowRight, CheckCircle2, Database, Filter, Layers3, MonitorDot } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { KazakhOrnament } from "@/components/KazakhOrnament";
import { SectionHeading } from "@/components/SectionHeading";

const pipelineIcons = [Database, Filter, Layers3, MonitorDot];

export function MethodologySection() {
  const { t } = useLanguage();

  return (
    <section id="methodology" className="relative scroll-mt-16 overflow-hidden bg-white py-20 sm:py-24">
      <KazakhOrnament className="absolute -left-20 top-24 h-72 w-72 text-kazakh-sky opacity-[0.055]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.methodology.label} title={t.methodology.title} subtitle={t.methodology.subtitle} />

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-7 lg:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-black text-slate-950 sm:text-xl">{t.methodology.pipelineTitle}</h3>
            <span className="rounded-full border border-kazakh-sky/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-kazakh-sky">{t.methodology.pipelineBadge}</span>
          </div>
          <div className="mt-7 grid gap-3 lg:grid-cols-4">
            {t.methodology.pipeline.map((step, index) => {
              const Icon = pipelineIcons[index];
              return (
                <div key={step.title} className="relative">
                  <article className="h-full rounded-2xl border border-white bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-kazakh-gold/30 hover:shadow-gold-glow">
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-kazakh-sky/10 text-kazakh-sky"><Icon className="h-5 w-5" /></span>
                      <span className="text-xs font-black text-slate-300">0{index + 1}</span>
                    </div>
                    <h4 className="mt-5 font-extrabold text-slate-950">{step.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
                  </article>
                  {index < t.methodology.pipeline.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-kazakh-gold lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.45fr_.55fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-6 sm:p-7">
              <h3 className="text-xl font-black text-slate-950">{t.methodology.schemaTitle}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{t.methodology.schemaSubtitle}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-bold">{t.methodology.table.field}</th>
                    <th className="px-6 py-4 font-bold">{t.methodology.table.type}</th>
                    <th className="px-6 py-4 font-bold">{t.methodology.table.example}</th>
                    <th className="px-6 py-4 font-bold">{t.methodology.table.purpose}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {t.methodology.rows.map((row) => (
                    <tr key={row.field} className="transition hover:bg-kazakh-sky/[0.025]">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-kazakh-sky">{row.field}</td>
                      <td className="px-6 py-4 text-slate-500">{row.type}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{row.example}</td>
                      <td className="px-6 py-4 leading-6 text-slate-600">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-kazakh-gold/20 bg-gradient-to-br from-kazakh-gold/[0.08] to-white p-6 shadow-[0_18px_60px_rgba(229,169,16,.08)] sm:p-7">
            <h3 className="text-xl font-black text-slate-950">{t.methodology.principlesTitle}</h3>
            <div className="mt-6 space-y-4">
              {t.methodology.principles.map((principle) => (
                <div key={principle} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-kazakh-gold" />
                  <p className="text-sm leading-6 text-slate-600">{principle}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white sm:p-7 lg:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-kazakh-sky">{t.methodology.martsLabel}</p>
              <h3 className="mt-1 text-xl font-black sm:text-2xl">{t.methodology.martsTitle}</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">{t.methodology.martsSubtitle}</p>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {t.methodology.marts.map((mart) => (
              <article key={mart.name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                <p className="font-mono text-xs font-bold text-kazakh-sky">{mart.name}</p>
                <p className="mt-3 text-xl font-black text-white">{mart.size}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{mart.grain}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{mart.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
