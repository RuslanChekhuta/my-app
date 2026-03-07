# Памятка: Урок 2.20.6 (часть 6/10)
## Самое крутое TODO-приложение (с голосовым вводом)

## 1) Что изменилось в части 6

На этом этапе приложение стало заметно чище по архитектуре.

Главные изменения:
- логика управления задачами вынесена в кастомный хук `useTodoManagement`;
- интерфейс разбит на более мелкие компоненты;
- добавлен фильтр задач: `all`, `active`, `completed`;
- форматирование даты вынесено в отдельный helper.

Это уже не просто рост функционала, а рефакторинг в сторону нормальной структуры приложения.

## 2) Ключевая идея этапа

Часть 6 учит разделять:
- бизнес-логику;
- состояние;
- визуальные компоненты;
- мелкие переиспользуемые UI-элементы.

Раньше `App` и `TodoItem` были перегружены.
Теперь код лучше читается, проще расширяется и легче готовится к следующим шагам, включая голосовой ввод.

## 3) Что теперь отвечает за что

- [App.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/App.jsx)
  - хранит только тему;
  - подключает `useTodoManagement`;
  - собирает страницу из крупных блоков.

- [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js)
  - содержит всю логику задач:
  - загрузку,
  - добавление,
  - обновление,
  - переключение `completed`,
  - удаление,
  - массовое удаление,
  - состояния модалок удаления.

- [MainContent.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/MainContent.jsx)
  - объединяет основной контент;
  - хранит `filter`;
  - формирует `filteredTodos`.

- [TodoFilter.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoFilter.jsx)
  - переключает режим отображения задач.

- [TodoList.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoList.jsx)
  - просто рендерит список через `map`.

- [TodoItem.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoItem.jsx)
  - стал контейнером для карточки задачи;
  - делегирует UI мелким компонентам.

## 4) Какие компоненты были выделены

Из больших кусков JSX вынесены отдельные детали интерфейса:
- [CheckboxButton.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/CheckboxButton.jsx)
- [DeleteButton.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/DeleteButton.jsx)
- [CheckedIcon.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/CheckedIcon.jsx)
- [PlusIcon.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/PlusIcon.jsx)
- [TodoEditForm.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoEditForm.jsx)
- [TodoTextDisplay.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoTextDisplay.jsx)
- [DeadlineBlock.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/DeadlineBlock.jsx)
- [DeleteCompletedButton.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/DeleteCompletedButton.jsx)
- [Header.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/Header.jsx)

Это полезно, потому что:
- каждый компонент решает одну маленькую задачу;
- код проще переиспользовать;
- правки становятся локальными и безопаснее.

## 5) Как теперь работает фильтрация

В [MainContent.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/MainContent.jsx) появилось состояние:
- `filter = "all" | "active" | "completed"`

Дальше на его основе строится `filteredTodos`:
- `all` показывает все задачи;
- `active` показывает только невыполненные;
- `completed` показывает только выполненные.

Это важный шаг: приложение уже умеет не только хранить задачи, но и представлять данные по-разному в зависимости от сценария пользователя.

## 6) Что стоит запомнить из этого урока

- Кастомный хук нужен, когда одна область логики разрастается и начинает мешать чтению компонента.
- Большой JSX лучше резать на компоненты по смыслу, а не по размеру файла.
- Фильтрация списка должна находиться ближе к месту отображения, если она относится к UI.
- Утилиты вроде [dateUtils.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/helpers/dateUtils.js) убирают дублирование и делают форматирование единообразным.

## 7) Почему это важно для голосового ввода

Голосовой ввод добавит ещё один слой логики: распознавание речи, состояние записи, ошибки доступа, подстановка текста.

Если бы весь код оставался внутри `App`, добавление голоса быстро превратило бы файл в перегруженный монолит.
После рефакторинга из части 6 это уже проще:
- логика задач живёт в отдельном хуке;
- UI разбит на маленькие компоненты;
- место для интеграции voice input становится очевиднее.

## 8) Технические замечания по текущему коду

- В [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js) и связанных компонентах всё ещё используется `Updata` вместо `Update`.
- В [MainContent.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/MainContent.jsx) фильтр хранится локально; если позже понадобится сохранять выбранный фильтр между перезагрузками, его придётся поднять выше или записывать в `localStorage`.
- В [useTodoManagement.js](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/hooks/useTodoManagement.js) остаются старые замечания по optimistic rollback и записи `localStorage` после массового удаления.
- В [TodoFilter.jsx](D:/Ruslan/Projects/Web-garage/tasks/my-app/src/components/TodoFilter.jsx) есть опечатка в тексте `Не выполенные`.

## 9) Чеклист части 6/10

- [x] Логика задач вынесена в кастомный хук.
- [x] `App` стал компактнее.
- [x] Добавлен фильтр задач.
- [x] `TodoItem` декомпозирован на более мелкие части.
- [x] Повторяющийся UI вынесен в отдельные компоненты.
- [x] Форматирование даты вынесено в helper.
- [ ] Подчистить нейминг `Update`.
- [ ] Подключить голосовой ввод в следующих частях.

---

Промежуточный итог части 6: приложение стало заметно взрослее по архитектуре. Это уже не просто набор функций, а более структурированная система, которую реально удобно расширять дальше.
