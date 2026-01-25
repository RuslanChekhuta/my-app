РАЗДЕЛ 1: СТРУКТУРА ПРОЕКТА
src/components/Container.jsx (rfc)
src/components/Modal.jsx (rfc)
src/components/Modal.css (пустой)
src/components/ModalPage.jsx (rfc)
src/App.css (clear)
src/App.jsx (clear)
src/main.jsx (keep)

РАЗДЕЛ 2: ЗАДАЧИ

Task 01
• Целевой файл: src/components/Container.jsx
• Действие: Создайте компонент-обертку. Функция должна принимать пропс `children` (деструктуризация). Верните `div`, который оборачивает `{children}`.
• CSS-подсказка: Добавьте этому `div` инлайн-стили: `{ border: '1px solid #ccc', padding: '20px', margin: '20px', borderRadius: '8px' }`.
• Проверка: Код: Убедитесь, что `children` используется внутри возвращаемого JSX.

Task 02
• Целевой файл: src/components/Modal.css
• Действие: Вставьте стили для модального окна (затемнение фона и само окно).
• CSS-подсказка:
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  min-width: 300px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: bold;
}
```
• Проверка: Визуально: Файл не пустой.

Task 03
• Целевой файл: src/components/Modal.jsx
• Действие:
1. Импортируйте файл стилей `./Modal.css`.
2. Измените аргументы функции: компонент принимает `isOpen`, `onClose`, `children`.
3. Реализуйте логику: если `isOpen` равно `false`, верните `null` (ничего не рендерится).
4. Если `isOpen` равно `true`, верните разметку: `div` с классом `modal-overlay` (с обработчиком клика `onClose`), внутри него `div` с классом `modal-content` (с `e.stopPropagation()` при клике), внутри которого кнопка закрытия (вызывает `onClose`) и `{children}`.
• CSS-подсказка: Не требуется (классы уже прописаны).
• Проверка: Код: Использован условный рендеринг (if или тернарный оператор).

Task 04
• Целевой файл: src/components/ModalPage.jsx
• Действие:
1. Импортируйте хук `useState` из 'react'.
2. Импортируйте компоненты `Modal` и `Container` (из текущей папки).
3. Внутри компонента создайте состояние `modalId` со значением по умолчанию `null`.
4. Создайте функцию `toggleModal`, которая принимает `id`. Логика: если `modalId` равен переданному `id`, установить `null`, иначе установить `id`.
• CSS-подсказка: Не требуется.
• Проверка: Код: Наличие `useState` и функции переключения.

Task 05
• Целевой файл: src/components/ModalPage.jsx
• Действие: Реализуйте `return`.
1. Оберните всё в `Container`.
2. Добавьте заголовок `h2` с текстом "Управление модальными окнами".
3. Добавьте `div` с кнопками:
   - Кнопка "Открыть Модалку 1" -> `onClick` вызывает `toggleModal(1)`.
   - Кнопка "Открыть Модалку 2" -> `onClick` вызывает `toggleModal(2)`.
• CSS-подсказка: Для кнопок можно добавить `style={{ marginRight: '10px' }}`.
• Проверка: Визуально: На экране появились две кнопки.

Task 06
• Целевой файл: src/components/ModalPage.jsx
• Действие: Добавьте вызов компонентов `Modal` ниже кнопок.
1. Первое окно: `<Modal isOpen={modalId === 1} onClose={() => setModalId(null)}>`. Внутри (как `children`) поместите заголовок "Вход" и пару `input`.
2. Второе окно: `<Modal isOpen={modalId === 2} onClose={() => setModalId(null)}>`. Внутри поместите заголовок "Информация" и параграф с текстом.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: При нажатии на кнопки открываются разные окна с разным содержимым.

Task 07
• Целевой файл: src/App.jsx
• Действие: Импортируйте `ModalPage` и верните его внутри компонента `App`.
• CSS-подсказка: Не требуется.
• Проверка: Визуально: Приложение запускается, виден заголовок и кнопки управления.
