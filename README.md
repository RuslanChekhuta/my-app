СТРУКТУРА ПРОЕКТА
src/components/Button.jsx (rfc)
src/components/Header.jsx (rfc)
src/pages/HomePage.jsx (rfc)
src/App.jsx (clear)
src/App.css (clear)
src/main.jsx (keep)

ЗАДАЧИ
Task 01
• Целевой файл: src/App.css
• Действие: Добавьте базовые стили для сброса отступов и центрирования текста.
• CSS-подсказка:
```css
body {
  margin: 0;
  font-family: sans-serif;
  text-align: center;
}
.header {
  background-color: #f0f0f0;
  padding: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  transition: opacity 0.3s;
}
.btn:hover {
  opacity: 0.8;
}
```
• Проверка: Код: Файл содержит указанные стили.

Task 02
• Целевой файл: src/components/Button.jsx
• Действие: Создайте универсальный компонент кнопки.
1. Примите объект `props` и деструктурируйте из него свойства: `label` (текст кнопки), `onClick` (функция), `customStyle` (объект стилей).
2. Установите значение по умолчанию для `label` = "Нажми меня".
3. Верните тег `<button>`.
4. Присвойте атрибуту `className` значение `"btn"`.
5. Присвойте атрибуту `style` проп `customStyle`.
6. Присвойте атрибуту `onClick` проп `onClick`.
7. Внутри тега выведите `label`.
• CSS-подсказка: Не требуется (классы уже в App.css).
• Проверка: Код: Используется деструктуризация `({ label = "Нажми меня", onClick, customStyle })`.

Task 03
• Целевой файл: src/components/Header.jsx
• Действие: Создайте шапку сайта.
1. Импортируйте компонент `Button`.
2. Верните тег `<header>` с классом `header`.
3. Внутри header добавьте заголовок `<h1>React Props Lesson</h1>`.
4. Ниже добавьте две кнопки `Button`:
   - Первая: текст "Вход", стиль `{ backgroundColor: '#4CAF50', color: 'white' }`.
   - Вторая: текст "Регистрация", стиль `{ backgroundColor: '#2196F3', color: 'white' }`.
   - Пока не передавайте `onClick`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Серый блок header с заголовком и двумя разноцветными кнопками.

Task 04
• Целевой файл: src/pages/HomePage.jsx
• Действие: Соберите главную страницу и реализуйте логику.
1. Импортируйте `Header` и `Button`.
2. Создайте функцию `handleAction` внутри компонента `HomePage` (до return). Функция должна принимать строковый аргумент `text` и вызывать `alert(text)`.
3. В `return` верните фрагмент (`<>...</>`).
4. Вставьте компонент `Header`.
5. Ниже добавьте `<div>` с произвольным текстом (например, "Основной контент").
6. В этот div добавьте кнопку `Button` с текстом "Кликни чтобы увидеть alert".
7. Передайте этой кнопке в проп `onClick` стрелочную функцию, которая вызывает `handleAction('Привет из HomePage!')`.
8. Передайте этой кнопке стиль `{ backgroundColor: 'orange', marginTop: '20px' }`.
• CSS-подсказка: Не требуется.
• Проверка: Код: Убедитесь, что `onClick` передан как `() => handleAction(...)`, а не `handleAction(...)` (мгновенный вызов).

Task 05
• Целевой файл: src/App.jsx
• Действие: Соберите приложение.
1. Импортируйте `HomePage`.
2. Импортируйте стили `./App.css`.
3. Внутри компонента `App` верните `HomePage`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: На странице отображается шапка с двумя кнопками и оранжевая кнопка в контенте. При клике на оранжевую кнопку появляется всплывающее окно (alert).
