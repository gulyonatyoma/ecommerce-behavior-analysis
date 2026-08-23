"use client";

import { useEffect, useState } from "react";
import { Github, Languages, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const sections = ["overview", "quality", "duplicates", "ml", "dashboard", "methodology", "team"] as const;
const localeLabels = { ru: "RU", kk: "KZ" } as const;

export function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [active, setActive] = useState<(typeof sections)[number]>("overview");
  const [open, setOpen] = useState(false);
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/gulyonatyoma/ecommerce-behavior-analysis";

  const nav = [
    { id: "overview", label: t.nav.overview },
    { id: "quality", label: t.nav.quality },
    { id: "duplicates", label: locale === "ru" ? "Разбор повторов" : "Қайталаулар" },
    { id: "ml", label: "ML" },
    { id: "dashboard", label: t.nav.dashboard },
    { id: "methodology", label: t.nav.methodology },
    { id: "team", label: t.nav.team },
  ] as const;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id as (typeof sections)[number]);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#overview" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-kazakh-sky to-kazakh-blue text-sm font-black text-white shadow-sky-glow transition-transform group-hover:-rotate-3">K</span>
          <span className="hidden text-sm font-extrabold tracking-tight text-slate-950 sm:block">{t.nav.brand}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-all ${active === item.id ? "bg-white text-slate-950 shadow-gold-glow" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-slate-200 bg-white p-1 sm:flex" aria-label="Language selector">
            <Languages className="ml-1 h-3.5 w-3.5 text-slate-400" />
            {(["ru", "kk"] as const).map((lang) => (
              <button key={lang} type="button" onClick={() => setLocale(lang)} className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase transition ${locale === lang ? "bg-kazakh-sky text-white" : "text-slate-500 hover:text-slate-900"}`} aria-pressed={locale === lang}>
                {localeLabels[lang]}
              </button>
            ))}
          </div>

          <a href={githubUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-3.5 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 sm:flex">
            <Github className="h-4 w-4" />
            {t.nav.repository}
          </a>

          <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden" aria-label={open ? t.nav.closeMenu : t.nav.menu} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 text-sm font-semibold ${active === item.id ? "bg-kazakh-sky/10 text-kazakh-sky" : "text-slate-700"}`}>
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex rounded-full border border-slate-200 p-1">
                {(["ru", "kk"] as const).map((lang) => (
                  <button key={lang} type="button" onClick={() => setLocale(lang)} className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase ${locale === lang ? "bg-kazakh-sky text-white" : "text-slate-500"}`}>
                    {localeLabels[lang]}
                  </button>
                ))}
              </div>
              <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-slate-900"><Github className="h-4 w-4" /> {t.nav.repository}</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
