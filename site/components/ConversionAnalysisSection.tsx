"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Check, Equal, Layers3 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const conversionData = {
  ru: [
    { group: "Без повторов", units: 33.8668, pairs: 46.01 },
    { group: "Только повторы", units: 8.4437, pairs: 23.1593 },
    { group: "Смешанная", units: 15.9834, pairs: 58.0033 },
  ],
  kk: [
    { group: "Қайталаусыз", units: 33.8668, pairs: 46.01 },
    { group: "Тек қайталау", units: 8.4437, pairs: 23.1593 },
    { group: "Аралас", units: 15.9834, pairs: 58.0033 },
  ],
};

const treatment = {
  ru: [
    { event: "Просмотр", primary: "Факт просмотра", check: "Отдельно проверяем массовый февральский сбой" },
    { event: "Корзина", primary: "Факт + число добавлений", check: "Не выдаём повторы за доказанное количество" },
    { event: "Покупка", primary: "Точные повторы объединены", check: "Только внутри подтверждённого интервала" },
  ],
  kk: [
    { event: "Қаралым", primary: "Қаралым фактісі", check: "Ақпандағы жаппай ақауды бөлек тексереміз" },
    { event: "Себет", primary: "Факт + қосу саны", check: "Қайталауды дәлелденген сан деп атамаймыз" },
    { event: "Сатып алу", primary: "Дәл қайталаулар біріктірілді", check: "Тек расталған аралықтың ішінде" },
  ],
};

function ConversionTooltip({ active, payload, label, locale }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string; locale: "ru" | "kk" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl">
      <p className="font-extrabold text-slate-950">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="mt-1 text-slate-600"><span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />{item.name}: {item.value.toLocaleString(locale === "ru" ? "ru-RU" : "kk-KZ")} %</p>
      ))}
    </div>
  );
}

export function ConversionAnalysisSection() {
  const { locale } = useLanguage();
  const data = locale === "ru" ? conversionData.ru : conversionData.kk;
  const rows = locale === "ru" ? treatment.ru : treatment.kk;
  const unitName = locale === "ru" ? "По единицам" : "Бірлік бойынша";
  const pairName = locale === "ru" ? "По парам пользователь–товар" : "Пайдаланушы–тауар жұбы";

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={locale === "ru" ? "Воронка без искажений" : "Бұрмаланбайтын шұңқыр"}
          title={locale === "ru" ? "Две конверсии отвечают на разные вопросы" : "Екі конверсия екі түрлі сұраққа жауап береді"}
          subtitle={locale === "ru"
            ? "Конверсия пользователя в покупателя и доля купленных единиц — не одно и то же. Мы показываем обе, чтобы повторные добавления в корзину не искажали вывод."
            : "Пайдаланушының сатып алушыға айналуы мен сатып алынған бірлік үлесі бірдей емес. Себеттегі қайталаулар қорытындыны бұрмаламауы үшін екеуін де көрсетеміз."}
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-black text-slate-950">{locale === "ru" ? "Конверсия корзины в покупку" : "Себеттен сатып алуға өту"}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">{locale === "ru" ? "Февральский сбой покупок исключён" : "Ақпандағы сатып алу ақауы алынып тасталды"}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm">%</span>
            </div>
            <div className="mt-5 h-[330px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 4, left: -16, bottom: 8 }} barGap={5}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="group" axisLine={false} tickLine={false} interval={0} tick={{ fill: "#475569", fontSize: 11, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 65]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                  <Tooltip cursor={{ fill: "rgba(148,163,184,.08)" }} content={<ConversionTooltip locale={locale} />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 12 }} />
                  <Bar dataKey="units" name={unitName} fill="#00AFCA" radius={[8, 8, 2, 2]} maxBarSize={48} />
                  <Bar dataKey="pairs" name={pairName} fill="#E5A910" radius={[8, 8, 2, 2]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <aside className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-kazakh-gold/10 text-kazakh-sun"><Equal className="h-5 w-5" /></span>
            <p className="mt-7 text-5xl font-black tracking-tight text-kazakh-sun">97,54%</p>
            <h3 className="mt-3 text-xl font-black">{locale === "ru" ? "купивших — с одной покупкой" : "сатып алғандарда бір ғана сатып алу бар"}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {locale === "ru"
                ? "Даже после нескольких добавлений одного товара обычно фиксировалась одна покупка. Поэтому повторы в корзине оставили в данных и анализируем отдельно."
                : "Бір тауарды бірнеше рет себетке қосқаннан кейін де көбіне бір сатып алу тіркелді. Сондықтан себеттегі қайталауларды деректе сақтап, бөлек талдаймыз."}
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-xs leading-5 text-slate-300">
              {locale === "ru" ? "Связь статистически заметна, но сама по себе не доказывает причину." : "Байланыс статистикалық тұрғыда көрінеді, бірақ себепті өздігінен дәлелдемейді."}
            </div>
          </aside>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white">
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-5 sm:px-7">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-kazakh-sky/10 text-kazakh-sky"><Layers3 className="h-5 w-5" /></span>
            <div>
              <h3 className="font-black text-slate-950">{locale === "ru" ? "Как события попадают в расчёты" : "Оқиғалар есепке қалай кіреді"}</h3>
              <p className="mt-0.5 text-xs text-slate-500">{locale === "ru" ? "Для каждого события — своё правило обработки" : "Әр оқиғаға жеке өңдеу ережесі қолданылады"}</p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {rows.map((row) => (
              <div key={row.event} className="grid gap-3 px-5 py-5 sm:grid-cols-[.55fr_1fr_1.35fr] sm:items-center sm:px-7">
                <p className="font-black text-slate-950">{row.event}</p>
                <p className="text-sm font-bold text-slate-700">{row.primary}</p>
                <p className="flex gap-2 text-sm leading-6 text-slate-500"><Check className="mt-1 h-4 w-4 shrink-0 text-kazakh-sky" />{row.check}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
