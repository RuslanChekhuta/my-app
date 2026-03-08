# Памятка: Урок 2.20.7 (часть 7/10)
## Самое крутое TODO-приложение (с голосовым вводом)

## 1) Что появилось в части 7

Главное изменение этого этапа: задачи теперь можно переставлять мышкой через drag-and-drop.

На текущем этапе у вас реализовано:
- перетаскивание задач в списке;
- сохранение нового порядка через поле `order`;
- сортировка задач при загрузке из `localStorage` и с API;
- синхронизация нового порядка с сервером;
- использование `@dnd-kit/core` и `@dnd-kit/sortable`.

Это важный шаг: поле `order`, которое раньше почти не использовалось, стало реально управлять отображением списка.

## 2) Где это реализовано

- В [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js) появился `onReorder`.
- В [TodoList.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoList.jsx) добавлены:
  - `DndContext`
  - `SortableContext`
  - `handleDragEnd`
- В [TodoItem.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoItem.jsx) добавлен `useSortable`.
- В [package.json](D:/Ruslan/Projects/Web-garage/tasks/my-app/package.json) появились зависимости:
  - `@dnd-kit/core`
  - `@dnd-kit/sortable`

## 3) Как теперь работает порядок задач

При загрузке в [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js):
- задачи из `localStorage` сортируются по `order`;
- задачи с сервера тоже сортируются по `order`.

При перетаскивании:
1. `TodoList` получает `active.id` и `over.id` в `handleDragEnd`.
2. Вызывается `onReorder(active.id, over.id)`.
3. В `useTodoManagement` ищутся индексы перетаскиваемой и целевой задач.
4. Массив перестраивается через `splice`.
5. Всем задачам заново назначается `order`.
6. Новый порядок сохраняется в state, API и `localStorage`.

Это уже полноценная система пользовательской сортировки, а не просто визуальный эффект.

## 4) Что делает `dnd-kit` в вашем коде

В [TodoList.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoList.jsx):
- `DndContext` управляет drag-and-drop сценарием;
- `closestCenter` отвечает за определение ближайшей цели;
- `SortableContext` связывает список задач с sortable-логикой;
- `verticalListSortingStrategy` задаёт поведение вертикального списка.

В [TodoItem.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoItem.jsx):
- `useSortable({ id: todo.id })` делает элемент перетаскиваемым;
- `setNodeRef` привязывает DOM-элемент к dnd;
- `attributes` и `listeners` подключают drag handle;
- `transform`, `transition`, `isDragging` управляют визуальным движением карточки.

## 5) Что важно понять из части 7

- Для drag-and-drop мало просто менять DOM местами, нужно обновлять данные.
- Если список должен переживать перезагрузку, порядок надо хранить явно, например через `order`.
- DnD-логика лучше живёт в списке и элементах списка, а не в корневом `App`.
- Ваш прошлый рефакторинг из части 6 здесь очень помог: drag-and-drop добавился без перегрузки `App`.

## 6) Почему это важно перед голосовым вводом

Голосовой ввод отвечает за быстрый ввод данных, а drag-and-drop отвечает за быстрый пересбор списка.
Вместе они делают TODO-приложение действительно удобным:
- голосом можно быстро создать задачу;
- перетаскиванием можно быстро расставить приоритеты.

То есть часть 7 усиливает не ввод, а управление задачами после создания.

## 7) Технические замечания по текущему коду

- В [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js) остался `console.log([movedTodo])`.
- Там же есть большой закомментированный блок старой версии обновления порядка; его лучше убрать после завершения экспериментов.
- В [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js) `localStorage` после загрузки сервера сохраняет `serverTodos`, а не отсортированный `sortServerTodos`.
- В [TodoList.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoList.jsx) условие `if (!over || active.id !== over.id)` вызывает `onReorder` и при `!over`; внутри есть защита, но логика читается лучше как два явных ранних выхода.
- В [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js) всё ещё используется `handleUpdata`, а не `handleUpdate`.

## 8) Что запомнить из урока

- Drag-and-drop должен обновлять состояние, а не только анимацию.
- Поле `order` полезно, когда пользователь сам определяет порядок задач.
- `dnd-kit` хорошо подходит для React, потому что работает через состояние и хуки.
- Чем лучше разделены `App`, `TodoList`, `TodoItem` и hook, тем проще добавлять сложные UI-механики.

## 9) Чеклист части 7/10

- [x] Подключён `@dnd-kit`.
- [x] Задачи можно перетаскивать.
- [x] Новый порядок пересчитывается через `order`.
- [x] Порядок сохраняется в API.
- [x] Порядок сохраняется в `localStorage`.
- [x] Загрузка списка учитывает сортировку по `order`.
- [x] Убрать отладочный `console.log`.
- [x] Подчистить нейминг `Update`.
- [x] Перейти к интеграции голосового ввода в следующих частях.

---

Промежуточный итог части 7: приложение стало не только функциональным, но и более интерактивным. Теперь пользователь управляет не только содержимым задач, но и их приоритетом через визуальное перетаскивание.
