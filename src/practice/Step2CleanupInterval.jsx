import { useEffect, useState } from "react";

function Step2CleanupInterval() {
  const [message, setMessage] = useState("Привет");

  useEffect(() => {
    // TODO Шаг 2:
    // 1) создай интервал, который логирует текущее message каждые 2 секунды
    // 2) очищай предыдущий интервал в return-функции
    // 3) в массиве зависимостей должен быть message

    const intervalId = setInterval(() => {
      console.log(message);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [message]);

  return (
    <div>
      <p className="hint">
        Цель: после ввода нового текста старый интервал должен очищаться.
      </p>
      <label>
        Сообщение:
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          style={{ marginLeft: 8 }}
        />
      </label>
      <div className="demo-box">
        <p>Открой консоль и меняй input: A -&gt; B -&gt; C.</p>
      </div>
    </div>
  );
}

export default Step2CleanupInterval;
