РАЗДЕЛ 1: СТРУКТУРА ПРОЕКТА
src/App.jsx (clear)
src/main.jsx (keep)
src/App.css (clear)
src/pages/HomePage.jsx (rfc)
src/pages/SignupForm.jsx (rfc)
src/pages/SignupForm.css (clear)
src/pages/CustomForm.jsx (rfc)
src/pages/CustomForm.css (clear)
src/components/CustomForms/Input.jsx (rfc)
src/components/CustomForms/Select.jsx (rfc)
src/components/CustomForms/Checkbox.jsx (rfc)
src/components/CustomForms/Textarea.jsx (rfc)

РАЗДЕЛ 2: ЗАДАЧИ

Task 01
• Целевой файл: Терминал
• Действие: Установите библиотеку для работы с формами. Выполните команду: npm install react-hook-form
• CSS-подсказка: Не требуется.
• Проверка: Код: В package.json в dependencies появилась запись "react-hook-form".

Task 02
• Целевой файл: src/pages/SignupForm.jsx
• Действие: Импортируйте хук useForm из 'react-hook-form'. Внутри компонента деструктурируйте register, handleSubmit, formState: { errors } из результата вызова useForm(). Создайте функцию onSubmit, принимающую data и выводящую её в консоль.
• CSS-подсказка: Не требуется.
• Проверка: Код: Написано const { register, handleSubmit, formState: { errors } } = useForm();

Task 03
• Целевой файл: src/pages/SignupForm.jsx
• Действие: Создайте верстку формы. Добавьте тег <form> с обработчиком onSubmit, обернутым в handleSubmit. Внутри формы создайте два input (text для имени, email для почты) и кнопку type="submit". Свяжите инпуты с формой через оператор spread: {...register("fieldName", { required: true })}. Добавьте условный рендеринг: если есть ошибка в поле, выводить <p> с текстом ошибки.
• CSS-подсказка: src/pages/SignupForm.css
```css
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
}
.error-msg {
  color: red;
  font-size: 12px;
  margin: 0;
}
input {
  padding: 8px;
}
```
• Проверка: Визуально: Форма отображается, при попытке отправки пустой формы появляются сообщения об ошибках (красный текст).

Task 04
• Целевой файл: src/components/CustomForms/Input.jsx
• Действие: Перепишите компонент, используя React.forwardRef. Компонент должен принимать props (label, error, ...rest) и ref. Внутри верните label (если передан) и input, в который прокинут ref и остальные пропсы. Если есть error, выведите сообщение.
• CSS-подсказка: Не требуется (стилизуем через глобальный CSS или классы родителя).
• Проверка: Код: Использована конструкция const Input = React.forwardRef((props, ref) => { ... });

Task 05
• Целевой файл: src/components/CustomForms/Select.jsx
• Действие: Реализуйте компонент Select с использованием React.forwardRef. Он должен принимать массив options, label, error и ref. Сформируйте <select> с <option> внутри.
• CSS-подсказка: Не требуется.
• Проверка: Код: Наличие forwardRef и map для отрисовки options.

Task 06
• Целевой файл: src/components/CustomForms/Checkbox.jsx
• Действие: Реализуйте компонент Checkbox с использованием React.forwardRef. Верните label, внутри которого находится input type="checkbox".
• CSS-подсказка: Не требуется.
• Проверка: Код: Наличие forwardRef.

Task 07
• Целевой файл: src/components/CustomForms/Textarea.jsx
• Действие: Реализуйте компонент Textarea с использованием React.forwardRef. Аналогично Input, но используйте тег <textarea>.
• CSS-подсказка: Не требуется.
• Проверка: Код: Наличие forwardRef.

Task 08
• Целевой файл: src/pages/CustomForm.jsx
• Действие: Импортируйте созданные компоненты (Input, Select, Checkbox, Textarea). Инициализируйте useForm. Создайте форму, используя эти компоненты. Передавайте в них {...register("имя", { правила валидации })}.
• Правила валидации:
1. Имя: required, minLength: 3.
2. Пол (Select): required.
3. О себе (Textarea): maxLength: 200.
4. Согласие (Checkbox): required.
• CSS-подсказка: src/pages/CustomForm.css
```css
.custom-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin-top: 20px;
  border: 2px solid #4caf50;
  padding: 20px;
}
label {
  font-weight: bold;
}
```
• Проверка: Визуально: Отображается форма с зелеными границами. Работает валидация (ошибки выводятся под полями).

Task 09
• Целевой файл: src/pages/HomePage.jsx
• Действие: Импортируйте SignupForm и CustomForm. Выведите их внутри фрагмента. Добавьте заголовки H2 для каждой формы.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: На странице отображаются две разные формы друг под другом.

Task 10
• Целевой файл: src/App.jsx
• Действие: Импортируйте HomePage. Очистите содержимое return и верните только <HomePage />.
• CSS-подсказка: Не требуется.
• Проверка: В браузере по адресу localhost видны обе формы. При заполнении и отправке данные выводятся в консоль в виде объекта.
