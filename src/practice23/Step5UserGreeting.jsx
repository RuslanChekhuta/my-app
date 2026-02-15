import { useEffect, useRef, useState } from "react";

function UserGreeting({ name }) {
  const previousName = useRef(undefined);

  useEffect(() => {
    // TODO Шаг 5:
    // 1) сравни previousName.current и name
    // 2) если имя изменилось, выведи лог в консоль
    // 3) в конце эффекта сохрани name в previousName.current

    if (previousName.current !== name) {
      console.log(`Имя изменилось: ${previousName.current} -> ${name}`);
    }
    previousName.current = name;
  }, [name]);

  return (
    <div className="demo-box stack">
      <h2>Привет, {name}!</h2>
      <p>Подсказка: предыдущее имя проверь в консоли после реализации TODO.</p>
    </div>
  );
}

function Step5UserGreeting() {
  const [name, setName] = useState("Алекс");

  return (
    <div>
      <p className="hint">
        Цель: отследить предыдущее значение пропса и сравнить с текущим.
      </p>
      <label>
        Имя:
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={{ marginLeft: 8 }}
        />
      </label>
      <UserGreeting name={name} />
    </div>
  );
}

export default Step5UserGreeting;
