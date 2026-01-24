РАЗДЕЛ 1: СТРУКТУРА ПРОЕКТА

src/components/Header.jsx (rfc)
src/components/HomePage.jsx (rfc)
src/components/Footer.jsx (rfc)
src/components/ThemeToggle.jsx (rfc)
src/App.css (clear)
src/App.jsx (clear)
src/main.jsx (keep)

РАЗДЕЛ 2: ЗАДАЧИ

Task 01
• Целевой файл: src/App.css
• Действие: Добавьте глобальные стили для поддержки тем и верстки.
• CSS-подсказка:
```css
body { margin: 0; font-family: sans-serif; transition: 0.3s; }
.app { min-height: 100vh; display: flex; flex-direction: column; text-align: center; }
.app.light { background-color: #ffffff; color: #333; }
.app.dark { background-color: #222; color: #f5f5f5; }
header, footer { padding: 20px; border: 1px solid #ccc; margin: 10px; border-radius: 8px; }
main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; }
button { padding: 10px 20px; cursor: pointer; margin: 5px; font-size: 1rem; }
input { padding: 10px; font-size: 1rem; border-radius: 4px; border: 1px solid #999; }
.footer-active { border-color: #646cff; border-width: 2px; }
```
• Проверка: Код скопирован, ошибок компиляции нет.

Task 02
• Целевой файл: src/App.jsx
• Действие: Создайте каркас приложения.
1. Импортируйте `useState` из 'react'.
2. Создайте три состояния:
   - `clicks` (число, по умолчанию 0).
   - `isDark` (булево, по умолчанию false).
   - `userName` (строка, по умолчанию "Гость").
3. В `return` создайте `div` с `className` "app", к которому динамически добавляется класс "dark" или "light" в зависимости от состояния `isDark`.
• CSS-подсказка: Не требуется (логика классов описана выше).
• Проверка: Визуально. Пока страница пустая (или содержит временный текст), но в инспекторе у div меняется класс, если вручную поменять `useState(true)`.

Task 03
• Целевой файл: src/components/Header.jsx
• Действие: Настройте компонент для отображения данных ("читающий компонент").
1. Примите пропсы `clicks` и `userName`.
2. Выведите заголовок `<h1>Dashboard</h1>`.
3. Ниже выведите параграф: "Пользователь: {userName} | Кликов: {clicks}".
• CSS-подсказка: Не требуется.
• Проверка: Подключите компонент в `App.jsx`, передайте стейты. В браузере должны отобразиться начальные значения (Гость | 0).

Task 04
• Целевой файл: src/components/HomePage.jsx
• Действие: Реализуйте логику изменения счетчика.
1. Примите пропс `setClicks`.
2. Добавьте кнопку "Кликнуть (+1)". При клике вызывайте `setClicks`, увеличивая значение на 1.
3. Добавьте кнопку "Супер-клик (+3)". При клике вызывайте `setClicks` **три раза подряд**.
   - ВАЖНО: Чтобы счетчик увеличился корректно на 3, используйте callback-синтаксис обновления состояния: `setClicks(prev => prev + 1)`.
• CSS-подсказка: Не требуется.
• Проверка: Подключите в `App.jsx`. Кнопка "+1" увеличивает счетчик в хедере на 1. Кнопка "+3" увеличивает ровно на 3 (если использован callback) или на 1 (если допущена ошибка прямой установки).

Task 05
• Целевой файл: src/components/ThemeToggle.jsx
• Действие: Реализуйте переключатель темы.
1. Примите пропс `toggleTheme` (функция).
2. Верните кнопку с текстом "Переключить тему".
3. Навесьте обработчик `onClick`, вызывающий `toggleTheme`.
• CSS-подсказка: Не требуется.
• Проверка: В `App.jsx` создайте функцию-обертку, которая инвертирует `isDark` (`!prev`), передайте её в `ThemeToggle`. При нажатии фон страницы должен меняться с белого на темный.

Task 06
• Целевой файл: src/components/Footer.jsx
• Действие: Реализуйте двустороннее связывание (Two-Way Binding) для ввода имени.
1. Примите пропсы `userName`, `setUserName` и `isDark`.
2. Создайте `input`.
   - Значение (`value`) должно быть привязано к `userName`.
   - Событие (`onChange`) должно вызывать `setUserName` с текущим значением инпута.
3. Оберните содержимое в `footer`. Если `isDark === true`, добавьте тегу footer класс `footer-active` (для визуальной индикации, что подвал реагирует на тему).
• CSS-подсказка: Не требуется.
• Проверка: Подключите в `App.jsx`. Ввод текста в подвале должен мгновенно обновлять текст "Пользователь: ..." в шапке (Header). При смене темы рамка подвала меняет цвет.

Task 07
• Целевой файл: src/App.jsx
• Действие: Финальная сборка ("Подъем состояния").
1. Импортируйте все созданные компоненты: `Header`, `HomePage`, `ThemeToggle`, `Footer`.
2. Внутри основного `div` соберите разметку:
   - `<Header ... />` (передайте `clicks`, `userName`).
   - `<main>`
     - `<ThemeToggle ... />` (передайте функцию переключения темы).
     - `<HomePage ... />` (передайте `setClicks`).
   - `</main>`
   - `<Footer ... />` (передайте `userName`, `setUserName`, `isDark`).
• CSS-подсказка: Не требуется.
• Проверка:
   - Счетчик в Header обновляется из HomePage.
   - Имя в Header обновляется из Footer.
   - Тема меняет стили Wrapper'а и Footer'а, переключатель находится в центре.
