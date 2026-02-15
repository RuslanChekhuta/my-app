import { useEffect, useState } from "react";

const TitleUpdater = () => {
  // TODO: Реализуйте счетчик и обновление document.title.
  const [count, setCount] = useState(0);

  useEffect(() => {
    // TODO: document.title = Вы нажали:  раз;
    document.title = `Вы нажали: ${count}  раз.`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Click me</button>
    </div>
  );
};

export default TitleUpdater;
