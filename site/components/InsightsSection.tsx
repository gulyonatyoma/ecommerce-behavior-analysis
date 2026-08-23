"use client";

import { ArrowUpRight, Lightbulb } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

export function InsightsSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.insights.label} title={t.insights.title} subtitle={t.insights.subtitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {t.insights.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition duration-300 hover:border-kazakh-sky/25 hover:shadow-xl hover:shadow-kazakh-sky/5 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-kazakh-sky/10 px-3 py-1.5 text-xs font-bold text-kazakh-sky">
                  <Lightbulb className="h-3.5 w-3.5" />
                  {item.badge}
                </div>
                <span className="text-xs font-black tracking-[0.15em] text-slate-300">0{index + 1}</span>
              </div>
              <div className="mt-8 grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <h3 className="max-w-xl text-xl font-extrabold leading-snug tracking-tight text-slate-950 sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{item.description}</p>
                </div>
                <div className="min-w-36 rounded-2xl border border-kazakh-gold/20 bg-kazakh-gold/[0.06] p-4 shadow-[inset_0_0_30px_rgba(254,197,6,.035)]">
                  <p className="text-2xl font-black tracking-tight text-slate-950">{item.stat}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.statLabel}</p>
                </div>
              </div>
              <ArrowUpRight className="absolute bottom-5 right-5 h-5 w-5 text-slate-200 opacity-0 transition group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
