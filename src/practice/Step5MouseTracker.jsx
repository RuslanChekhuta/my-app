import { useEffect, useState } from "react";

function Tracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // TODO Шаг 5:
    // 1) добавь window.addEventListener("mousemove", handler)
    // 2) в handler обновляй координаты в state и логируй x/y в консоль
    // 3) верни cleanup с window.removeEventListener("mousemove", handler)

    const handler = (e) => {
      const newCoords = { x: e.clientX, y: e.clientY };

      setPosition(newCoords);

      console.log(`Mouse Position: X: ${newCoords.x}, Y: ${newCoords.y}`);
    };

    window.addEventListener("mousemove", handler);

    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  return (
    <div className="demo-box">
      <p>
        Координаты мыши: x={position.x}, y={position.y}
      </p>
      <p>После скрытия блока логи mousemove должны прекратиться.</p>
    </div>
  );
}

function Step5MouseTracker() {
  const [showTracker, setShowTracker] = useState(true);

  return (
    <div>
      <p className="hint">
        Цель: закрепить addEventListener/removeEventListener на событии
        mousemove.
      </p>
      <button onClick={() => setShowTracker((prev) => !prev)}>
        {showTracker ? "Скрыть MouseTracker" : "Показать MouseTracker"}
      </button>
      {showTracker && <Tracker />}
    </div>
  );
}

export default Step5MouseTracker;
