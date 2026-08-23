"use client";

import { BarChart3, Crown, Lightbulb, ShieldCheck, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const iconMap = {
  dq: ShieldCheck,
  funnel: BarChart3,
  users: Users,
  mentor: Lightbulb,
  lead: Crown,
} as const;

export function TeamSection() {
  const { t } = useLanguage();

  return (
    <section id="team" className="scroll-mt-16 border-t border-slate-100 bg-slate-50/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={t.team.label} title={t.team.title} subtitle={t.team.subtitle} align="center" />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {t.team.members.map((member) => {
            const Icon = iconMap[member.icon as keyof typeof iconMap] ?? Sparkles;
            return (
              <article
                key={member.name}
                className={`group overflow-hidden rounded-[1.75rem] border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-gold-glow ${
                  member.icon === "mentor" ? "border-kazakh-gold/35" : "border-white hover:border-kazakh-gold/25"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    unoptimized
                    sizes="(min-width: 1280px) 240px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 opacity-0 transition duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                        <Icon className="h-3.5 w-3.5 text-kazakh-sun" />
                        {member.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-black leading-snug text-white">{member.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-kazakh-sun/95">{member.role}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{t.team.contribution}</p>
                  <p className="mt-2 min-h-[150px] text-sm leading-6 text-slate-600">{member.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                    {member.focus.map((item) => (
                      <span
                        key={item}
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                          member.icon === "mentor"
                            ? "bg-kazakh-gold/10 text-kazakh-gold"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
