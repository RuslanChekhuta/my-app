# Урок 2.13. Хук `useImperativeHandle`

## Что делает `useImperativeHandle`
`useImperativeHandle` позволяет дочернему компоненту явно задать, какие методы будут доступны родителю через `ref`.

Идея: родитель не получает весь внутренний DOM/состояние дочернего компонента, а только контролируемый API (например: `focus`, `play`, `pause`, `scrollToEnd`).

## Базовый шаблон
```jsx
const Child = ({ ref }) => {
  const innerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    someMethod() {
      // работа с innerRef.current
    },
  }), []);

  return <input ref={innerRef} />;
};
```

В React 19 (как у вас в проекте) `ref` можно принимать как обычный проп в компоненте.

## Как это реализовано в вашем коде

### 1) `Input.jsx`
Файл: `src/components/Input.jsx`

- Родитель (`App`) хранит `inputRef`.
- Дочерний `Input` через `useImperativeHandle` открывает наружу 2 метода:
- `fn1()` -> фокус на input
- `fn2()` -> вернуть текущее значение input

Это правильный пример инкапсуляции: родитель вызывает методы, не зная внутреннюю структуру DOM внутри `Input`.

### 2) `Post.jsx` + `Page.jsx`
Файлы: `src/components/Post.jsx`, `src/components/Page.jsx`

- `Page` вызывает `postRef.current.scrollAndFocus()` после добавления комментария.
- `Post` через `useImperativeHandle` открывает метод `scrollAndFocus`, который прокручивает блок комментариев вниз.

Такой подход удобен для сценариев "сделай действие внутри дочернего компонента после события в родителе".

### 3) `AudioPlayer.jsx` + `ParentComponent.jsx`
Файлы: `src/components/AudioPlayer.jsx`, `src/components/ParentComponent.jsx`

- Родитель хранит `audioPlayerRef`.
- `AudioPlayer` раскрывает методы:
- `play()`
- `pause()`
- `seekForward()`
- `seekBack()`

Родитель связывает кнопки с этими методами (`handlePlay`, `handlePause`, и т.д.).
Это классический кейс imperative API: внешний контроллер для медиа-компонента.

## Когда использовать
- Нужно выполнить конкретное действие в дочернем компоненте из родителя.
- Действие связано с DOM API или императивным поведением (фокус, прокрутка, media control).
- Не хочется пробрасывать слишком много пропсов ради разового действия.

## Когда не использовать
- Если задачу можно решить декларативно через `props`/`state`.
- Если через `ref` начинают протекать детали внутренней реализации компонента.

Правило: `useImperativeHandle` должен открывать минимально необходимый API.

## Полезные замечания по текущему коду
1. В `Post.jsx` объявлен `inputRef`, но он не привязан к элементу в JSX, поэтому `inputRef.current` там всегда `null`.
2. В `ParentComponent.jsx` для надёжности можно использовать optional chaining и в `seekForward/seekBack`: `audioPlayerRef.current?.seekForward()`.
3. В `AudioPlayer.jsx` при перемотке назад стоит ограничивать время снизу нулём, чтобы избежать отрицательного `currentTime`.

Пример безопасной перемотки:
```jsx
seekBack: () => {
  if (audioRef.current) {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 30);
  }
},
```

## Короткая формула для запоминания
`useRef` + `useImperativeHandle` = публичные методы дочернего компонента для родителя.

Сначала создаёшь внутренний `ref` на DOM/логику, потом возвращаешь наружу только нужные функции.
