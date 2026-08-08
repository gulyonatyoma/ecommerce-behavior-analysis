# Data Dictionary

## Общее описание

Этот документ описывает основные таблицы, поля и их назначение в аналитическом проекте.

Данные используются для:

- Product Analytics;
- Customer Analytics;
- Econometric Analysis;
- Machine Learning.

---

# Основные сущности данных

Проект использует три основных уровня данных:

1. Event-level data
2. User-level data
3. Product-level data

---

# 1. Event-level Data

Уровень пользовательских событий.

Используется для:

- анализа поведения пользователей;
- построения воронки;
- расчёта конверсий;
- анализа пути пользователя.

Основные поля:

| Поле | Описание | Тип |
|---|---|---|
| event_id | Уникальный идентификатор события | integer/string |
| user_id | Идентификатор пользователя | string |
| timestamp | Время события | datetime |
| event_type | Тип события | string |
| product_id | Идентификатор товара | string |
| category_id | Категория товара | string |
| price | Цена товара | float |
| session_id | Идентификатор сессии | string |

Примеры event_type:

- view;
- cart;
- purchase.

---

# 2. User-level Data

Агрегированный уровень пользователя.

Используется для:

- Customer Analytics;
- сегментации;
- ML-моделей;
- анализа поведения покупателей.

Основные поля:

| Поле | Описание | Тип |
|---|---|---|
| user_id | Идентификатор пользователя | string |
| total_events | Количество событий | integer |
| sessions_count | Количество сессий | integer |
| views_count | Количество просмотров | integer |
| purchases_count | Количество покупок | integer |
| total_revenue | Общая сумма покупок | float |
| avg_price | Средняя цена товара | float |
| last_activity_date | Последняя активность | datetime |

---

# 3. Product-level Data

Уровень товара.

Используется для:

- Product Analytics;
- анализа категорий;
- анализа revenue.

Основные поля:

| Поле | Описание | Тип |
|---|---|---|
| product_id | Идентификатор товара | string |
| category_id | Категория товара | string |
| views | Количество просмотров | integer |
| add_to_cart | Добавления в корзину | integer |
| purchases | Количество покупок | integer |
| revenue | Выручка | float |
| conversion_rate | Конверсия | float |

---

# ML Features

Для модели вероятности покупки могут использоваться:

## User Features

- количество просмотров;
- количество сессий;
- количество взаимодействий;
- история покупок;
- средняя цена просмотренных товаров.

## Product Features

- категория товара;
- цена;
- популярность;
- количество просмотров;
- историческая конверсия.

## Behavioral Features

- время до покупки;
- количество действий перед покупкой;
- глубина просмотра;
- частота активности.

---

# Data Quality Checks

Перед анализом должны проверяться:

## Completeness

- пропущенные значения;
- заполненность ключевых полей.

## Validity

- корректность типов данных;
- допустимые значения.

## Consistency

- уникальность ID;
- согласованность таблиц.

## Accuracy

- отсутствие аномальных значений;
- корректность событий.

---

# Data Usage

| Анализ | Используемые данные |
|---|---|
| Funnel Analysis | Event-level |
| Product Analytics | Event + Product-level |
| Customer Segmentation | User-level |
| Econometrics | User + Product-level |
| Machine Learning | User-level + Features |
