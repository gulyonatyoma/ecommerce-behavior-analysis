# Machine Learning

## Цель

Построить модель прогнозирования вероятности покупки пользователя.

---

## Постановка задачи

Тип задачи:

Binary Classification

Target:

purchase_flag

0 — нет покупки.

1 — покупка.

---

## Этапы

### Feature Engineering

Создание признаков:

User Features:

- количество сессий;
- количество событий;
- история активности;
- частота взаимодействия.

Product Features:

- цена;
- категория;
- популярность товара.

Behavioral Features:

- действия перед покупкой;
- время до покупки;
- глубина взаимодействия.

---

## Модели

Baseline:

- Logistic Regression.

Advanced models:

- Random Forest;
- XGBoost;
- LightGBM;
- CatBoost.

---

## Evaluation

Метрики:

- ROC-AUC;
- Precision;
- Recall;
- F1-score;
- Calibration.

---

## Explainability

Анализ:

- feature importance;
- SHAP values;
- ошибки модели.

---

## Результат

Итогом должны стать:

- обученная модель;
- оценка качества;
- анализ ошибок;
- рекомендации по применению модели.
