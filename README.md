РАЗДЕЛ 1: СТРУКТУРА ПРОЕКТА
src/components/TextComponent.jsx (пустой)
src/components/TaskList.jsx (пустой)
src/pages/HomePage.jsx (rfc)
src/App.jsx (rfc)
src/App.css (clear)
src/main.jsx (keep)

РАЗДЕЛ 2: ЗАДАЧИ

Task 01
• Целевой файл: src/components/TextComponent.jsx
• Действие: Создайте классовый компонент.
1. Импортируйте `Component` из 'react'.
2. Объявите класс `TextComponent`, наследующий `Component`.
3. Реализуйте метод `render()`, который возвращает `<div>` с заголовком `<h1>Первый классовый компонент</h1>` внутри.
4. Не забудьте `export default`.
• CSS-подсказка: Не требуется.
• Проверка: Код: Убедитесь, что используется синтаксис `class ... extends Component` и метод `render()`.

Task 02
• Целевой файл: src/pages/HomePage.jsx
• Действие: Подключите первый компонент.
1. Импортируйте `TextComponent` из `../components/TextComponent`.
2. Внутри возвращаемого JSX добавьте `<TextComponent />`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: На экране появился заголовок "Первый классовый компонент".

Task 03
• Целевой файл: src/App.jsx
• Действие: Настройте точку входа.
1. Импортируйте `HomePage` из `./pages/HomePage`.
2. Верните `<HomePage />` внутри компонента `App`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Приложение запускается без ошибок.

Task 04
• Целевой файл: src/components/TaskList.jsx
• Действие: Создайте заготовку классового компонента с состоянием (State).
1. Создайте класс `TaskList`, наследующий `Component`.
2. Напишите `constructor(props)`. Внутри обязательно вызовите `super(props)`.
3. Инициализируйте состояние `this.state` с двумя полями:
   - `tasks`: пустой массив.
   - `inputValue`: пустая строка (для управляемого инпута).
4. Реализуйте метод `render()`, возвращающий `div` с классом `task-list`. Внутри пока пусто.
• CSS-подсказка: Не требуется.
• Проверка: Код: Наличие конструктора и `this.state`.

Task 05
• Целевой файл: src/components/TaskList.jsx
• Действие: Реализуйте методы изменения состояния (Handlers).
1. Создайте метод `handleInputChange`, принимающий `event`. Он должен вызывать `this.setState` для обновления `inputValue` значением из `event.target.value`.
2. Создайте метод `handleAddTask`. Он должен:
   - Проверять, не пуста ли строка `this.state.inputValue`.
   - Создавать новый массив задач, добавляя текущий ввод к существующему массиву `this.state.tasks`.
   - Вызывать `this.setState` для обновления списка задач и очистки `inputValue` (сброс в пустую строку).
• CSS-подсказка: Не требуется.
• Проверка: Код: Использование `this.setState` вместо прямого изменения переменных.

Task 06
• Целевой файл: src/components/TaskList.jsx
• Действие: Реализуйте верстку и привязку событий в `render()`.
Внутри `div` с классом `task-list` добавьте:
1. `<h2>Список задач</h2>`.
2. `<input />` с атрибутами:
   - `value`: привязан к `this.state.inputValue`.
   - `onChange`: привязан к `(e) => this.handleInputChange(e)`.
   - `placeholder`: "Введите задачу...".
3. `<button>` с текстом "Добавить" и событием `onClick`, вызывающим `() => this.handleAddTask()`.
4. `<ul>`, внутри которого используйте `this.state.tasks.map(...)` для вывода массива задач в тегах `<li>`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Появился инпут и кнопка. При вводе текст отображается в поле.

Task 07
• Целевой файл: src/pages/HomePage.jsx
• Действие: Добавьте список задач на главную страницу.
1. Импортируйте `TaskList` из `../components/TaskList`.
2. Добавьте `<TaskList />` ниже `<TextComponent />`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: На странице видны оба компонента.

Task 08
• Целевой файл: src/App.css
• Действие: Добавьте стилизацию.
• CSS-подсказка:
```css
.task-list {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

input {
  padding: 8px;
  width: 70%;
  margin-right: 5px;
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  border-bottom: 1px solid #eee;
  padding: 8px;
}
```
• Проверка: Визуально: Компонент TaskList выглядит аккуратно, отцентрирован. Кнопка "Добавить" работает и добавляет пункты в список.
