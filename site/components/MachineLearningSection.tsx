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
import {
  BrainCircuit,
  CalendarRange,
  CheckCircle2,
  DatabaseZap,
  Target,
  TriangleAlert,
  UserRoundSearch,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const captureData = {
  ru: [
    { group: "Test · все", top5: 55.05, top10: 70.39 },
    { group: "Новые · все", top5: 54.73, top10: 70.8 },
    { group: "Test · view", top5: 42.43, top10: 54.28 },
    { group: "Новые · view", top5: 43.06, top10: 54.78 },
  ],
  kk: [
    { group: "Test · бәрі", top5: 55.05, top10: 70.39 },
    { group: "Жаңа · бәрі", top5: 54.73, top10: 70.8 },
    { group: "Test · view", top5: 42.43, top10: 54.28 },
    { group: "Жаңа · view", top5: 43.06, top10: 54.78 },
  ],
};

const copy = {
  ru: {
    label: "ML • purchase propensity",
    title: "Какие взаимодействия с товаром закончатся покупкой",
    subtitle:
      "CatBoost ранжирует пары «пользователь–товар» по вероятности события покупки в следующие 7 дней. В прогноз попадает только информация, доступная на момент просмотра или добавления в корзину.",
    pipeline: [
      { value: "30 дней", title: "История", text: "Активность пользователя, товара и их пары до точки прогноза." },
      { value: "view / cart", title: "Точка скоринга", text: "Прогноз строится в момент просмотра или добавления товара." },
      { value: "7 дней", title: "Горизонт", text: "Цель — последующее событие покупки этой пары." },
    ],
    modelBadge: "CatBoost · 1 010 деревьев",
    modelTitle: "Модель учится на поведении, а не на ID",
    modelText:
      "В признаки не входят user_id и product_id. Модель использует 59 характеристик: частоты и давность действий, популярность товара, цену, категорию, бренд и контекст события.",
    metrics: [
      { value: "0,9007", label: "ROC-AUC", note: "будущий временной test", icon: Target },
      { value: "0,9026", label: "ROC-AUC", note: "5% новых пользователей", icon: UserRoundSearch },
      { value: "70,39%", label: "покупок в top-10%", note: "все точки скоринга", icon: DatabaseZap },
      { value: "54,28%", label: "покупок в top-10%", note: "только view-триггеры", icon: BrainCircuit },
    ],
    validationLabel: "Проверка устойчивости",
    validationTitle: "Время и новые пользователи разделены честно",
    validationText:
      "Модель обучалась на выборке 2% пользователей. После train/validation её проверили на будущем test-периоде, затем — на отдельной выборке 5% пользователей без пересечения с обучением.",
    validationStats: [
      { value: "342 295", label: "строк в test" },
      { value: "857 588", label: "строк новых пользователей" },
      { value: "4,88% / 4,92%", label: "доля целевого события" },
      { value: "0,529 / 0,535", label: "PR-AUC test / новые" },
    ],
    chartTitle: "Сколько будущих покупок захватывает верхушка рейтинга",
    chartSubtitle: "Доля всех положительных событий, попавших в top-5% и top-10% по прогнозу модели.",
    chartTop5: "Top-5%",
    chartTop10: "Top-10%",
    chartNote:
      "View — точки прогноза, где текущим событием был просмотр; cart-триггеры исключены. На новых пользователях результат практически не меняется.",
    featuresTitle: "Что сильнее всего влияет на скор",
    featuresSubtitle: "Средний |SHAP| на 20 000 строках test; величины показывают относительную важность, а не причинный эффект.",
    features: [
      { label: "Покупки товара за 30 дней", value: 0.196 },
      { label: "Час точки прогноза", value: 0.19 },
      { label: "Просмотры пользователя за 30 дней", value: 0.186 },
      { label: "Категория товара", value: 0.158 },
      { label: "Тип события: view или cart", value: 0.155 },
      { label: "Покупки товара за 7 дней", value: 0.144 },
    ],
    useTitle: "Как использовать результат",
    useItems: [
      "Ранжировать аудиторию для персональных рекомендаций и ограниченных коммуникаций.",
      "Выбирать небольшой верхний сегмент, сохраняя большую часть будущих покупок.",
      "Отдельно задавать пороги для view- и cart-сценариев: их базовая вероятность сильно различается.",
    ],
    limitTitle: "Границы вывода",
    limitText:
      "Это offline-оценка ранжирования на исторических событиях, а не доказанный uplift кампании. Цель — событие purchase, не подтверждённый заказ; перед production нужны мониторинг drift, повторная калибровка и A/B-тест бизнес-эффекта.",
  },
  kk: {
    label: "ML • purchase propensity",
    title: "Тауармен қай әрекет сатып алуға аяқталады",
    subtitle:
      "CatBoost «пайдаланушы–тауар» жұптарын келесі 7 күндегі сатып алу ықтималдығы бойынша реттейді. Болжамға тек қаралым немесе себетке қосу сәтінде белгілі ақпарат кіреді.",
    pipeline: [
      { value: "30 күн", title: "Тарих", text: "Болжам сәтіне дейінгі пайдаланушы, тауар және жұп белсенділігі." },
      { value: "view / cart", title: "Скоринг нүктесі", text: "Болжам тауарды қарау немесе себетке қосу кезінде жасалады." },
      { value: "7 күн", title: "Көкжиек", text: "Мақсат — осы жұптың кейінгі сатып алу оқиғасы." },
    ],
    modelBadge: "CatBoost · 1 010 ағаш",
    modelTitle: "Модель ID-ді емес, мінез-құлықты үйренеді",
    modelText:
      "Белгілерге user_id және product_id кірмейді. Модель 59 сипаттаманы қолданады: әрекет жиілігі мен уақыты, тауар танымалдығы, баға, санат, бренд және оқиға контексті.",
    metrics: [
      { value: "0,9007", label: "ROC-AUC", note: "болашақ уақыттық test", icon: Target },
      { value: "0,9026", label: "ROC-AUC", note: "5% жаңа пайдаланушы", icon: UserRoundSearch },
      { value: "70,39%", label: "top-10%-дағы сатып алу", note: "барлық скоринг нүктесі", icon: DatabaseZap },
      { value: "54,28%", label: "top-10%-дағы сатып алу", note: "тек view-триггерлер", icon: BrainCircuit },
    ],
    validationLabel: "Тұрақтылықты тексеру",
    validationTitle: "Уақыт пен жаңа пайдаланушылар бөлек тексерілді",
    validationText:
      "Модель пайдаланушылардың 2% іріктемесінде оқытылды. Train/validation-нан кейін болашақ test кезеңінде, одан соң оқытуға кірмеген 5% пайдаланушының бөлек іріктемесінде тексерілді.",
    validationStats: [
      { value: "342 295", label: "test жолдары" },
      { value: "857 588", label: "жаңа пайдаланушы жолдары" },
      { value: "4,88% / 4,92%", label: "мақсатты оқиға үлесі" },
      { value: "0,529 / 0,535", label: "PR-AUC test / жаңа" },
    ],
    chartTitle: "Рейтингтің жоғарғы бөлігі болашақ сатып алудың қаншасын қамтиды",
    chartSubtitle: "Модель болжамы бойынша top-5% және top-10%-ға түскен барлық оң оқиғалардың үлесі.",
    chartTop5: "Top-5%",
    chartTop10: "Top-10%",
    chartNote:
      "View — ағымдағы оқиғасы қаралым болған болжам нүктелері; cart-триггерлер алынып тасталды. Жаңа пайдаланушыларда нәтиже өзгермейді деуге болады.",
    featuresTitle: "Скорға ең көп әсер ететін белгілер",
    featuresSubtitle: "Test-тегі 20 000 жол бойынша орташа |SHAP|; мәндер себепті әсерді емес, салыстырмалы маңыздылықты көрсетеді.",
    features: [
      { label: "Тауардың 30 күндегі сатып алуы", value: 0.196 },
      { label: "Болжам жасалған сағат", value: 0.19 },
      { label: "Пайдаланушының 30 күндегі қаралымы", value: 0.186 },
      { label: "Тауар санаты", value: 0.158 },
      { label: "Оқиға түрі: view немесе cart", value: 0.155 },
      { label: "Тауардың 7 күндегі сатып алуы", value: 0.144 },
    ],
    useTitle: "Нәтижені қалай қолдануға болады",
    useItems: [
      "Жеке ұсыныстар мен шектеулі коммуникациялар үшін аудиторияны реттеу.",
      "Болашақ сатып алудың көп бөлігін сақтай отырып, шағын жоғарғы сегментті таңдау.",
      "View және cart сценарийлеріне бөлек шек қою: олардың базалық ықтималдығы айтарлықтай өзгеше.",
    ],
    limitTitle: "Түсіндіру шегі",
    limitText:
      "Бұл — тарихи оқиғалардағы offline-рейтинг бағасы, науқанның дәлелденген uplift-і емес. Мақсат — расталған тапсырыс емес, purchase оқиғасы; production алдында drift мониторингі, қайта калибрлеу және бизнес әсерінің A/B-тесті қажет.",
  },
} as const;

function CaptureTooltip({
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
          <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
          {item.name}: {item.value.toLocaleString(locale === "ru" ? "ru-RU" : "kk-KZ", { maximumFractionDigits: 2 })}%
        </p>
      ))}
    </div>
  );
}

export function MachineLearningSection() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const data = captureData[locale];
  const maxFeature = Math.max(...t.features.map((feature) => feature.value));

  return (
    <section id="ml" className="scroll-mt-16 overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-32 -top-52 h-[430px] w-[430px] rounded-full bg-kazakh-sky/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-96 h-[360px] w-[360px] rounded-full bg-kazakh-gold/10 blur-3xl" />

        <div className="relative grid gap-10 xl:grid-cols-[1.08fr_.92fr] xl:items-end">
          <div className="[&_h2]:text-white [&_p]:text-slate-400">
            <SectionHeading label={t.label} title={t.title} subtitle={t.subtitle} />
          </div>

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/25 backdrop-blur-md sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-kazakh-sky/15 text-kazakh-sky">
                <BrainCircuit className="h-6 w-6" />
              </span>
              <span className="rounded-full border border-kazakh-gold/25 bg-kazakh-gold/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-kazakh-sun">
                {t.modelBadge}
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-black tracking-tight text-white">{t.modelTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{t.modelText}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-slate-300">
              {["59 features", "4 categorical", "depth 8", "Logloss"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1.5">{item}</span>
              ))}
            </div>
          </article>
        </div>

        <div className="relative mt-10 grid gap-4 md:grid-cols-3">
          {t.pipeline.map((item, index) => (
            <article key={item.title} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-black text-kazakh-sun">{item.value}</p>
                  <h3 className="mt-2 font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </div>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-xs font-black text-kazakh-sky">
                  {index + 1}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {t.metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={`${metric.value}-${metric.note}`} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                <Icon className="h-5 w-5 text-kazakh-sky" />
                <p className="mt-5 text-3xl font-black tracking-tight text-white">{metric.value}</p>
                <p className="mt-1 text-sm font-black text-slate-200">{metric.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{metric.note}</p>
              </article>
            );
          })}
        </div>

        <div className="relative mt-8 grid gap-6 xl:grid-cols-[1.12fr_.88fr]">
          <article className="self-start rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl shadow-black/20 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-kazakh-sky/10 text-kazakh-sky">
                <Target className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-black">{t.chartTitle}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">{t.chartSubtitle}</p>
              </div>
            </div>

            <div className="mt-6 h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 4, left: -12, bottom: 36 }} barGap={5}>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
                  <XAxis dataKey="group" axisLine={false} tickLine={false} interval={0} angle={-14} textAnchor="end" tick={{ fill: "#475569", fontSize: 11, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 80]} tick={{ fill: "#94a3b8", fontSize: 11 }} tickFormatter={(value) => `${value}%`} />
                  <Tooltip cursor={{ fill: "rgba(148,163,184,.08)" }} content={<CaptureTooltip locale={locale} />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 12 }} />
                  <Bar dataKey="top5" name={t.chartTop5} fill="#00AFCA" radius={[8, 8, 2, 2]} maxBarSize={44} />
                  <Bar dataKey="top10" name={t.chartTop10} fill="#E5A910" radius={[8, 8, 2, 2]} maxBarSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">{t.chartNote}</p>
          </article>

          <div className="grid gap-6">
            <article className="rounded-[2rem] border border-kazakh-sky/20 bg-kazakh-sky/[0.075] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <UserRoundSearch className="h-5 w-5 text-kazakh-sky" />
                <p className="text-xs font-black uppercase tracking-[0.18em] text-kazakh-sky">{t.validationLabel}</p>
              </div>
              <h3 className="mt-5 text-2xl font-black text-white">{t.validationTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{t.validationText}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.validationStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                    <p className="text-lg font-black text-white">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <CalendarRange className="h-5 w-5 text-kazakh-sun" />
                <h3 className="text-xl font-black text-white">{t.featuresTitle}</h3>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{t.featuresSubtitle}</p>
              <div className="mt-6 space-y-4">
                {t.features.map((feature) => (
                  <div key={feature.label}>
                    <div className="flex items-end justify-between gap-4 text-xs">
                      <span className="font-bold text-slate-300">{feature.label}</span>
                      <span className="font-black tabular-nums text-slate-500">{feature.value.toFixed(3)}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-gradient-to-r from-kazakh-sky to-kazakh-gold" style={{ width: `${(feature.value / maxFeature) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <div className="relative mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-kazakh-sky" />
              <h3 className="text-xl font-black text-white">{t.useTitle}</h3>
            </div>
            <div className="mt-5 space-y-3">
              {t.useItems.map((item) => (
                <p key={item} className="flex gap-3 text-sm leading-6 text-slate-400">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-kazakh-sky" />
                  {item}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-kazakh-gold/20 bg-kazakh-gold/[0.065] p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <TriangleAlert className="h-5 w-5 text-kazakh-sun" />
              <h3 className="text-xl font-black text-white">{t.limitTitle}</h3>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">{t.limitText}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
