const Header = ({ clicks, userName }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <header className="header">
      <h1>Dashboard</h1>
      <p>
        Пользователь: {userName} | Кликов: {clicks}
      </p>
    </header>
  );
};

export default Header;
