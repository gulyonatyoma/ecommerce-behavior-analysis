"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Maximize2, PanelsTopLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { MockDashboard } from "@/components/MockDashboard";
import { SectionHeading } from "@/components/SectionHeading";

type DataLensTokenResponse = {
  token: string;
  expiresAt: number;
};

export function DashboardSection() {
  const { locale, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const secureEmbedInitialized = useRef(false);
  const iframeLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [secureEmbedUrl, setSecureEmbedUrl] = useState<string | null>(null);
  const [secureEmbedError, setSecureEmbedError] = useState(false);
  const secureEmbedEnabled = process.env.NEXT_PUBLIC_DATALENS_SECURE_EMBED === "1";
  const rawDataLensUrl = process.env.NEXT_PUBLIC_DATALENS_URL?.trim();
  const publicDataLensUrl = useMemo(() => {
    if (!rawDataLensUrl) return null;

    try {
      const url = new URL(rawDataLensUrl);
      if (url.protocol !== "https:") return null;

      const defaults = {
        _embedded: "1",
        _no_controls: "1",
        _theme: "light",
        _lang: "ru",
        _autoupdate: "60",
        _reload_on_session_expire: "1",
      };

      Object.entries(defaults).forEach(([key, value]) => {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      });

      return url.toString();
    } catch {
      return null;
    }
  }, [rawDataLensUrl]);
  const dataLensUrl = secureEmbedUrl ?? publicDataLensUrl;
  const isSecureEmbedLoading = secureEmbedEnabled && !secureEmbedUrl && !secureEmbedError;
  const hasDataLens = Boolean(dataLensUrl) || isSecureEmbedLoading;
  const externalDataLensUrl = secureEmbedUrl ?? rawDataLensUrl;

  useEffect(() => {
    if (!secureEmbedEnabled) return;

    let active = true;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;

    const refreshToken = async () => {
      try {
        const response = await fetch("/api/datalens-token", { cache: "no-store" });
        if (!response.ok) throw new Error(`Token endpoint returned ${response.status}`);

        const { token } = (await response.json()) as DataLensTokenResponse;
        if (!active || !token) return;

        if (secureEmbedInitialized.current && iframeLoaded.current && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { type: "SECURE_EMBEDDING_TOKEN_UPDATE", token },
            "https://datalens.ru",
          );
        } else {
          const embedUrl = new URL("https://datalens.ru/embeds/dash");
          embedUrl.hash = `dl_embed_token=${token}`;
          secureEmbedInitialized.current = true;
          setSecureEmbedUrl(embedUrl.toString());
        }

        setSecureEmbedError(false);
        refreshTimer = setTimeout(refreshToken, 240_000);
      } catch (error) {
        console.error("Failed to load the DataLens embed token", error);
        if (active) setSecureEmbedError(true);
      }
    };

    void refreshToken();

    return () => {
      active = false;
      if (refreshTimer) clearTimeout(refreshTimer);
    };
  }, [secureEmbedEnabled]);

  useEffect(() => {
    if (dataLensUrl) {
      iframeLoaded.current = false;
      setIsLoading(true);
    }
  }, [dataLensUrl]);

  const enterFullscreen = async () => {
    if (containerRef.current?.requestFullscreen) {
      await containerRef.current.requestFullscreen();
    }
  };

  return (
    <section id="dashboard" className="scroll-mt-16 bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="[&_h2]:text-white [&_p]:text-slate-400">
          <SectionHeading label={t.dashboard.label} title={t.dashboard.title} subtitle={t.dashboard.subtitle} />
        </div>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/25 backdrop-blur-md">
          <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-kazakh-sky/15 text-kazakh-sky">
                <PanelsTopLeft className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-extrabold text-white">{t.dashboard.dashboardName}</p>
                  {!hasDataLens && (
                    <span className="rounded-full border border-kazakh-gold/30 bg-kazakh-gold/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-kazakh-sun">
                      {t.dashboard.mockBadge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{t.dashboard.dashboardDimensions}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {dataLensUrl && externalDataLensUrl && (
                <a
                  href={externalDataLensUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.dashboard.openExternal}</span>
                </a>
              )}
              <button
                type="button"
                onClick={enterFullscreen}
                className="inline-flex items-center gap-2 rounded-xl border border-kazakh-gold/30 bg-kazakh-gold/10 px-3 py-2 text-xs font-bold text-kazakh-sun transition hover:bg-kazakh-gold/15"
              >
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t.dashboard.fullscreen}</span>
              </button>
            </div>
          </div>

          <div ref={containerRef} className="bg-slate-100 fullscreen:bg-slate-100 fullscreen:p-3">
            {dataLensUrl ? (
              <div className="relative h-[700px] w-full sm:h-[760px] lg:h-[820px] xl:h-[880px]">
                {isLoading && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-slate-100 text-sm font-semibold text-slate-500">
                    {locale === "ru" ? "Загружаем отчёт…" : "Есеп жүктелуде…"}
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  key={dataLensUrl}
                  title={locale === "ru" ? "Интерактивный отчёт DataLens" : "DataLens интерактивті есебі"}
                  src={dataLensUrl}
                  className="h-full w-full border-0 bg-white"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => {
                    iframeLoaded.current = true;
                    setIsLoading(false);
                  }}
                />
              </div>
            ) : isSecureEmbedLoading ? (
              <div className="grid h-[700px] place-items-center bg-slate-100 text-sm font-semibold text-slate-500 sm:h-[760px] lg:h-[820px] xl:h-[880px]">
                {locale === "ru" ? "Подключаем защищённый отчёт…" : "Қорғалған есеп қосылуда…"}
              </div>
            ) : (
              <MockDashboard />
            )}
          </div>

          {!hasDataLens && (
            <div className="border-t border-white/10 bg-kazakh-sky/[0.055] px-5 py-4">
              <p className="text-sm font-bold text-slate-200">
                {secureEmbedError
                  ? locale === "ru"
                    ? "Не удалось подключить защищённый отчёт"
                    : "Қорғалған есепті қосу мүмкін болмады"
                  : t.dashboard.mockTitle}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{t.dashboard.mockDescription}</p>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h3 className="text-xl font-black text-white">{t.dashboard.glossaryTitle}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{t.dashboard.glossarySubtitle}</p>
          </div>
          <div className="space-y-2">
            {t.dashboard.glossary.map((item, index) => (
              <details key={item.term} className="group rounded-2xl border border-white/10 bg-white/[0.035] open:border-kazakh-gold/25 open:shadow-[0_0_24px_rgba(229,169,16,.055)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                  <span className="flex items-center gap-3 text-sm font-extrabold text-slate-100">
                    <span className="text-xs font-black text-kazakh-sky">0{index + 1}</span>
                    {item.term}
                  </span>
                  <span className="text-lg text-slate-500 transition group-open:rotate-45 group-open:text-kazakh-sun">+</span>
                </summary>
                <p className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-6 text-slate-400">{item.definition}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
