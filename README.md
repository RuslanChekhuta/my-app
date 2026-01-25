РАЗДЕЛ 1: СТРУКТУРА ПРОЕКТА
src/components/ControlledForm.jsx (rfc)
src/components/UncontrolledForm.jsx (rfc)
src/components/MixedForm.jsx (rfc)
src/App.jsx (clear)
src/App.css (clear)
src/main.jsx (keep)

РАЗДЕЛ 2: ЗАДАЧИ

Task 01
• Целевой файл: src/App.css
• Действие: Добавьте базовые стили для разделения форм.
• CSS-подсказка:
```css
.form-container {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  max-width: 400px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.error {
  color: red;
  font-size: 12px;
}
```
• Проверка: Код скопирован, ошибок компиляции нет.

Task 02
• Целевой файл: src/components/ControlledForm.jsx
• Действие: Создайте управляемую форму.
1. Импортируйте хук `useState`.
2. Создайте состояние `formData` (объект с полями `name` и `email`).
3. Напишите функцию `handleChange(e)`, которая обновляет состояние динамически (используя `e.target.name` и `e.target.value`).
4. В `return`:
   - Оберните всё в `div` с классом `form-container`.
   - Добавьте заголовок `<h3>Controlled Form</h3>`.
   - Создайте два инпута (`name="name"`, `name="email"`). Привяжите их `value` к состоянию и повесьте `onChange`.
   - Добавьте вывод текущего состояния в `<p>Name: {formData.name}</p>`.
• CSS-подсказка: Не требуется (классы уже есть в App.css).
• Проверка: Визуально: при вводе текста в инпут, текст мгновенно дублируется в параграфе ниже.

Task 03
• Целевой файл: src/components/UncontrolledForm.jsx
• Действие: Создайте неуправляемую форму.
1. Импортируйте хук `useRef` (Исключение из правил: разрешено текущим уроком).
2. Создайте реф `inputRef` с начальным значением `null`.
3. Создайте функцию `handleSubmit(e)`, которая:
   - Отменяет стандартное поведение формы (`preventDefault`).
   - Читает значение через `inputRef.current.value`.
   - Если значение короче 5 символов, выводит `alert('Too short!')`.
   - Иначе выводит `alert('Success: ' + value)`.
4. В `return`:
   - `div` с классом `form-container`.
   - Заголовок `<h3>Uncontrolled Form</h3>`.
   - Тег `<form onSubmit={handleSubmit}>`.
   - Инпут с атрибутом `ref={inputRef}` (без `value` и `onChange`!).
   - Кнопка Submit.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: ввод текста не вызывает перерисовку (можно проверить логом в теле компонента). Алерт появляется только при нажатии кнопки.

Task 04
• Целевой файл: src/components/MixedForm.jsx
• Действие: Создайте комбинированную форму.
1. Импортируйте `useState` и `useRef`.
2. Логика:
   - Поле "Имя" должно быть управляемым (валидация на лету). Создайте стейт `name` и функцию `handleNameChange`. Если имя содержит цифры, стейт не обновляется (запрет ввода цифр).
   - Поле "О себе" должно быть неуправляемым (большой текст). Создайте `aboutRef`.
3. Функция `handleSubmit(e)`: выводит в консоль объект `{ name: ..., about: ... }`.
4. В `return`:
   - `div.form-container`.
   - Заголовок `<h3>Mixed Form</h3>`.
   - Инпут (Controlled) для имени.
   - Текстовое поле `textarea` (Uncontrolled) с `ref={aboutRef}`.
   - Кнопка отправки.
• CSS-подсказка: Не требуется.
• Проверка: Код: В инпут "Имя" невозможно ввести цифры. В консоли при отправке виден объект с данными обоих полей.

Task 05
• Целевой файл: src/App.jsx
• Действие: Соберите приложение.
1. Импортируйте `ControlledForm`, `UncontrolledForm`, `MixedForm`.
2. Импортируйте стили `./App.css`.
3. Внутри компонента `App` верните `div` (без класса или с пустым фрагментом), внутри которого рендерятся все три компонента по порядку.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: на странице отображаются три карточки с формами. Все формы работают согласно их логике.
