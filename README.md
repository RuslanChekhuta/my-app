РАЗДЕЛ 1: СТРУКТУРА ПРОЕКТА
src/components/RegForm/RegForm.jsx (rfc)
src/components/RegForm/RegForm.css (пустой)
src/components/RegForm/validators.js (пустой)
src/App.jsx (rfc)
src/App.css (clear)
src/main.jsx (keep)

РАЗДЕЛ 2: ЗАДАЧИ

Task 01
• Целевой файл: src/components/RegForm/validators.js
• Действие: Создайте и экспортируйте две чистые функции:
1. `isValidPassword(password)` — возвращает true, если строка содержит хотя бы одну букву И одну цифру, и длина >= 6 символов.
2. `isValidEmail(email)` — простая проверка на наличие символа "@" и точки.
• CSS-подсказка: Не требуется.
• Проверка: Код: функции экспортированы.

Task 02
• Целевой файл: src/App.jsx
• Действие: Импортируйте `RegForm` и `RegForm.css`. Отрисуйте компонент `<RegForm />` внутри основного `div`.
• CSS-подсказка: src/App.css (вставьте этот код)
```css
body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f2f5; font-family: sans-serif; }
```
• Проверка: Визуально: На экране отобразится "RegForm" (заглушка).

Task 03
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Импортируйте файл стилей `./RegForm.css` и функции из `./validators.js`.
Внутри компонента создайте состояния (`useState`):
1. `formData` — объект с полями `{ name: '', email: '', password: '', confirmPassword: '', year: '' }`.
2. `errors` — объект для хранения ошибок валидации.
3. `isSuccess` — булево значение для статуса успешной отправки.
• CSS-подсказка: Не требуется.
• Проверка: Код: использован хук useState.

Task 04
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Напишите функцию `handleChange(e)`. Она должна обновлять `formData`, используя `e.target.name` и `e.target.value`. Сбрасывайте `isSuccess` в false при любом изменении ввода.
• CSS-подсказка: Не требуется.
• Проверка: Код: использование spread-оператора для сохранения предыдущего состояния объекта formData.

Task 05
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Реализуйте верстку формы.
1. Оберните всё в `div.reg-form`.
2. Добавьте заголовок `<h2>Регистрация</h2>`.
3. Добавьте тег `<form>`.
4. Внутри формы создайте инпуты для Name, Email, Password, Confirm Password.
5. Для каждого инпута установите атрибуты `value`, `name` и обработчик `onChange={handleChange}`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: появилась форма с полями.

Task 06
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Реализуйте динамический список годов.
1. Внутри формы добавьте `<select>` с `name="year"` и `value={formData.year}`.
2. Используя `Array.from` или цикл, сгенерируйте `<option>` с годами от 1950 до 2024.
3. Первым пунктом добавьте `<option value="">Выберите год</option>`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: выпадающий список содержит годы.

Task 07
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Добавьте визуализацию совпадения паролей "на лету".
После поля Confirm Password добавьте условный рендеринг:
- Если поле `confirmPassword` пустое — ничего не выводить.
- Если пароли совпадают — вывести `span.match-success` ("Пароли совпадают").
- Если не совпадают — вывести `span.match-error` ("Пароли не совпадают").
• CSS-подсказка: Стили будут добавлены в Task 09.
• Проверка: Визуально: текст появляется при вводе подтверждения пароля.

Task 08
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Напишите функцию `handleSubmit(e)`.
1. `e.preventDefault()`.
2. Создайте объект `newErrors`.
3. Провалидируйте поля (имя не пустое, валидация email и password через импортированные функции, year не пустой).
4. Если `Object.keys(newErrors).length > 0` — обновите стейт `errors`.
5. Иначе — установите `isSuccess(true)`, очистите `errors` и выведите `formData` в консоль.
Привяжите функцию к `onSubmit` формы.
• CSS-подсказка: Не требуется.
• Проверка: Консоль: при нажатии Enter (с валидными данными) объект формы выводится в лог.

Task 09
• Целевой файл: src/components/RegForm/RegForm.css
• Действие: Добавьте стилизацию.
• CSS-подсказка: src/components/RegForm/RegForm.css
```css
.reg-form { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 300px; }
.reg-form input, .reg-form select { width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
.reg-form input.error-border { border-color: red; }
.error-text { color: red; font-size: 0.8rem; margin-top: -5px; margin-bottom: 10px; display: block; }
.match-success { color: green; font-size: 0.8rem; }
.match-error { color: red; font-size: 0.8rem; }
.success-message { background: #d4edda; color: #155724; padding: 10px; border-radius: 4px; margin-bottom: 15px; text-align: center; }
button { width: 100%; padding: 10px; margin-top: 10px; cursor: pointer; }
button[type="submit"] { background: #007bff; color: white; border: none; }
button[type="reset"] { background: transparent; color: #666; border: 1px solid #ccc; }
```
• Проверка: Визуально: форма стала красивой, появилась тень и отступы.

Task 10
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Отображение ошибок валидации.
Под каждым полем добавьте условный рендеринг: `errors.name && <span className="error-text">{errors.name}</span>` (и так для всех полей).
Добавьте инпутам класс `error-border`, если соответствующее поле есть в объекте `errors`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: при попытке отправить пустую форму поля подсвечиваются красным.

Task 11
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Добавьте кнопки управления.
1. Кнопка "Зарегистрироваться" (`type="submit"`).
2. Кнопка "Очистить" (`type="reset"`).
3. Напишите `handleReset`, который сбрасывает `formData` в начальное состояние, очищает `errors` и `isSuccess`. Привяжите к `onReset` формы.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: кнопка очистки стирает все введенные данные.

Task 12
• Целевой файл: src/components/RegForm/RegForm.jsx
• Действие: Сообщение об успехе.
Перед заголовком добавьте: если `isSuccess` true — показать `div` с классом `success-message` и текстом "Регистрация прошла успешно!".
• CSS-подсказка: Не требуется.
• Проверка: Визуально: после успешной валидации появляется зеленое сообщение.