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
import { ArrowRight, Layers3, Network, Target } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const copy = {
  ru: {
    label: "Покупатели",
    title: "Сегменты показывают приоритет, кластеры — поведение",
    subtitle: "Два взгляда на 2,06 млн покупателей: кого важно удерживать и как разные группы взаимодействуют с магазином.",
    buyers: "Доля покупателей",
    value: "Доля стоимости покупок",
    rfmTitle: "Сегментация по давности, частоте и стоимости",
    rfmText: "Разделяет базу по текущему состоянию покупателя и помогает расставить приоритеты.",
    rfmStat: "42,8% покупателей дают 80,2% стоимости",
    clusterTitle: "Поведенческая кластеризация",
    clusterText: "Добавляет интенсивность действий, сеансы, корзины и повторные покупки — всего 13 признаков.",
    clusterStat: "20,1% покупателей дают 66,1% стоимости",
    recommendations: "Что можно проверить в продукте",
    hypothesis: "Продуктовая гипотеза",
    testNote: "Это направления для проверки, а не доказанные причины. Апрельская проверка содержит известный разрыв данных, поэтому важен отдельный эксперимент.",
    segments: [
      { name: "Новые", buyers: 14.01, value: 4.9 },
      { name: "Ценные", buyers: 8.1, value: 35.03 },
      { name: "Постоянные", buyers: 5.34, value: 4.35 },
      { name: "Активные", buyers: 13.29, value: 6.14 },
      { name: "В зоне риска", buyers: 34.67, value: 45.14 },
      { name: "Ушедшие", buyers: 24.6, value: 4.44 },
    ],
    clusters: [
      { name: "Активное ядро", buyers: 10.91, value: 39.02 },
      { name: "Ценные повторные", buyers: 9.16, value: 27.12 },
      { name: "Исследователи", buyers: 25.8, value: 6.05 },
      { name: "Спящие разовые", buyers: 25.28, value: 9.95 },
    ],
    actions: [
      {
        stat: "45,1%",
        title: "Вернуть покупателей в зоне риска",
        text: "Проверить персональные напоминания по знакомым категориям и сохранённым корзинам. Измерять возврат к покупке за 30 дней.",
      },
      {
        stat: "25,8%",
        title: "Довести исследователей до второй покупки",
        text: "Упростить возврат к просмотренным товарам и сравнению вариантов. Измерять долю второй покупки, а не число просмотров.",
      },
      {
        stat: "66,1%",
        title: "Не перегружать активное ядро скидками",
        text: "Проверить рекомендации дополнений к прошлым покупкам и сервисные преимущества. Следить за частотой и стоимостью покупок.",
      },
    ],
  },
  kk: {
    label: "Сатып алушылар",
    title: "Сегменттер басымдықты, кластерлер мінезді көрсетеді",
    subtitle: "2,06 млн сатып алушыға екі көзқарас: кімді ұстап қалу маңызды және әр топ дүкенмен қалай әрекеттеседі.",
    buyers: "Сатып алушылар үлесі",
    value: "Сатып алу құнының үлесі",
    rfmTitle: "Соңғы сатып алу, жиілік және құн бойынша сегменттеу",
    rfmText: "Сатып алушыларды қазіргі күйіне бөліп, басымдықтарды анықтауға көмектеседі.",
    rfmStat: "Сатып алушылардың 42,8%-ы құнның 80,2%-ын береді",
    clusterTitle: "Мінез-құлық кластерлері",
    clusterText: "Әрекет қарқынын, сеанстарды, себетті және қайта сатып алуды қосады — барлығы 13 белгі.",
    clusterStat: "Сатып алушылардың 20,1%-ы құнның 66,1%-ын береді",
    recommendations: "Өнімде нені тексеруге болады",
    hypothesis: "Өнімдік болжам",
    testNote: "Бұл дәлелденген себептер емес, тек тексеру бағыттары. Сәуір деректерінде белгілі үзіліс бар, сондықтан бөлек тәжірибе қажет.",
    segments: [
      { name: "Жаңа", buyers: 14.01, value: 4.9 },
      { name: "Құнды", buyers: 8.1, value: 35.03 },
      { name: "Тұрақты", buyers: 5.34, value: 4.35 },
      { name: "Белсенді", buyers: 13.29, value: 6.14 },
      { name: "Тәуекелде", buyers: 34.67, value: 45.14 },
      { name: "Кеткен", buyers: 24.6, value: 4.44 },
    ],
    clusters: [
      { name: "Белсенді өзек", buyers: 10.91, value: 39.02 },
      { name: "Құнды қайталама", buyers: 9.16, value: 27.12 },
      { name: "Зерттеушілер", buyers: 25.8, value: 6.05 },
      { name: "Ұйқыдағы бір реттік", buyers: 25.28, value: 9.95 },
    ],
    actions: [
      {
        stat: "45,1%",
        title: "Тәуекелдегі сатып алушыларды қайтару",
        text: "Таныс санаттар мен сақталған себет бойынша жеке еске салуды тексеру. 30 күндегі қайта сатып алуды өлшеу.",
      },
      {
        stat: "25,8%",
        title: "Зерттеушілерді екінші сатып алуға жеткізу",
        text: "Қаралған тауарлар мен салыстыруға оралуды жеңілдету. Қаралымды емес, екінші сатып алу үлесін өлшеу.",
      },
      {
        stat: "66,1%",
        title: "Белсенді өзекті жеңілдікпен жүктемеу",
        text: "Өткен сатып алуға толықтырулар мен сервистік артықшылықтарды тексеру. Жиілік пен сатып алу құнын бақылау.",
      },
    ],
  },
} as const;

function ChartTooltip({
  active,
  payload,
  label,
  locale,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  locale: "ru" | "kk";
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl">
      <p className="font-extrabold text-slate-950">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="mt-1 text-slate-600">
          <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.name}: {item.value.toLocaleString(locale === "ru" ? "ru-RU" : "kk-KZ")} %
        </p>
      ))}
    </div>
  );
}

function ComparisonChart({
  data,
  buyersLabel,
  valueLabel,
  locale,
  height,
}: {
  data: ReadonlyArray<{ name: string; buyers: number; value: number }>;
  buyersLabel: string;
  valueLabel: string;
  locale: "ru" | "kk";
  height: number;
}) {
  return (
    <div style={{ height }} className="mt-5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[...data]} layout="vertical" margin={{ top: 4, right: 8, left: 8, bottom: 4 }} barGap={2}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" horizontal={false} />
          <XAxis type="number" domain={[0, 50]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} tickFormatter={(value) => `${value}%`} />
          <YAxis type="category" dataKey="name" width={105} axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 10, fontWeight: 700 }} />
          <Tooltip cursor={{ fill: "rgba(148,163,184,.08)" }} content={<ChartTooltip locale={locale} />} />
          <Legend wrapperStyle={{ fontSize: 10, color: "#64748b", paddingTop: 8 }} />
          <Bar dataKey="buyers" name={buyersLabel} fill="#00AFCA" radius={[0, 7, 7, 0]} maxBarSize={12} isAnimationActive={false} />
          <Bar dataKey="value" name={valueLabel} fill="#E5A910" radius={[0, 7, 7, 0]} maxBarSize={12} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CustomerSegmentationSection() {
  const { locale } = useLanguage();
  const text = locale === "ru" ? copy.ru : copy.kk;

  return (
    <section id="customers" className="scroll-mt-16 bg-slate-50/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={text.label} title={text.title} subtitle={text.subtitle} />

        <div className="mt-10 grid gap-5 xl:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-kazakh-sky/10 text-kazakh-sky">
                <Layers3 className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-950">{text.rfmTitle}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text.rfmText}</p>
              </div>
            </div>
            <ComparisonChart data={text.segments} buyersLabel={text.buyers} valueLabel={text.value} locale={locale} height={300} />
            <p className="mt-4 rounded-2xl bg-kazakh-sky/[0.07] px-4 py-3 text-sm font-black text-slate-950">{text.rfmStat}</p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-kazakh-gold/10 text-kazakh-gold">
                <Network className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-950">{text.clusterTitle}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text.clusterText}</p>
              </div>
            </div>
            <ComparisonChart data={text.clusters} buyersLabel={text.buyers} valueLabel={text.value} locale={locale} height={300} />
            <p className="mt-4 rounded-2xl bg-kazakh-gold/[0.08] px-4 py-3 text-sm font-black text-slate-950">{text.clusterStat}</p>
          </article>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-kazakh-sun"><Target className="h-5 w-5" /></span>
          <h3 className="text-xl font-black text-slate-950">{text.recommendations}</h3>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {text.actions.map((action, index) => (
            <article key={action.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-black text-kazakh-sky">{action.stat}</p>
                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{text.hypothesis} 0{index + 1}</span>
              </div>
              <h4 className="mt-4 text-lg font-black leading-snug text-slate-950">{action.title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">{action.text}</p>
              <ArrowRight className="mt-5 h-4 w-4 text-kazakh-gold" />
            </article>
          ))}
        </div>

        <p className="mt-5 max-w-4xl text-xs leading-5 text-slate-500">{text.testNote}</p>
      </div>
    </section>
  );
}
