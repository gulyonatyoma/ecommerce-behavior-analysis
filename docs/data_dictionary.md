# Data Dictionary

## Project Dataset

Источник данных:

E-commerce Behavior Data from Multi Category Store

Тип данных:

Event-level behavioral dataset.

Каждая строка представляет собой одно действие пользователя на сайте интернет-магазина.

Основные события:

- view — просмотр товара;
- cart — добавление товара в корзину;
- remove_from_cart — удаление товара из корзины;
- purchase — покупка товара.

---

# Raw Event Data

## Основная таблица

Основной источник данных содержит пользовательские события.

Уровень данных:

Event-level


| Поле | Описание | Тип |
|---|---|---|
| event_time | Время совершения события | datetime |
| event_type | Тип события пользователя | string |
| product_id | Уникальный идентификатор товара | integer |
| category_id | Идентификатор категории товара | integer |
| category_code | Иерархия категории товара | string |
| brand | Бренд товара | string |
| price | Цена товара | float |
| user_id | Идентификатор пользователя | integer |
| user_session | Идентификатор пользовательской сессии | string |

---

# Event-level Dataset

Используется для:

- анализа пользовательского поведения;
- построения воронки продаж;
- анализа customer journey;
- расчёта conversion metrics.

Основные метрики:

- количество событий;
- количество пользователей;
- количество сессий;
- распределение типов событий;
- временная активность пользователей.

---

# Session-level Dataset

Создаётся путем агрегации событий по:

- user_session;
- user_id.

Пример структуры:

| Поле | Описание | Тип |
|---|---|---|
| user_session | Идентификатор сессии | string |
| user_id | Пользователь | integer |
| session_start | Начало сессии | datetime |
| session_end | Конец сессии | datetime |
| session_duration | Длительность сессии | float |
| views_count | Количество просмотров | integer |
| cart_count | Добавления в корзину | integer |
| purchase_flag | Была ли покупка | binary |
| total_spent | Сумма покупки | float |

Используется для:

- funnel analysis;
- purchase prediction;
- econometric models.

---

# User-level Dataset

Создаётся путем агрегации событий по пользователю.

Пример структуры:

| Поле | Описание | Тип |
|---|---|---|
| user_id | Идентификатор пользователя | integer |
| sessions_count | Количество сессий | integer |
| total_events | Количество событий | integer |
| views_count | Количество просмотров | integer |
| carts_count | Количество добавлений в корзину | integer |
| purchases_count | Количество покупок | integer |
| total_spent | Общая сумма покупок | float |
| avg_price | Средняя цена товара | float |
| unique_products | Количество уникальных товаров | integer |
| unique_categories | Количество категорий | integer |

Используется для:

- Customer Analytics;
- RFM segmentation;
- user clustering;
- ML features.

---

# Product-level Dataset

Создаётся путем агрегации событий по товару.

Пример структуры:

| Поле | Описание | Тип |
|---|---|---|
| product_id | Идентификатор товара | integer |
| category_id | Категория товара | integer |
| brand | Бренд | string |
| views_count | Количество просмотров | integer |
| cart_count | Добавления в корзину | integer |
| purchases_count | Количество покупок | integer |
| revenue | Выручка | float |
| conversion_rate | Конверсия товара | float |

Используется для:

- Product Analytics;
- анализа категорий;
- оценки эффективности товаров.

---

# Machine Learning Dataset

Формируется на основе session-level данных.

Target:

| Поле | Описание |
|---|---|
| purchase_flag | Факт покупки пользователем |

Значения:

0 — покупка отсутствует

1 — покупка произошла


---

## Features

### Behavioral Features

- количество просмотров;
- количество действий;
- длительность сессии;
- количество товаров;
- количество категорий.

---

### Product Features

- цена;
- категория;
- бренд;
- количество взаимодействий с товаром.

---

### User Features

- история активности;
- количество сессий;
- предыдущие покупки;
- частота взаимодействия.

---

# Data Quality Checks

Перед анализом выполняются проверки:

## Completeness

- пропущенные значения;
- заполненность ключевых полей.

## Validity

- корректность типов данных;
- корректность цены;
- корректность временных значений.

## Consistency

- уникальность user_id;
- уникальность product_id;
- соответствие событий и пользователей.

## Business Logic

Проверки:

- purchase события должны иметь цену;
- event_time должен быть в допустимом диапазоне;
- user_session должен быть заполнен.

---

# Analytics Mapping

| Анализ | Используемые данные |
|---|---|
| Data Quality | Raw Event Data |
| Funnel Analysis | Event + Session Data |
| Product Analytics | Product-level Data |
| Customer Analytics | User-level Data |
| Econometrics | Session-level Data |
| Machine Learning | Session-level Features |
