import { lazy, Suspense, useState } from "react";

const TodoComponent = lazy(() => import("../TodoComponent.jsx"));
const TextComponent = lazy(() => import("../TextComponent.jsx"));

function App() {
  const [showText, setShowText] = useState(false);
  const [showTodo, setShowTodo] = useState(false);

  return (
    <div>
      <div>
        <h2>1. Загрузка компонента</h2>
        <button
          onClick={() => {
            setShowText(!showText);
          }}
        >
          {showText ? "Скрыть" : "Показать"} компонент
        </button>
        <Suspense fallback={<div>Компонент загружается</div>}>
          {showText && <TextComponent />}
        </Suspense>

        <h2>2. Загрузка компонента списка задач</h2>
        <button
          onClick={() => {
            setShowTodo(!showTodo);
          }}
        >
          {showTodo ? "Скрыть" : "Показать"} список задач
        </button>
        <Suspense fallback={<div>Компонент загружается</div>}>
          {showTodo && <TodoComponent />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
