# DataLens Dashboard

## Назначение

Dashboard является presentation layer проекта и построен поверх компактных ClickHouse marts.

Тяжёлая логика рассчитывается заранее в ClickHouse, а DataLens используется для визуализации уже подготовленных метрик.

## Вкладки

1. **Executive Overview**
2. **Users & Repeat Behavior**
3. **Products, Brands & Prices**
4. **Data Quality & Methodology**
5. **April Case Study**

## Основные принципы

- trusted и observed metrics не смешиваются без явной маркировки;
- DQ incidents показываются отдельно от business metrics;
- incomplete logging отмечается как warning;
- missing / unknown значения не маскируются;
- одинаковые процентные метрики используют одну Y-axis;
- технические SQL-названия скрываются через Display Name;
- purchase-related metrics описывают observed purchase events, а не proven orders / GMV.

## Presentation marts

Dashboard использует отдельные compact marts, включая:

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

## Public access

Публичная ссылка на dashboard должна быть добавлена в основной `README.md`.
