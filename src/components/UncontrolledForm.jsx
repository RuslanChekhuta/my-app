import { useRef } from "react";

const UncontrolledForm = () => {
  // TODO: Реализуйте логику здесь.

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    value.length < 5 ? alert("Too short!") : alert("Success: " + value);
  };

  return (
    <div className="form-container">
      <h3>Uncontrolled Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit" style={{ marginBottom: "10px" }}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
