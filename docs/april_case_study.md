# April Case Study

## Задача

В trusted funnel наблюдается снижение View to Purchase 1d conversion:

- **March 2020:** 2.090%
- **April 2020:** 1.823%
- изменение: **-0.267 п.п.**

Цель анализа — проверить, какие наблюдаемые факторы могут объяснить ухудшение, не выдавая корреляцию за причинность.

## 1. Purchase logging outage

Подтверждённый purchase logging outage:

`2020-04-19 18:51:12` → `2020-04-22 01:08:20`

Он является реальным DQ-инцидентом, однако падение conversion начинается до outage.

Trusted View to Purchase 1d:

| Period | Conversion |
|---|---:|
| March | 2.090% |
| April before outage | 1.869% |
| April outage-period cohorts | 1.872% |
| April after outage | 1.733% |

До начала outage показатель уже ниже March примерно на **0.221 п.п.**

Следовательно, outage не может объяснить всё апрельское снижение.

## 2. Product and price mix

Price-band decomposition показывает, что изменение ценового mix объясняет лишь небольшую часть снижения.

Около **7.5%** March-to-April decline связано с price mix, тогда как основная часть остаётся within-band.

Снижение также сохраняется при анализе одинаковых товаров, поэтому простая смена product mix не является достаточным объяснением.

## 3. Price changes

Рост цены показывает отрицательную описательную ассоциацию с conversion.

Однако после стратификации по baseline conversion эта связь не является достаточно стабильной, чтобы трактовать price change как самостоятельное объяснение апрельского decline.

Поэтому price hypothesis остаётся descriptive, а не causal.

## 4. User composition

Изменение состава пользователей объясняет только небольшую долю ухудшения — порядка **8%**.

Предыдущие покупатели остаются одной из наиболее сильных групп, но снижение наблюдается и среди сопоставимых пользователей.

При разбиении previous buyers по recency × frequency decline наблюдается во всех 20 из 20 сегментов.

Это означает, что общая user mix shift не объясняет основную часть эффекта.

## 5. Итог

После проверки logging outage, product mix, price-band mix, same-product comparison, price changes, user composition и comparable-user segments остаточное снижение сохраняется.

Доступный event log не позволяет доказать одну причину апрельского падения View to Purchase conversion.

Возможные ненаблюдаемые факторы:

- availability / stock;
- delivery conditions;
- promotions;
- competitor activity;
- checkout problems;
- payment problems.

Эти факторы являются **гипотезами**, а не выводами, поскольку соответствующих переменных в event log нет.
