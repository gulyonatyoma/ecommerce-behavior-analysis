# SQL layer

Здесь хранится **curated reproducible subset** SQL, а не полный архив ad-hoc запросов исследования.

## Структура

- `01_raw/` — raw DDL и загрузочный слой;
- `02_data_quality/` — ключевые DQ checks;
- `03_clean/` — clean-layer transformations;
- `04_marts/` — основные analytical marts;
- `05_dashboard/` — presentation marts для DataLens.

## Что достаточно положить в репозиторий

1. raw table DDL;
2. exact duplicate diagnostics;
3. DQ incident registry;
4. canonical identity mapping;
5. clean events construction;
6. trusted funnel mart;
7. repeat behavior mart;
8. product / price-band mart;
9. dashboard presentation marts.

Одноразовые EDA-запросы переносить не нужно.
