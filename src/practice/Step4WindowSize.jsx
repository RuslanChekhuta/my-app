import { useEffect, useState } from "react";

function ResizeProbe() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // TODO Шаг 4:
    // добавь cleanup, который удаляет resize-слушатель
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="demo-box">
      <p>
        Размер окна: {size.width} x {size.height}
      </p>
    </div>
  );
}

function Step4WindowSize() {
  const [showResizeProbe, setShowResizeProbe] = useState(true);

  return (
    <div>
      <p className="hint">
        Цель: добавить cleanup для resize-слушателя и избежать утечек памяти.
      </p>
      <button onClick={() => setShowResizeProbe((prev) => !prev)}>
        {showResizeProbe ? "Скрыть блок resize" : "Показать блок resize"}
      </button>
      {showResizeProbe && <ResizeProbe />}
      {!showResizeProbe && (
        <div className="demo-box">
          <p>Блок resize размонтирован.</p>
        </div>
      )}
    </div>
  );
}

export default Step4WindowSize;
