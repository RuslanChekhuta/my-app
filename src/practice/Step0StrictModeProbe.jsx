import { useEffect, useState } from "react";

function Probe() {
  useEffect(() => {
    // TODO Шаг 0:
    // 1) добавь console.log("Probe setup")
    // 2) верни cleanup с console.log("Probe cleanup")
    // 3) посмотри порядок логов в dev-режиме со StrictMode

    console.log("Probe setup");

    return () => {
      console.log("Probe cleanup");
    };
  }, []);

  return (
    <div className="demo-box">
      <p>Компонент Probe смонтирован.</p>
      <p>Открой консоль и анализируй порядок setup/cleanup логов.</p>
    </div>
  );
}

function Step0StrictModeProbe() {
  const [showProbe, setShowProbe] = useState(true);

  return (
    <div>
      <p className="hint">
        Цель: увидеть дополнительный цикл setup/cleanup в development из-за
        StrictMode.
      </p>
      <button onClick={() => setShowProbe((prev) => !prev)}>
        {showProbe ? "Скрыть Probe" : "Показать Probe"}
      </button>
      {showProbe && <Probe />}
    </div>
  );
}

export default Step0StrictModeProbe;
