const WelcomeMessage = ({ isAuth }) => {
  // TODO: Реализуйте логику здесь.

  if (!isAuth) return null;
  return <h2>Добро пожаловать, Пользователь!</h2>;
};

export default WelcomeMessage;
