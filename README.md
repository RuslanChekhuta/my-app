СТРУКТУРА ПРОЕКТА
src/hocs/withCounter.jsx (rfc)
src/components/ClickButton.jsx (rfc)
src/components/HoverDiv.jsx (rfc)
src/App.css (clear)
src/App.jsx (clear)
src/main.jsx (keep)

ЗАДАЧИ
Task 01
• Целевой файл: src/App.css
• Действие: Добавьте базовые стили для визуализации компонентов.
• CSS-подсказка:
```css
.container { padding: 20px; display: flex; gap: 20px; flex-direction: column; align-items: center; }
.btn { padding: 10px 20px; font-size: 16px; cursor: pointer; background: #61dafb; border: none; border-radius: 4px; }
.box { width: 200px; height: 100px; background: #282c34; color: white; display: flex; align-items: center; justify-content: center; border: 2px solid #61dafb; cursor: crosshair; }
```
• Проверка: Файл сохранен.

Task 02
• Целевой файл: src/hocs/withCounter.jsx
• Действие: Реализуйте функцию высшего порядка (HOC).
1. Функция должна принимать аргумент `WrappedComponent`.
2. Функция должна возвращать новый функциональный компонент.
3. Внутри нового компонента создайте состояние `count` (начальное значение 0) и функцию `increment` (увеличивает `count` на 1).
4. Верните `WrappedComponent`, передав ему все входящие `props`, а также пропсы `count` и `increment`.
• CSS-подсказка: Не требуется.
• Проверка: Код: `export default withCounter;` в конце файла. Использован `useState`.

Task 03
• Целевой файл: src/components/ClickButton.jsx
• Действие: Создайте презентационный компонент.
1. Примите пропсы `count`, `increment` и `label`.
2. Верните кнопку с классом `btn`.
3. На событие `onClick` повесьте функцию `increment`.
4. Текст кнопки: `{label}: {count}`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально компонент пока не виден (не подключен). Код: отсутствует состояние, только пропсы.

Task 04
• Целевой файл: src/components/HoverDiv.jsx
• Действие: Создайте второй презентационный компонент.
1. Примите пропсы `count` и `increment`.
2. Верните `div` с классом `box`.
3. На событие `onMouseEnter` (наведение мыши) повесьте функцию `increment`.
4. Текст внутри блока: `Наведений: {count}`.
• CSS-подсказка: Не требуется.
• Проверка: Код: отсутствует состояние.

Task 05
• Целевой файл: src/App.jsx
• Действие: Соберите композицию в главном файле.
1. Импортируйте `withCounter`, `ClickButton` и `HoverDiv`.
2. Создайте "усиленные" компоненты ВНЕ компонента App (или внутри, но через константы):
   - `const EnhancedButton = withCounter(ClickButton);`
   - `const EnhancedDiv = withCounter(HoverDiv);`
3. В `App` верните `div` с классом `container`.
4. Внутри отрендерите:
   - `<EnhancedButton label="Клики" />`
   - `<EnhancedDiv />`
• CSS-подсказка: Импортируйте `./App.css`.
• Проверка: Визуально: Кнопка "Клики: 0" увеличивает число при нажатии. Черный блок "Наведений: 0" увеличивает число при наведении мыши. Логика счетчика работает изолированно для каждого компонента.