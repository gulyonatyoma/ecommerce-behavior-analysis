"use client";

import {
  AlertTriangle,
  BadgeCheck,
  Fingerprint,
  GitBranch,
  ShieldAlert,
  Tags,
  TimerOff,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const qualityIcons = [BadgeCheck, TimerOff, Fingerprint, GitBranch, Tags, AlertTriangle];

export function DataQualitySection() {
  const { t } = useLanguage();

  return (
    <section id="quality" className="scroll-mt-16 bg-slate-50/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.quality.label} title={t.quality.title} subtitle={t.quality.subtitle} />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.quality.cards.map((item, index) => {
            const Icon = qualityIcons[index];
            return (
              <article key={item.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-kazakh-sky/10 text-kazakh-sky">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-slate-950 px-4 py-2 text-base font-black leading-none text-white sm:text-lg">{item.stat}</span>
                </div>
                <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">{item.title}</h3>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-kazakh-gold/10 text-kazakh-sun">
                <GitBranch className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-kazakh-sky">{t.quality.caseStudyLabel}</p>
                <h3 className="mt-1 text-xl font-black">{t.quality.caseStudyTitle}</h3>
              </div>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{t.quality.caseStudySubtitle}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.quality.caseStudy.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                  <p className="text-2xl font-black text-kazakh-sun">{item.stat}</p>
                  <h4 className="mt-2 font-extrabold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-amber-200/70 bg-amber-50/70 p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-600" />
              <h3 className="text-xl font-black text-slate-950">{t.quality.limitationsTitle}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t.quality.limitationsSubtitle}</p>
            <div className="mt-5 space-y-4">
              {t.quality.limitations.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
