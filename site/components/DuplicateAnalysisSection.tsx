"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Eye, MousePointerClick, ReceiptText } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

type EventKey = "cart" | "purchase" | "view";

const eventData = [
  {
    key: "cart" as const,
    labelRu: "Корзина",
    labelKz: "Себет",
    extra: 858638,
    extraShort: "858,6 тыс.",
    extraShortKz: "858,6 мың",
    rate: 4.4922,
    max: 257,
    color: "#E5A910",
  },
  {
    key: "purchase" as const,
    labelRu: "Покупка",
    labelKz: "Сатып алу",
    extra: 151335,
    extraShort: "151,3 тыс.",
    extraShortKz: "151,3 мың",
    rate: 2.2096,
    max: 4,
    color: "#00AFCA",
  },
  {
    key: "view" as const,
    labelRu: "Просмотр",
    labelKz: "Қаралым",
    extra: 374449,
    extraShort: "374,4 тыс.",
    extraShortKz: "374,4 мың",
    rate: 0.0971,
    max: 36,
    color: "#64748B",
  },
];

const details = {
  ru: {
    cart: {
      title: "Повторы в корзине могут означать количество",
      description:
        "Одинаковые добавления встречаются до 257 раз. После 30 января их доля почти удвоилась, а 19 апреля резко вернулась к обычному уровню. Поэтому удалять их одним правилом нельзя.",
      result: "Храним и факт добавления, и число повторов как осторожную оценку количества.",
      evidence: [
        { value: "257", label: "максимум одинаковых добавлений" },
        { value: "6,47%", label: "доля лишних строк с 30 января по 19 апреля" },
        { value: "0,93%", label: "доля после 22 апреля" },
      ],
    },
    purchase: {
      title: "У покупок найден точный интервал двойной отправки",
      description:
        "Почти все группы состоят ровно из двух строк и сосредоточены в феврале. Начало сбоя зафиксировано с точностью до секунды, поэтому исправление применяется только внутри доказанного интервала.",
      result: "Объединяем точные повторы только с 10 по 18 февраля; остальные покупки не трогаем.",
      evidence: [
        { value: "99,87%", label: "групп повторов приходится на февраль" },
        { value: "99,99%", label: "групп содержит ровно две покупки" },
        { value: "99,47%", label: "совпало с одной ценой в корзине" },
      ],
    },
    view: {
      title: "Массовый сбой просмотров отделён от обычных возвратов",
      description:
        "Февральский всплеск распределён по десяткам тысяч пользователей и товаров — это системная ошибка. Редкие повторы за пределами всплеска могут быть настоящими повторными просмотрами.",
      result: "Массовый интервал анализируем отдельно, а редкие повторные просмотры сохраняем.",
      evidence: [
        { value: "92,8 тыс.", label: "пользователей во время всплеска" },
        { value: "116,2 тыс.", label: "затронутых сеансов" },
        { value: "52,7 тыс.", label: "затронутых товаров" },
      ],
    },
  },
  kk: {
    cart: {
      title: "Себеттегі қайталаулар тауар санын білдіруі мүмкін",
      description:
        "Бірдей қосу әрекеті 257 ретке дейін кездеседі. 30 қаңтардан кейін олардың үлесі екі есеге жуық өсті, ал 19 сәуірде бұрынғы деңгейге түсті. Сондықтан бәрін бір ережемен өшіруге болмайды.",
      result: "Қосу фактісін де, қайталау санын да тауар санының сақ бағасы ретінде сақтаймыз.",
      evidence: [
        { value: "257", label: "бірдей қосулардың ең үлкен саны" },
        { value: "6,47%", label: "30 қаңтар — 19 сәуір аралығындағы қайталанған жолдар" },
        { value: "0,93%", label: "22 сәуірден кейінгі үлес" },
      ],
    },
    purchase: {
      title: "Сатып алудың қосарланып жіберілген нақты аралығы табылды",
      description:
        "Топтардың басым бөлігі дәл екі жолдан тұрады және ақпанға шоғырланған. Ақаудың басталуы секундқа дейін анықталды, сондықтан түзету тек дәлелденген аралықта қолданылады.",
      result: "Дәл қайталауларды тек 10–18 ақпан аралығында біріктіреміз.",
      evidence: [
        { value: "99,87%", label: "қайталау топтарының ақпандағы үлесі" },
        { value: "99,99%", label: "дәл екі сатып алудан тұратын топтар" },
        { value: "99,47%", label: "себеттегі бір бағамен сәйкес келді" },
      ],
    },
    view: {
      title: "Жаппай ақау қалыпты қайта қаралымнан ажыратылды",
      description:
        "Ақпандағы өсім ондаған мың пайдаланушы мен тауарға таралған — бұл жүйелік қате. Ал одан тыс сирек қайталаулар шынайы қайта қаралым болуы мүмкін.",
      result: "Жаппай ақау аралығын бөлек талдаймыз, сирек қайта қаралымдарды сақтаймыз.",
      evidence: [
        { value: "92,8 мың", label: "ақау кезіндегі пайдаланушылар" },
        { value: "116,2 мың", label: "қамтылған сеанстар" },
        { value: "52,7 мың", label: "қамтылған тауарлар" },
      ],
    },
  },
} as const;

const icons = { cart: MousePointerClick, purchase: ReceiptText, view: Eye };

function RateTooltip({ active, payload, locale }: { active?: boolean; payload?: Array<{ payload: (typeof eventData)[number] }>; locale: "ru" | "kk" }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-xl">
      <p className="font-extrabold text-slate-950">{locale === "ru" ? item.labelRu : item.labelKz}</p>
      <p className="mt-1 text-slate-600">{locale === "ru" ? "Доля дублированных строк" : "Қайталанған жолдар үлесі"}: {item.rate.toLocaleString(locale === "ru" ? "ru-RU" : "kk-KZ")} %</p>
      <p className="text-slate-600">{locale === "ru" ? "Дублированных строк" : "Қайталанған жол саны"}: {item.extra.toLocaleString(locale === "ru" ? "ru-RU" : "kk-KZ")}</p>
    </div>
  );
}

export function DuplicateAnalysisSection() {
  const { locale } = useLanguage();
  const [activeEvent, setActiveEvent] = useState<EventKey>("purchase");
  const copy = locale === "ru" ? details.ru : details.kk;
  const active = copy[activeEvent];
  const chartData = useMemo(
    () => eventData.map((item) => ({ ...item, label: locale === "ru" ? item.labelRu : item.labelKz })),
    [locale],
  );

  return (
    <section id="duplicates" className="scroll-mt-16 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={locale === "ru" ? "Подробный разбор" : "Толық талдау"}
          title={locale === "ru" ? "Одинаковые строки — три разные причины" : "Бірдей жолдар — үш түрлі себеп"}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {eventData.map((item) => {
            const Icon = icons[item.key];
            return (
              <article key={item.key} className="rounded-[1.6rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white shadow-sm" style={{ color: item.color }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold text-white">
                    {locale === "ru" ? item.labelRu : item.labelKz}
                  </span>
                </div>
                <p className="mt-5 text-3xl font-black tracking-tight text-slate-950">{locale === "ru" ? item.extraShort : item.extraShortKz}</p>
                <p className="mt-1 text-sm font-bold text-slate-700">{locale === "ru" ? "дублированных строк" : "қайталанған жол"}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
                  <span>{locale === "ru" ? "Доля" : "Үлесі"} <b className="text-slate-900">{item.rate.toLocaleString(locale === "ru" ? "ru-RU" : "kk-KZ")} %</b></span>
                  <span>{locale === "ru" ? "До" : "Ең көбі"} <b className="text-slate-900">{item.max}×</b></span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[.85fr_1.15fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-slate-950">{locale === "ru" ? "Доля дублированных строк" : "Қайталанған жолдардың үлесі"}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{locale === "ru" ? "От исходного числа строк каждого события" : "Әр оқиғаның бастапқы жолдар санынан"}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm">%</span>
            </div>
            <div className="mt-5 h-[280px] w-full" aria-label={locale === "ru" ? "График доли дублированных строк" : "Қайталанған жолдар үлесінің сызбасы"}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 28, right: 8, left: -22, bottom: 0 }}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 5]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                  <Tooltip cursor={{ fill: "rgba(148,163,184,.08)" }} content={<RateTooltip locale={locale} />} />
                  <Bar dataKey="rate" radius={[10, 10, 3, 3]} maxBarSize={72}>
                    {chartData.map((entry) => <Cell key={entry.key} fill={entry.color} />)}
                    <LabelList dataKey="rate" position="top" formatter={(value: number) => `${value.toLocaleString(locale === "ru" ? "ru-RU" : "kk-KZ")} %`} style={{ fill: "#0f172a", fontSize: 11, fontWeight: 800 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
              {locale === "ru" ? "Важно: дублированные строки — диагностический показатель, а не готовый список на удаление." : "Маңызды: қайталанған жолдар — жою тізімі емес, диагностикалық көрсеткіш."}
            </p>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-5 text-white sm:p-7">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label={locale === "ru" ? "Тип события" : "Оқиға түрі"}>
              {eventData.map((item) => {
                const Icon = icons[item.key];
                const selected = activeEvent === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveEvent(item.key)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold transition ${selected ? "bg-white text-slate-950" : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {locale === "ru" ? item.labelRu : item.labelKz}
                  </button>
                );
              })}
            </div>

            <div className="mt-8" role="tabpanel">
              <h3 className="max-w-2xl text-2xl font-black leading-tight tracking-tight sm:text-3xl">{active.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">{active.description}</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {active.evidence.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                    <p className="text-xl font-black text-kazakh-sun">{item.value}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3 rounded-2xl border border-kazakh-sky/20 bg-kazakh-sky/10 p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-kazakh-sky shadow-[0_0_14px_rgba(0,175,202,.8)]" />
                <p className="text-sm font-bold leading-6 text-slate-100">{active.result}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
