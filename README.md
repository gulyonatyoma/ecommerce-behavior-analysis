# Анализ поведения пользователей в e-commerce

![Python](https://img.shields.io/badge/python-3.11-blue)
![SQL](https://img.shields.io/badge/SQL-ClickHouse-orange)
![BI](https://img.shields.io/badge/BI-DataLens-blue)
![License](https://img.shields.io/badge/license-MIT-green)

End-to-end аналитический проект по исследованию пользовательского поведения в крупном e-commerce event log: от проверки качества и построения clean layer до продуктовых витрин и интерактивного BI-dashboard.

## Что сделано

- проанализировано более **411 млн событий**;
- построен evidence-first Data Quality framework из **17 документированных правил**;
- подтверждён и локально исправлен февральский инцидент exact purchase duplicates;
- выявлены logging gaps в ноябре, феврале и апреле;
- выполнен identity stitching для конфликтующих `user_id`;
- построены trusted funnel, repeat-behavior, product, brand и price-band marts;
- проведён отдельный April Case Study;
- собран публичный dashboard в Yandex DataLens.

## Стек

- **ClickHouse Cloud**
- **SQL**
- **Python**
- **Yandex DataLens**
- **Git / GitHub**

## Данные и ограничения

Исходный датасет — event-level лог с событиями `view`, `cart` и `purchase`.

В extract отсутствуют `order_id`, уникальный `event_id`, `quantity` и итоговая сумма заказа. Поэтому проект не трактует:

- один `purchase` как доказанный уникальный заказ;
- `sum(price)` как точный GMV;
- число purchase-событий как units sold;
- повторное purchase-событие как доказанный repeat order.

Подробнее: [docs/methodology.md](docs/methodology.md).

## Архитектура

```text
raw
  ↓
qa
  ↓
clean
  ↓
mart
  ↓
dashboard
```

## Ключевые результаты

### Data Quality

- raw rows: **411,709,736**
- clean rows: **411,558,649**
- удалено **151,087** exact duplicate purchase events внутри подтверждённого February incident
- найдено **7,037** conflicting sessions
- **13,927** affected raw user IDs сведены к **6,858** canonical users

Подробнее: [docs/data_quality.md](docs/data_quality.md).

### Trusted funnel

| Month | View to Purchase 1d |
|---|---:|
| Oct 2019 | 0.890% |
| Nov 2019 | 1.589% |
| Dec 2019 | 1.918% |
| Jan 2020 | 1.629% |
| Feb 2020 | 1.742% |
| Mar 2020 | 2.090% |
| Apr 2020 | 1.823% |

### Repeat behavior

Для fully observed Dec 2019 — Feb 2020 cohorts:

- median time to repeat activity: **5 дней**
- P90: **22 дня**
- D7 repeat activity: около **16.7%**
- D30 repeat activity: около **28%**

### Products, brands and prices

- observed viewed assortment: **166.8K → 263.1K SKU**
- top 10% purchased SKU дают около **93–95% purchase-event value**
- в Mar 2020 price bands выше **$160** дают около **46% views**, но около **83% purchase-event value**
- `>$400` segment даёт около **60% purchase-event value**

## April Case Study

Проверены purchase logging outage, product mix, price-band mix, same-product comparison, price changes, user composition и comparable-user segments.

Вывод: доступный event log не позволяет надёжно приписать апрельское снижение одной наблюдаемой причине.

Подробнее: [docs/april_case_study.md](docs/april_case_study.md).

## Dashboard

Dashboard содержит 5 вкладок:

1. Executive Overview
2. Users & Repeat Behavior
3. Products, Brands & Prices
4. Data Quality & Methodology
5. April Case Study

**Public dashboard:** https://datalens.yandex/pl83yhp8a41c8

Подробнее: [docs/dashboard.md](docs/dashboard.md).

## SQL

В `sql/` хранится только curated reproducible subset: ключевые DDL, DQ checks, clean transformations, analytical marts и dashboard marts.

См. [sql/README.md](sql/README.md).

## Команда

- Артём Гостев
- Артур Камалов
- Глеб Касимов
- Никита Бузин

## License

MIT
