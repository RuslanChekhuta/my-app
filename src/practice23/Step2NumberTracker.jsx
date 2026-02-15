import { useEffect, useRef, useState } from "react";

function Step2NumberTracker() {
  const [number, setNumber] = useState(0);
  const previousNumber = useRef(undefined);

  useEffect(() => {
    // TODO Шаг 2:
    // 1) в эффекте сохрани текущее number в previousNumber.current
    // 2) до сохранения выведи в консоль:
    //    "Предыдущее:", previousNumber.current, "Текущее:", number

    console.log("Предыдущее:", previousNumber.current, "Текущее:", number);
    previousNumber.current = number;
  }, [number]);

  return (
    <div>
      <p className="hint">
        Цель: сохранить предыдущее значение state без лишнего ререндера. Для
        проверки смотри консоль.
      </p>
      <div className="demo-box stack">
        <h3>Текущее число: {number}</h3>
        <div className="controls">
          <button onClick={() => setNumber((prev) => prev + 1)}>
            Увеличить
          </button>
          <button onClick={() => setNumber((prev) => prev - 1)}>
            Уменьшить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step2NumberTracker;
