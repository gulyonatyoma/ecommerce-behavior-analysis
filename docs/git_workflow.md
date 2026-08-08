# Git Workflow

## Общий принцип

В проекте используется Git workflow с разделением стабильной и рабочей разработки.

Основные ветки:

- `main` — стабильная версия проекта.
- `develop` — основная рабочая ветка разработки.
- `feature` — новые задачи.
- `fix` — исправление ошибок.
- `docs` — изменения документации.

---

# Основные ветки

## Main

Ветка `main` содержит только проверенные изменения.

Правила:

- прямые изменения в `main` запрещены;
- изменения попадают только через Pull Request;
- перед merge требуется review.

---

## Develop

Ветка `develop` используется для основной разработки.

Все новые изменения сначала попадают в `develop`.

Схема:

`feature branch → develop → main`

---

# Naming Convention

Формат названия ветки:

```
тип/EBA-ID-короткое-описание
```

---

## Feature branches

Используются для новых задач.

Пример:

```
feature/EBA-12-funnel-analysis
```

---

## Fix branches

Используются для исправления ошибок.

Пример:

```
fix/EBA-25-shap-error
```

---

## Documentation branches

Используются для изменения документации.

Пример:

```
docs/EBA-29-final-report
```

---

# Связь с Jira

Каждая ветка должна быть связана с конкретной задачей Jira.

Пример:

Jira задача:

```
EBA-12 Analyze conversion funnel and drop-off behavior
```

Git ветка:

```
feature/EBA-12-funnel-analysis
```

---

# Pull Request Process

Порядок работы:

1. Получить задачу из Jira.

2. Создать новую ветку от `develop`.

3. Выполнить работу.

4. Создать Pull Request:

```
feature branch → develop
```

5. Получить review.

6. Выполнить merge после одобрения.

---

# Commit Messages

Коммиты должны быть понятными и описывать изменение.

Хорошие примеры:

```
add funnel conversion analysis
```

```
update customer segmentation notebook
```

```
fix missing value handling
```

Плохие примеры:

```
changes
```

```
test
```

```
update
```

---

# Требования к Pull Request

Каждый Pull Request должен содержать:

- ссылку на Jira задачу;
- описание изменений;
- список выполненных проверок;
- результаты анализа, если они есть.

---

# Запрещено

Не рекомендуется:

- загружать большие датасеты в GitHub;
- хранить пароли и API ключи;
- работать напрямую в `main`;
- делать force push;
- добавлять изменения без описания.

---

# Командный процесс

Перед началом работы:

1. Обновить ветку `develop`.

2. Создать новую ветку:

```
feature/EBA-ID-description
```

3. Выполнить работу.

4. Создать Pull Request.

5. Пройти review.

6. Объединить изменения в `develop`.
