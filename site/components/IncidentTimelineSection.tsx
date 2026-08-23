"use client";

import { AlertCircle, CalendarRange } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const incidents = {
  ru: [
    { date: "30 января", title: "Меняется отслеживание", text: "Растёт число повторов корзины и просмотров, но покупки ведут себя как раньше.", affected: ["Корзина", "Просмотры"] },
    { date: "10–18 февраля", title: "Двойная отправка покупок", text: "Покупки и просмотры начинают сбоить в одну минуту, но затем восстанавливаются в разное время.", affected: ["Покупки", "Просмотры"] },
    { date: "27 февраля", title: "Пропадает часть воронки", text: "Просмотры и корзины резко сокращаются, тогда как поток покупок остаётся близким к обычному.", affected: ["Корзина", "Просмотры"] },
    { date: "19–22 апреля", title: "Новый разрыв данных", text: "Покупки почти исчезают, а поведение корзины меняется без сопоставимого скачка просмотров.", affected: ["Покупки", "Корзина"] },
  ],
  kk: [
    { date: "30 қаңтар", title: "Бақылау тәсілі өзгереді", text: "Себет пен қаралым қайталаулары өседі, ал сатып алу бұрынғыдай қалады.", affected: ["Себет", "Қаралым"] },
    { date: "10–18 ақпан", title: "Сатып алу екі рет жіберіледі", text: "Сатып алу мен қаралым бір минутта бұзылады, бірақ әр уақытта қалпына келеді.", affected: ["Сатып алу", "Қаралым"] },
    { date: "27 ақпан", title: "Шұңқырдың бөлігі жоғалады", text: "Қаралым мен себет күрт азаяды, ал сатып алу қалыпты деңгейге жақын қалады.", affected: ["Себет", "Қаралым"] },
    { date: "19–22 сәуір", title: "Деректердегі жаңа үзіліс", text: "Сатып алу дерлік жоғалады, себет мінезі қаралымдағы ұқсас өзгеріссіз ауысады.", affected: ["Сатып алу", "Себет"] },
  ],
} as const;

export function IncidentTimelineSection() {
  const { locale } = useLanguage();
  const items = locale === "ru" ? incidents.ru : incidents.kk;

  return (
    <section className="bg-slate-50/70 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={locale === "ru" ? "Хронология" : "Хронология"}
          title={locale === "ru" ? "Четыре сбоя, которые нельзя смешивать" : "Араластыруға болмайтын төрт ақау"}
          subtitle={locale === "ru"
            ? "Мы сопоставили покупки, корзины и просмотры по времени. Разные сочетания событий показали, что это не один длинный сбой, а несколько отдельных изменений."
            : "Сатып алу, себет және қаралымды уақыт бойынша салыстырдық. Оқиғалардың әртүрлі үйлесімі бір ұзақ емес, бірнеше бөлек өзгеріс болғанын көрсетті."}
        />

        <div className="relative mt-12 grid gap-4 lg:grid-cols-4 lg:gap-5">
          <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-kazakh-sky via-kazakh-gold to-rose-400 lg:block" />
          {items.map((item, index) => (
            <article key={item.date} className="relative rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="relative z-10 flex items-center gap-3 lg:block">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-4 border-slate-50 text-sm font-black text-white shadow-lg ${index === 0 ? "bg-kazakh-sky" : index === 1 ? "bg-kazakh-gold" : index === 2 ? "bg-slate-700" : "bg-rose-500"}`}>
                  0{index + 1}
                </span>
                <p className="text-sm font-black text-slate-950 lg:mt-5">{item.date}</p>
              </div>
              <h3 className="mt-4 text-lg font-black leading-snug text-slate-950 lg:mt-3">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.affected.map((label) => (
                  <span key={label} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-[1.75rem] border border-amber-200 bg-amber-50/70 p-5 sm:grid-cols-[auto_1fr] sm:p-6">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-100 text-amber-700"><AlertCircle className="h-5 w-5" /></span>
          <div>
            <div className="flex items-center gap-2">
              <CalendarRange className="h-4 w-4 text-amber-700" />
              <p className="text-sm font-black text-slate-950">{locale === "ru" ? "Почему это важно для анализа" : "Бұл талдау үшін неге маңызды"}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {locale === "ru"
                ? "Показатели за эти интервалы нельзя сравнивать как обычные дни. Мы пометили их в витринах и исключаем там, где сбой меняет смысл метрики."
                : "Бұл аралықтарды қалыпты күндермен тікелей салыстыруға болмайды. Оларды деректер қабатында белгілеп, ақау көрсеткіш мағынасын өзгертетін есептерден алып тастаймыз."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
