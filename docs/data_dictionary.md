# Data Dictionary

## 1. Источник данных

Проект использует event-level e-commerce dataset за период **Oct 2019 — Apr 2020**.

Каждая строка исходной таблицы представляет одно наблюдаемое событие пользователя.

Фактически в используемом extract присутствуют только три типа событий:

- `view` — просмотр товара;
- `cart` — добавление товара в корзину;
- `purchase` — зарегистрированное purchase-событие.

`remove_from_cart` в extract отсутствует.

---

## 2. Raw layer

Основная таблица: `raw.events`.

| Поле | Тип | Интерпретация |
|---|---|---|
| `event_time` | `DateTime64(3)` | время события |
| `event_type` | `Nullable(String)` | `view`, `cart` или `purchase` |
| `product_id` | `Nullable(Int64)` | идентификатор товара |
| `category_id` | `Nullable(Int64)` | source category id |
| `category_code` | `Nullable(String)` | унифицированная taxonomy category; NULL означает отсутствие mapping |
| `brand` | `Nullable(String)` | бренд; NULL сохраняется |
| `price` | `Nullable(Float64)` | наблюдаемая цена в USD |
| `user_id` | `Int64` | source user id |
| `user_session` | `Nullable(String)` | source session id; не гарантирует непрерывный визит |

### Важные ограничения raw layer

- `order_id` отсутствует;
- уникальный `event_id` отсутствует;
- `quantity` отсутствует;
- итоговая сумма заказа отсутствует;
- изменения количества товара в корзине не логируются;
- `remove_from_cart` отсутствует.

Поэтому purchase-события нельзя однозначно превратить в order-level dataset.

---

## 3. Purchase semantics

В проекте используются следующие термины.

### `purchase event`

Одна зарегистрированная строка с `event_type = 'purchase'`.

Она **не считается доказанным уникальным заказом**, потому что `order_id` и уникальный `event_id` отсутствуют.

### `purchase-event count`

Количество зарегистрированных purchase-событий после documented clean rules.

Не интерпретируется как:

- число заказов;
- units sold.

### `purchase-event value`

`sum(price)` по purchase-событиям.

Используется как наблюдаемый value proxy и **не считается точным GMV / revenue**, поскольку отсутствуют `quantity`, order total и order-level identifiers.

### `purchasing user`

Пользователь с хотя бы одним наблюдаемым purchase-событием.

---

## 4. Clean layer

Основная таблица: `clean.events`.

Она сохраняет raw event fields и добавляет аналитические поля.

| Поле | Интерпретация |
|---|---|
| `user_id` | исходный source user id |
| `canonical_user_id` | детерминированный id после identity stitching |
| `identity_group_size` | размер связанной identity group |
| `is_identity_stitched` | user id входит в подтверждённую conflict group |
| `is_user_id_changed` | canonical id отличается от raw id |
| `is_purchase_deduplicated` | surviving purchase row относится к exact-duplicate group внутри подтверждённого February incident |
| `is_feb_purchase_dup_incident` | событие попадает в подтверждённый February purchase duplicate incident |
| `is_feb_view_cart_gap` | событие попадает в February view/cart logging gap |
| `is_apr_purchase_gap` | событие попадает в April purchase logging outage |
| `is_apr_general_logging_gap` | событие попадает в краткий общий April logging disruption |

Clean layer физически удаляет только exact purchase duplicates внутри подтверждённого February incident.

Остальные source limitations сохраняются и учитываются через flags / trusted eligibility.

---

## 5. User identity

В source data существуют непустые `user_session`, связанные с несколькими `user_id`.

Для таких конфликтов строится transitive identity mapping:

`qa.user_identity_map`

| Поле | Интерпретация |
|---|---|
| `original_user_id` | raw user id |
| `canonical_user_id` | минимальный технический представитель connected component |
| `identity_group_size` | число raw ids в component |

`canonical_user_id` является техническим аналитическим идентификатором, а не доказанным внешним id реального человека.

NULL/empty sessions не используются для identity stitching.

---

## 6. Session semantics

`user_session` не считается гарантированно непрерывным пользовательским визитом.

В source data встречаются session ids с очень большими временными разрывами, включая дни и месяцы.

Поэтому проект:

- не использует произвольный 30-minute timeout как clean rule;
- не строит основные KPI на предположении `user_session = один визит`;
- не объединяет NULL-session события между пользователями.

---

## 7. Category semantics

Связь `product_id -> category_id/category_code` изменяется во времени.

В проекте category fields сохраняются в **event-time состоянии**.

Не применяется:

- latest-category overwrite;
- `any(category)` correction;
- искусственное заполнение NULL `category_code`.

Изменение category mapping не считается автоматически реальным изменением товара или ассортимента.

---

## 8. Основные analytical marts

### Funnel

- `mart.user_product_journey`
- `mart.user_product_funnel`
- `mart.user_product_funnel_windows`
- `mart.user_product_funnel_daily`
- `mart.monthly_funnel_trusted`

Основная единица funnel analysis — `canonical_user_id + product_id`.

Funnel отражает first-observed event sequence и не доказывает causal journey.

Trusted metrics исключают observation windows, пересекающие подтверждённые logging incidents.

### Users and repeat behavior

- `mart.user_day_clean`
- `mart.user_lifecycle_clean`
- `mart.user_purchase_lifecycle_clean`
- `mart.dashboard_monthly_repeat_behavior`
- `mart.dashboard_repeat_cadence`

Repeat activity означает purchase activity в другой календарный день и не считается доказанным repeat order.

### Products, brands and prices

- `mart.product_month_activity`
- `mart.brand_month_activity`
- `mart.product_month_price_all`
- `mart.product_month_price_band_activity`

Price-band analysis основан на наблюдаемых положительных view prices.

Products, пересекающие price-band boundaries внутри месяца, сохраняются как отдельная группа `Crossed price band`.

---

## 9. Presentation marts

DataLens использует компактные presentation tables:

- `mart.dashboard_monthly_overview`
- `mart.dashboard_monthly_commercial_structure`
- `mart.dashboard_monthly_repeat_behavior`
- `mart.dashboard_repeat_cadence`
- `mart.dashboard_dq_incidents`
- `mart.dashboard_dq_summary`
- `mart.dashboard_monthly_main`
- `mart.dashboard_monthly_price_bands`
- `mart.dashboard_monthly_brands`
- `mart.dashboard_april_daily_funnel`
- `mart.dashboard_april_weekly_funnel`
- `mart.dashboard_april_period_summary`

Основная тяжёлая аналитическая логика рассчитывается в ClickHouse, а DataLens используется как presentation layer.

---

## 10. Metric glossary

| Метрика | Определение |
|---|---|
| `Active users` | distinct canonical users с наблюдаемой активностью |
| `Purchasing-user share` | доля active users с purchase activity |
| `View to Cart 1d` | доля eligible user-product view cohorts с наблюдаемым cart в пределах 1 дня |
| `View to Purchase 1d` | доля eligible user-product view cohorts с наблюдаемым purchase в пределах 1 дня |
| `Purchase-event value` | сумма price по наблюдаемым purchase events |
| `D7 repeat activity` | повторная purchase activity в другой календарный день в пределах 7 дней |
| `D30 repeat activity` | повторная purchase activity в другой календарный день в пределах 30 дней |
| `Not seen previous month` | SKU имеет view в текущем месяце и не имеет наблюдаемого view в предыдущем |
| `Trusted metric` | метрика, для которой observation window не нарушен подтверждённым relevant DQ incident |

---

## 11. Что из данных нельзя надёжно получить

Из текущего extract нельзя доказательно рассчитать:

- exact order count;
- units sold;
- basket size;
- AOV;
- exact GMV;
- cart removals;
- quantity changes;
- true stock availability;
- continuous session duration для всех source sessions.

Эти ограничения являются частью аналитической методологии, а не скрываются дополнительными предположениями.
