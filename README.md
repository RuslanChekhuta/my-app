СТРУКТУРА ПРОЕКТА
src/App.jsx (rfc)
src/components/Header.jsx (rfc)
src/components/UserProfile.jsx (rfc)
src/components/Footer.jsx (rfc)
src/App.css (clear)
src/main.jsx (keep)

ЗАДАЧИ
Task 01
• Целевой файл: .eslintrc.cjs (или eslint.config.js в корне проекта)
• Действие: Согласно источнику, отключите правило проверки типов, так как TypeScript и PropTypes не используются в данном уроке. Найдите секцию rules и добавьте туда строку: 'react/prop-types': 'off'.
• CSS-подсказка: Не требуется.
• Проверка: Код: В файле конфигурации присутствует правило 'react/prop-types': 'off'.

Task 02
• Целевой файл: src/App.css
• Действие: Добавьте базовые стили для визуализации структуры компонентов.
• CSS-подсказка:
```css
.container { max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; text-align: center; }
.header { background: #f4f4f4; padding: 10px; margin-bottom: 20px; border-bottom: 2px solid #ddd; }
.card { border: 1px solid #ccc; padding: 20px; border-radius: 8px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); display: inline-block; }
.footer { margin-top: 20px; padding: 10px; font-size: 0.8em; color: #777; }
.warning-box { background: #ffeeba; padding: 10px; margin-top: 10px; }
```
• Проверка: Визуально: Стили применились (пока на пустую страницу).

Task 03
• Целевой файл: src/App.jsx
• Действие: Импортируйте компоненты Header, UserProfile, Footer. Создайте структуру с классом container. Передайте следующие данные через пропсы (props):
1. В Header: title="React DevTools Practice".
2. В UserProfile: name="Alex", age={25}, job="Frontend Developer", status="Active".
3. В Footer: year={2024}.
• CSS-подсказка:
```jsx
return (
  <div className="container">
    <Header title="React DevTools Practice" />
    <UserProfile name="Alex" age={25} job="Frontend Developer" status="Active" />
    <Footer year={2024} />
  </div>
);
```
• Проверка: Визуально: На странице отобразились заглушки компонентов внутри контейнера.

Task 04
• Целевой файл: src/components/Header.jsx
• Действие: Примите пропс title. Верните тег header с className="header". Внутри разместите h1 с содержимым title.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Заголовок "React DevTools Practice" отображается на сером фоне.

Task 05
• Целевой файл: src/components/Footer.jsx
• Действие: Примите пропс year. Верните div с className="footer". Текст: "Copyright © {year}".
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Внизу страницы отображается копирайт с годом.

Task 06
• Целевой файл: src/components/UserProfile.jsx
• Действие:
1. Примите пропсы name, age, job, status.
2. Верните div. ВНИМАНИЕ: Для симуляции ошибки (источник) используйте атрибут class="card" вместо className="card".
3. Внутри выведите h2 c name, и параграфы для age, job и status.
• CSS-подсказка: Не требуется.
• Проверка: Консоль: Откройте DevTools (F12) -> Console. Вы должны увидеть красное предупреждение от React: "Invalid DOM property `class`. Did you mean `className`?".

Task 07
• Целевой файл: Инструменты разработчика браузера (React DevTools)
• Действие:
1. Установите расширение React Developer Tools, если еще не установлено.
2. Откройте вкладку "Components" в DevTools.
3. Найдите в дереве компонент UserProfile. Обратите внимание, что он может быть помечен предупреждающим значком из-за ошибки в Task 06.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Вы видите дерево компонентов: App -> Header, UserProfile, Footer.

Task 08
• Целевой файл: src/components/UserProfile.jsx
• Действие: Исправьте ошибку. Замените атрибут class на className.
• CSS-подсказка: Не требуется.
• Проверка: Консоль: После перезагрузки предупреждение в консоли исчезло.

Task 09
• Целевой файл: Инструменты разработчика браузера (Components Tab)
• Действие: Используйте функцию Live Editing.
1. Выберите компонент UserProfile в дереве.
2. В правой панели "Props" найдите поле name: "Alex".
3. Измените значение "Alex" на "Ivan".
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Текст на странице мгновенно изменился на "Ivan" без перезагрузки страницы и изменения кода.
