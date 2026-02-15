import { useRef } from "react";
import "./Step4RefComponentEffect.css";

function Step4RefComponentEffect() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // TODO Шаг 4:
    // 1) через ref поставь фокус на input по клику
    // 2) проверь, что label анимируется через CSS
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <p className="hint">
        Цель: связать императивный фокус из JS и анимацию label через CSS.
      </p>
      <div className="floating-container">
        <input
          ref={inputRef}
          type="text"
          placeholder=" "
          className="floating-input"
        />
        <label className="floating-label">Введите текст</label>
      </div>
      <button onClick={focusInput}>Ввести</button>
    </div>
  );
}

export default Step4RefComponentEffect;
