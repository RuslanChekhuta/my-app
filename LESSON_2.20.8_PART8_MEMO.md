# Памятка: Урок 2.20.8 (часть 8/10)
## Самое крутое TODO-приложение (с голосовым вводом)

## 1) Что изменилось в части 8

Главная тема этого этапа: глубокий рефакторинг архитектуры.

Теперь проект разделён на несколько слоёв:
- `constants` для общих констант;
- `api` и `useTodoApi` для запросов;
- `helpers` и `useTodoHelpers` для чистых вспомогательных операций;
- `useLocalStorage` для работы с браузерным хранилищем;
- `useTodoActions` для бизнес-действий над задачами;
- `useTodoManagement` как главный orchestration-хук.

Это уже шаг от "всё в одном hook" к модульной структуре, где каждая часть отвечает за отдельную зону ответственности.

## 2) Как теперь устроена архитектура

- [todos.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/constants/todos.js)
  - хранит `LOCAL_STORAGE_KEY` и `API_URL`.

- [todoApi.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/api/todoApi.js)
  - содержит чистые функции запросов: `fetchTodos`, `createTodo`, `updateTodo`, `deleteTodo`.

- [useTodoApi.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoApi.js)
  - даёт тот же API, но в виде hook-обёртки.

- [useLocalStorage.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useLocalStorage.js)
  - инкапсулирует загрузку и сохранение задач в `localStorage`.

- [useTodoHelpers.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoHelpers.js)
  - собирает операции над todo:
  - создание новой задачи,
  - сортировку,
  - изменение текста и дедлайна,
  - переключение `completed`.

- [useTodoActions.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoActions.js)
  - реализует пользовательские действия:
  - `onAdd`,
  - `handleUpdate`,
  - `toggleComplete`,
  - `handleDelete`,
  - `confirmDeleteCompleted`,
  - `onReorder`.

- [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js)
  - связывает всё вместе и отдаёт наружу единый интерфейс для [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx).

## 3) Что стало лучше по сравнению с частью 7

Раньше основной custom hook был уже полезным, но внутри него накапливалось слишком много обязанностей.

Теперь код разделён понятнее:
- инфраструктура запросов вынесена отдельно;
- работа с `localStorage` вынесена отдельно;
- чистые преобразования данных вынесены отдельно;
- пользовательские действия вынесены отдельно;
- основной hook стал координатором, а не монолитом.

Это важный качественный переход. Проект становится ближе к production-структуре.

## 4) Как теперь идёт поток данных

1. [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx) получает всё из `useTodoManagement`.
2. `useTodoManagement` поднимает `todos`, `deletingId`, `isDeletingCompleted`.
3. При инициализации он:
   - берёт данные из `useLocalStorage`,
   - сортирует их через `useTodoHelpers`,
   - затем пробует загрузить более свежие данные через `useTodoApi`.
4. Пользовательские действия передаются в `useTodoActions`.
5. `useTodoActions` использует:
   - функции API,
   - функции helpers,
   - `setTodos`,
   - `saveToLocalStorage`.
6. Компоненты UI получают уже готовые обработчики и не знают деталей хранения/сервера.

## 5) Что важно понять из части 8

- Не всякая логика должна жить в одном hook.
- Чем больше проект, тем важнее разложить код по уровням ответственности.
- Чистые функции преобразования данных полезно держать отдельно от сетевых запросов.
- `App` и UI-компоненты должны получать готовые действия, а не знать детали API или `localStorage`.

Это один из ключевых уроков по росту React-приложения: не только добавлять фичи, но и уметь перестраивать архитектуру под рост.

## 6) Почему это важно перед голосовым вводом

Голосовой ввод добавит новую область логики:
- распознавание речи;
- управление состоянием прослушивания;
- обработку ошибок доступа к микрофону;
- подстановку текста в форму;
- возможно, отдельные команды вроде "удали задачу" или "отметь выполненной".

Если бы всё это добавлялось в старую структуру, проект быстро стал бы тяжёлым для поддержки.
После рефакторинга из части 8 для этого уже есть место:
- API-слой отдельно;
- действия отдельно;
- вспомогательные функции отдельно;
- основной hook управляет композицией.

То есть часть 8 готовит кодовую базу к более сложным фичам, в том числе к voice input.

## 7) Технические замечания по текущему состоянию

- В проекте есть дублирование:
  - [todoApi.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/api/todoApi.js) и [useTodoApi.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoApi.js) дублируют одну и ту же сетевую логику.
  - [todoHelpers.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/helpers/todoHelpers.js) и [useTodoHelpers.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoHelpers.js) дублируют часть операций.
  - [storage.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/helpers/storage.js) и [useLocalStorage.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useLocalStorage.js) тоже пересекаются по ответственности.

- [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js) отключает правило `react-hooks/exhaustive-deps`, что обычно указывает на хрупкую зависимость эффекта.

- В [useTodoActions.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoActions.js) после `handleDelete` нет сохранения успешного удаления в `localStorage`.

- В [useTodoActions.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoActions.js) в `confirmDeleteCompleted` выполняется `saveToLocalStorage(todos)`, а не итогового актуального массива после удаления/rollback.

- В [AddTodo.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/AddTodo.jsx) используется `setShowDeadlineInput("")` вместо булевого `false`.

- В [SortableTodo.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/SortableTodo.jsx) и [SortableItem.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/SortableItem.jsx) видны следы альтернативной реализации drag-and-drop, которые сейчас не являются основным путём.

## 8) Что запомнить из урока

- Разделение кода по ответственности важнее, чем просто уменьшение размера файлов.
- Hooks хороши не только для состояния, но и для композиции логики.
- Helpers должны быть максимально чистыми и независимыми от React.
- API-слой лучше держать единым и не дублировать его в нескольких местах.
- Хорошая архитектура нужна заранее, если впереди более сложные фичи.

## 9) Чеклист части 8/10

- [x] Константы вынесены отдельно.
- [x] API-логика вынесена отдельно.
- [x] LocalStorage-логика вынесена отдельно.
- [x] Actions вынесены в отдельный hook.
- [x] Основной hook стал координатором.
- [x] `App` стал чище и проще.
- [x] Убрать дубли между `api/helpers/hooks`.
- [x] Подчистить работу с `localStorage` после удаления.
- [x] Подготовить слой для голосового ввода в следующих частях.

---

Промежуточный итог части 8: проект перешёл от “рабочего набора фич” к более взрослой архитектуре. Это именно тот этап, после которого можно безопаснее добавлять более сложные возможности вроде голосового ввода.
