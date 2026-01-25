РАЗДЕЛ 1: СТРУКТУРА ПРОЕКТА
src/App.jsx (clear)
src/App.css (clear)
src/main.jsx (keep)
src/styles/GlobalStyles.js (пустой)
src/components/UI/Button.styled.js (пустой)
src/components/UI/Input.styled.js (пустой)

РАЗДЕЛ 2: ЗАДАЧИ

Task 01
• Целевой файл: src/styles/GlobalStyles.js
• Действие: Импортируйте `createGlobalStyle` из 'styled-components'. Создайте и экспортируйте компонент `GlobalStyles`. Внутри шаблонной строки задайте глобальные стили для `body`, используя цвет фона и цвет текста из темы (`props.theme`).
• CSS-подсказка:
```css
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
  /* Используйте интерполяцию для темы: */
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s linear;
}
```
• Проверка: Код: файл экспортирует `GlobalStyles` созданный через `createGlobalStyle`.

Task 02
• Целевой файл: src/components/UI/Button.styled.js
• Действие: Импортируйте `styled`, `css` и `keyframes` из 'styled-components'. Создайте анимацию вращения `rotate` (0deg -> 360deg). Создайте и экспортируйте компонент `StyledButton` (тег button).
• CSS-подсказка:
```css
/* keyframes rotate */
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }

/* StyledButton styles */
padding: 10px 20px;
font-size: 1rem;
border: 2px solid ${props => props.theme.colors.primary};
background: transparent;
color: ${props => props.theme.colors.primary};
cursor: pointer;
margin: 5px;
transition: 0.3s;

/* Логика пропса $filled */
${props => props.$filled && css`
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.background};
`}

&:hover {
    opacity: 0.8;
}
```
• Проверка: Код: наличие экспорта `StyledButton`, использование `keyframes` и условия для пропса `$filled`.

Task 03
• Целевой файл: src/components/UI/Button.styled.js
• Действие: В этом же файле создайте и экспортируйте компонент `AnimatedButton`. Расширьте стили (Extending) компонента `StyledButton`. Добавьте бесконечную анимацию вращения.
• CSS-подсказка:
```css
animation: ${rotate} 2s linear infinite;
border-radius: 50px;
width: 50px;
height: 50px;
padding: 0;
display: inline-flex;
justify-content: center;
align-items: center;
```
• Проверка: Код: использован синтаксис `styled(StyledButton)`.

Task 04
• Целевой файл: src/components/UI/Input.styled.js
• Действие: Импортируйте `styled` из 'styled-components'. Создайте и экспортируйте компонент `StyledInput`. Используйте метод `.attrs`, чтобы задать атрибут `type: 'text'` и динамический `placeholder` (если пропс не передан, использовать "Введите текст...").
• CSS-подсказка:
```css
padding: 10px;
margin: 10px 0;
border: 1px solid ${props => props.theme.colors.border};
border-radius: 4px;
width: 100%;
max-width: 300px;
outline: none;

&:focus {
    border-color: ${props => props.theme.colors.primary};
}
```
• Проверка: Код: использован синтаксис `styled.input.attrs(props => ({...}))`.

Task 05
• Целевой файл: src/App.jsx
• Действие:
1. Импортируйте `useState` из 'react'.
2. Импортируйте `ThemeProvider` из 'styled-components'.
3. Импортируйте созданные компоненты: `GlobalStyles`, `StyledButton`, `AnimatedButton`, `StyledInput`.
4. Создайте два объекта темы вне компонента:
   - `lightTheme`: colors { primary: '#6200ee', background: '#ffffff', text: '#000000', border: '#cccccc' }
   - `darkTheme`: colors { primary: '#bb86fc', background: '#121212', text: '#ffffff', border: '#333333' }
5. Внутри App создайте состояние `theme` ('light').
6. Реализуйте функцию переключения темы.
7. Оберните верстку в `ThemeProvider`, передав в него актуальный объект темы.
8. Подключите `<GlobalStyles />` внутри ThemeProvider.
• CSS-подсказка: Не требуется (стили заданы в компонентах).
• Проверка: Код: `GlobalStyles` находится ВНУТРИ `ThemeProvider`.

Task 06
• Целевой файл: src/App.jsx
• Действие: Внутри ThemeProvider постройте интерфейс:
1. Заголовок `h1` с текстом "Styled Components Lab".
2. `StyledInput` (проверьте, что placeholder появился автоматически).
3. `StyledButton` с текстом "Сменить тему" и обработчиком клика (переключение темы).
4. `StyledButton` с пропсом `$filled` (передайте значение true) и текстом "Filled Button".
5. `AnimatedButton` с текстом "↻".
6. `StyledButton` с использованием полиморфизма (`as="a"`, `href="#"`) и текстом "Я ссылка".
• CSS-подсказка: Можно обернуть контент в `div` с инлайн-стилем `style={{ padding: '20px', textAlign: 'center' }}`, чтобы отцентровать элементы.
• Проверка: Визуально: При клике на кнопку меняются цвета всего приложения (фон, текст, границы кнопок). Есть вращающаяся кнопка. Кнопка "Я ссылка" в DOM-дереве является тегом `<a>`.
