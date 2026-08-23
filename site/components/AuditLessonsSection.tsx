"use client";

import { ArrowRight, BadgeCheck, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const rules = {
  ru: [
    { old: "Цена 0 — всегда ошибка", now: "Для просмотра или корзины нулевая цена сама по себе не доказывает ошибку." },
    { old: "Корзина обязана идти сразу после просмотра", now: "Между действиями могут быть другие события, вкладки и возвращения к товару." },
    { old: "Покупка без корзины в том же сеансе ошибочна", now: "Корзина может сохраняться между посещениями, поэтому граница сеанса не является доказательством." },
    { old: "Резкое изменение цены — выброс", now: "Ручная проверка показала обычные изменения предложения, в том числе на небольшие суммы." },
  ],
  kk: [
    { old: "0 баға — әрқашан қате", now: "Қаралым немесе себет үшін нөлдік баға өздігінен қатені дәлелдемейді." },
    { old: "Себет бірден қаралымнан кейін келуі тиіс", now: "Арасында басқа оқиғалар, қойындылар және тауарға қайта оралу болуы мүмкін." },
    { old: "Сол сеанста себетсіз сатып алу қате", now: "Себет келесі кіруге дейін сақталуы мүмкін, сондықтан сеанс шекарасы дәлел емес." },
    { old: "Бағаның күрт өзгеруі — ауытқу", now: "Қолмен тексеру ұсыныстың қалыпты өзгерістерін, соның ішінде шағын өзгерістерді көрсетті." },
  ],
} as const;

export function AuditLessonsSection() {
  const { locale } = useLanguage();
  const items = locale === "ru" ? rules.ru : rules.kk;

  return (
    <section className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="[&_h2]:text-white [&_p]:text-slate-400">
          <SectionHeading
            label={locale === "ru" ? "Ручная проверка" : "Қолмен тексеру"}
            title={locale === "ru" ? "Правила, которые не прошли проверку" : "Тексеруден өтпеген ережелер"}
            subtitle={locale === "ru"
              ? "Первый набор условий оказался слишком строгим. Мы посмотрели реальные строки и заменили автоматическое удаление контекстной проверкой."
              : "Алғашқы шарттар тым қатаң болды. Нақты жолдарды қарап, автоматты жоюды мәнмәтіндік тексерумен алмастырдық."}
          />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <article key={item.old} className="rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black tracking-[0.16em] text-slate-500">0{index + 1}</span>
                <span className="rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-rose-300">{locale === "ru" ? "отклонено" : "қабылданбады"}</span>
              </div>
              <div className="mt-5 flex gap-3 text-sm text-slate-500">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <p className="line-through decoration-rose-400/70">{item.old}</p>
              </div>
              <ArrowRight className="my-4 h-4 w-4 text-kazakh-gold" />
              <div className="flex gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-kazakh-sky" />
                <p className="text-sm font-bold leading-6 text-slate-100">{item.now}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 rounded-[1.6rem] border border-kazakh-sky/20 bg-kazakh-sky/[0.075] px-5 py-5 sm:px-7">
          <p className="text-sm font-bold leading-6 text-slate-200">
            {locale === "ru"
              ? "Итоговый принцип: предупреждение отправляет запись на проверку, но не становится причиной удаления без дополнительных доказательств."
              : "Қорытынды қағида: ескерту жазбаны тексеруге жібереді, бірақ қосымша дәлелсіз жою себебі болмайды."}
          </p>
        </div>
      </div>
    </section>
  );
}
