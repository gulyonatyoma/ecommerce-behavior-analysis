"use client";

import { ArrowUp, Github } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/gulyonatyoma/ecommerce-behavior-analysis";

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-kazakh-sky text-sm font-black">K</span>
              <p className="font-black">{t.footer.title}</p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">{t.footer.description}</p>
            <p className="mt-2 text-xs font-semibold text-slate-600">{t.footer.builtWith}</p>
          </div>
          <div className="flex gap-2">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-white/10"><Github className="h-4 w-4" /> GitHub</a>
            <a href="#overview" className="inline-flex items-center gap-2 rounded-xl border border-kazakh-gold/20 bg-kazakh-gold/10 px-4 py-2.5 text-xs font-bold text-kazakh-sun transition hover:bg-kazakh-gold/15"><ArrowUp className="h-4 w-4" /> {t.footer.backToTop}</a>
          </div>
        </div>
        <p className="pt-6 text-xs text-slate-600">© 2026 {t.footer.rights}</p>
      </div>
    </footer>
  );
}
