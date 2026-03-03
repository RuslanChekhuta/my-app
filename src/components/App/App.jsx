import { useId } from "react";
import "./App.css";

function App() {
  const id = useId();
  const emailId = `${useId()}-email`;
  return (
    <>
      <label htmlFor={emailId}>
        <p>Введите email</p>
      </label>
      <input type="text" id={emailId} />

      <label>
        <p>Согласен с условиями пользователя</p>
        <input type="checkbox" />
      </label>
      <br />
      <label htmlFor={id}>Введите пароль</label>
      <input type="password" id={id} />
    </>
  );
}

export default App;
