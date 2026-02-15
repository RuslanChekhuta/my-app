import { useRef } from "react";

function Step1RefFocus() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // TODO Шаг 1:
    // 1) проверь, что inputRef.current существует
    // 2) вызови inputRef.current.focus()
    // 3) добавь console.log("Render Step1RefFocus") в тело компонента
    //    и проверь, что ввод в неуправляемый input не вызывает лишний ререндер

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  console.log("Render Step1RefFocus");
  return (
    <div>
      <p className="hint">
        Цель: получить доступ к DOM-элементу input через ref и поставить фокус
        по кнопке.
      </p>
      <div className="controls">
        <input ref={inputRef} type="text" placeholder="Введите текст" />
        <button onClick={focusInput}>Фокус на поле ввода</button>
      </div>
    </div>
  );
}

export default Step1RefFocus;
