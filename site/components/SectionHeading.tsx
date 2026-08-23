export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-kazakh-sky/20 bg-kazakh-sky/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-kazakh-sky">
        <span className="h-1.5 w-1.5 rounded-full bg-kazakh-gold shadow-[0_0_12px_rgba(229,169,16,.75)]" />
        {label}
      </div>
      <h2 className="text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
