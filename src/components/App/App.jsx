import "./App.css";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
import useForm from "../../hooks/useForm";
import { ProfileForm } from "../ProfileForm";

function App() {
  const loginData = useForm({});
  const registerData = useForm({});
  const profileData = useForm({});

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === "login") {
      console.log(`Данные авторизации`, loginData.formData);
    } else if (formType === "register") {
      e.preventDefault();
      console.log(`Данные Регистрации`, registerData.formData);
    } else if (formType === "") {
      e.preventDefault();
      console.log(`Иные данные`, profileData.formData);
    }
  };

  return (
    <div>
      <h1>Авторизация</h1>
      <LoginForm
        {...loginData}
        handleSubmit={(e) => {
          handleSubmit(e, "login");
        }}
      />
      <h1>Регистрация</h1>
      <RegisterForm
        {...registerData}
        handleSubmit={(e) => {
          handleSubmit(e, "register");
        }}
      />
      <h1>Профиль</h1>
      <ProfileForm
        {...profileData}
        handleSubmit={(e) => {
          handleSubmit(e, "");
        }}
      />
    </div>
  );
}

export default App;
