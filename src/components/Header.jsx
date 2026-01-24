import Button from "./Button";

const Header = () => {
  // TODO: Реализуйте логику здесь.
  return (
    <header className="header">
      <h1>React Props Lesson</h1>
      <Button
        label="Вход"
        customStyle={{ backgroundColor: "#4CAF50", color: "white" }}
      />

      <Button
        label="Регистрация"
        customStyle={{ backgroundColor: "#2196F3", color: "white" }}
      />
    </header>
  );
};

export default Header;
