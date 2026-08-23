"use client";

import { ArrowDownRight, BarChart3, Database, Sparkles, Target } from "lucide-react";
import { KazakhOrnament } from "@/components/KazakhOrnament";
import { useLanguage } from "@/components/LanguageProvider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="overview" className="relative overflow-hidden bg-white pt-16">
      <div className="absolute inset-0 bg-hero-grid bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="absolute left-[-7rem] top-24 h-80 w-80 rounded-full bg-kazakh-sky/10 blur-3xl" />
      <div className="absolute right-[-5rem] top-36 h-96 w-96 rounded-full bg-kazakh-sun/10 blur-3xl" />
      <KazakhOrnament className="absolute right-8 top-24 hidden h-64 w-64 text-kazakh-gold opacity-[0.075] lg:block" />

      <div className="relative mx-auto grid min-h-[780px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-kazakh-sky/20 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-kazakh-sky shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-kazakh-gold" />
            {t.hero.eyebrow}
          </div>

          <h1 className="max-w-4xl text-balance text-5xl font-black leading-[.98] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl xl:text-[5.35rem]">
            {t.hero.titleA}
            <span className="mt-2 block bg-gradient-to-r from-kazakh-sky via-kazakh-blue to-cyan-600 bg-clip-text text-transparent">
              {t.hero.titleB}
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
            {t.hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#dashboard"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <BarChart3 className="h-[18px] w-[18px] text-kazakh-sun" />
              {t.hero.dashboardCta}
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#methodology"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-900 shadow-sm backdrop-blur-md transition hover:border-kazakh-gold/50 hover:shadow-gold-glow"
            >
              <Database className="h-[18px] w-[18px] text-kazakh-sky" />
              {t.hero.methodologyCta}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-kazakh-sky/20 via-transparent to-kazakh-gold/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-5">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{t.hero.pulseLabel}</p>
                  <p className="mt-1 text-lg font-extrabold">{t.hero.pulseTitle}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  {t.hero.status}
                </span>
              </div>

              <div className="mt-8 grid grid-cols-12 items-end gap-2" aria-label="Decorative activity chart">
                {[36, 52, 42, 70, 58, 78, 66, 92, 72, 88, 64, 96].map((height, index) => (
                  <div key={index} className="flex h-36 items-end rounded-full bg-white/[0.04] p-1">
                    <div
                      className="w-full rounded-full bg-gradient-to-t from-kazakh-sky to-cyan-300 shadow-[0_0_20px_rgba(0,175,202,.24)]"
                      style={{ height: `${height}%`, opacity: 0.55 + index / 30 }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Database className="h-4 w-4 text-kazakh-sky" />
                    <span className="text-xs font-semibold">{t.hero.dataLabel}</span>
                  </div>
                  <p className="mt-3 text-xl font-black">{t.hero.dataValue}</p>
                </div>
                <div className="rounded-2xl border border-kazakh-gold/20 bg-kazakh-gold/[0.06] p-4 shadow-[inset_0_0_28px_rgba(254,197,6,.04)]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Target className="h-4 w-4 text-kazakh-sun" />
                    <span className="text-xs font-semibold">{t.hero.focusLabel}</span>
                  </div>
                  <p className="mt-3 text-base font-extrabold leading-snug">{t.hero.focusValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
