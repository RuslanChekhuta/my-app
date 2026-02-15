import { useEffect, useState } from "react";

function Step1LifecycleDemo() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    // TODO Шаг 1:
    // 1) запусти setInterval, который увеличивает count каждую секунду
    // 2) добавь cleanup через clearInterval
    // 3) добавь console.log для mount/unmount

    console.log("mount");

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      console.log("unmount");
      clearInterval(intervalId);
    };
  }, [visible]);

  return (
    <div>
      <p className="hint">
        Цель: увидеть mount/unmount и остановку таймера в cleanup.
      </p>
      <button onClick={() => setVisible((prev) => !prev)}>
        {visible ? "Скрыть демо-блок" : "Показать демо-блок"}
      </button>

      {visible && (
        <div className="demo-box">
          <p>Счетчик: {count}</p>
          <button onClick={() => setCount((prev) => prev + 1)}>
            Вручную +1
          </button>
        </div>
      )}
    </div>
  );
}

export default Step1LifecycleDemo;
