import { Link } from "react-router";
import { AppRoutes } from "../constants/AppRoutes";

const LoginPage = () => {
  return (
    <div>
      <h3>Форма входа</h3>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <button>Войти</button>
      </form>
      <p>
        Нет аккаунта?{""}
        <Link to={`${AppRoutes.AUTH}/${AppRoutes.REG}`}>Зарегистрируйтесь</Link>
        <br />
        <Link to="/">Вернуться на главную</Link>
      </p>
    </div>
  );
};

export default LoginPage;
