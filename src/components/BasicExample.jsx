import { useState, useTransition } from "react";

export function BasicExample() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      setCount((prev) => prev + 1);
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Увеличить счетчик</button>
      <span>{isPending ? "Загрузка..." : count}</span>
    </div>
  );
}
