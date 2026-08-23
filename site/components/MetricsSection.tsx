"use client";

import { Database, PackageSearch, ShieldCheck, Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const icons = [Database, Users, PackageSearch, ShieldCheck];

export function MetricsSection() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.metrics.label} title={t.metrics.title} subtitle={t.metrics.subtitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {t.metrics.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.label} className="group relative overflow-hidden rounded-3xl border border-white bg-white/80 p-6 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-kazakh-gold/30 hover:shadow-gold-glow">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-bl from-kazakh-sky/10 to-transparent" />
                <div className="relative">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-kazakh-sky/10 text-kazakh-sky transition group-hover:bg-kazakh-sky group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-7 text-4xl font-black tracking-tight text-slate-950">{item.value}</p>
                  <p className="mt-2 font-bold text-slate-800">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{item.note}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
