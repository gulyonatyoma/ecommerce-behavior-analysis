# Analysis Plan and Project Roadmap

## Статус проекта

Основной **product analytics / data quality / BI** этап выполнен.

Текущая реализованная часть включает:

1. Data Quality investigation;
2. evidence-based clean layer;
3. user identity stitching;
4. trusted funnel analysis;
5. user and repeat-behavior analysis;
6. product, brand and price analysis;
7. April conversion case study;
8. ClickHouse presentation marts;
9. public Yandex DataLens dashboard.

Econometrics и Machine Learning остаются возможными следующими этапами и не заявляются как уже выполненный результат.

---

## 1. Data Quality — completed

Проверены:

- row counts и временной диапазон;
- missing values;
- exact duplicates;
- event-type distribution;
- logging gaps;
- user/session identity conflicts;
- session continuity limitations;
- product/category mapping instability;
- price validity.

Результат:

- `qa.data_quality_rules`;
- документированные DQ incidents;
- trusted eligibility policy;
- `clean.events`.

---

## 2. Product Analytics — completed

### Funnel

Основной funnel:

`view -> cart -> purchase`

Единица анализа:

`canonical_user_id + product_id`

Основные trusted metrics:

- View to Cart 1d;
- View to Purchase 1d.

Trusted metrics исключают observation windows, пересекающие подтверждённые relevant logging incidents.

### Product structure

Исследуются:

- observed viewed assortment;
- purchased products;
- SKU concentration;
- month-to-month observed assortment turnover;
- brands;
- missing brand share;
- price-band composition.

---

## 3. Customer Analytics — completed for event-level scope

Реализованы:

- active-user trends;
- purchasing-user share;
- user purchase lifecycle;
- repeat activity;
- D7 / D30 follow-up coverage;
- repeat cadence;
- purchase-event value concentration.

Repeat activity означает повторную purchase activity в другой календарный день и не интерпретируется как доказанный repeat order.

Классический order-level RFM с точным Monetary / Frequency of orders не используется, потому что в extract отсутствует `order_id`.

---

## 4. April Case Study — completed

Задача:

проверить, можно ли объяснить March-to-April decline View to Purchase 1d наблюдаемыми факторами.

Проверены:

- purchase logging outage;
- product mix;
- price-band mix;
- same-product performance;
- price changes;
- user composition;
- recency × frequency segments.

Результат:

доступный event log не позволяет надёжно приписать decline одной наблюдаемой причине.

---

## 5. BI Dashboard — completed

Публичный DataLens dashboard содержит пять вкладок:

1. Executive Overview;
2. Users & Repeat Behavior;
3. Products, Brands & Prices;
4. Data Quality & Methodology;
5. April Case Study.

Dashboard работает поверх ClickHouse presentation marts.

---

## 6. Econometric Analysis — future scope

Возможный следующий этап проекта.

Потенциальные задачи:

- моделирование вероятности purchase activity;
- Logistic / Probit models;
- temporal controls;
- user/product fixed effects там, где это технически и методологически оправдано;
- robustness checks.

Ограничение:

наблюдательные зависимости не должны интерпретироваться как causal effects без отдельной identification strategy.

---

## 7. Machine Learning — future scope

Возможный следующий этап:

purchase propensity prediction на корректно определённом observation unit.

Перед построением модели необходимо отдельно зафиксировать:

- prediction timestamp;
- target horizon;
- leakage policy;
- train/validation temporal split;
- handling DQ periods;
- entity definitions.

Потенциальные модели:

- Logistic Regression baseline;
- gradient boosting;
- calibrated classifiers.

ML-часть не должна использовать недоказанные order-level признаки.

---

## Deliverables

### Completed

- Data Quality Report;
- methodology documentation;
- clean event layer;
- analytical marts;
- April Case Study;
- public BI dashboard;
- curated SQL documentation.

### Future

- Econometric Analysis Report;
- ML Model Report;
- final model comparison / deployment-oriented work, если команда решит продолжать проект.
