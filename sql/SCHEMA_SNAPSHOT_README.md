# Curated SQL schema snapshot

Этот пакет собран автоматически из export `system.tables.create_table_query`.

В него включён только репрезентативный subset таблиц для портфолио:

- raw schema;
- основные Data Quality tables;
- clean events;
- trusted funnel / repeat / price-band marts;
- ключевые presentation marts DataLens.

## Важно

`create_table_query` для обычных MergeTree/SharedMergeTree таблиц содержит **DDL текущей структуры**, но не хранит исходный `CREATE TABLE AS SELECT` / `INSERT SELECT`, которым таблица была рассчитана.

Поэтому эти файлы следует рассматривать как **schema snapshots**, а не как полную воспроизводимую transformation logic.

Фактическую аналитическую логику стоит добавлять отдельно только для нескольких ключевых pipeline steps, где сохранён исходный SQL.
