import { useState } from "react";
import "./RegForm.css";
import { isValidEmail, isValidPassword } from "./validators";

const RegForm = () => {
  // Состояния (Task 03)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Обработчик ввода (Task 04)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSuccess(false); // Сбрасываем статус успеха при изменении
  };

  // Сброс формы (Task 11)
  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      year: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  // Валидация и отправка (Task 08)
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Введите имя";
    if (!isValidEmail(formData.email)) newErrors.email = "Некорректный email";
    if (!isValidPassword(formData.password))
      newErrors.password =
        "Пароль слишком слабый (нужны буквы, цифры и 6+ символов)";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";
    if (!formData.year) newErrors.year = "Выберите год рождения";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSuccess(true);
      console.log("Данные формы:", formData);
    }
  };

  // Генерация годов (Task 06)
  const years = Array.from(
    { length: 2024 - 1950 + 1 },
    (_, i) => 1950 + i,
  ).reverse();

  return (
    <div className="reg-form">
      {/* Сообщение об успехе (Task 12) */}
      {isSuccess && (
        <div className="success-message">Регистрация прошла успешно!</div>
      )}

      <h2>Регистрация</h2>

      <form onSubmit={handleSubmit} onReset={handleReset}>
        {/* Поле Name */}
        <input
          className={errors.name ? "error-border" : ""}
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}

        {/* Поле Email */}
        <input
          className={errors.email ? "error-border" : ""}
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}

        {/* Поле Password */}
        <input
          className={errors.password ? "error-border" : ""}
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}

        {/* Поле Confirm Password */}
        <input
          className={errors.confirmPassword ? "error-border" : ""}
          type="password"
          name="confirmPassword"
          placeholder="Подтвердите пароль"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {/* Подсказка совпадения паролей (Task 07) */}
        {formData.confirmPassword &&
          (formData.password === formData.confirmPassword ? (
            <span className="match-success">Пароли совпадают</span>
          ) : (
            <span className="match-error">Пароли не совпадают</span>
          ))}
        {errors.confirmPassword && (
          <span className="error-text">{errors.confirmPassword}</span>
        )}

        {/* Селект года (Task 06) */}
        <select
          className={errors.year ? "error-border" : ""}
          name="year"
          value={formData.year}
          onChange={handleChange}
        >
          <option value="">Выберите год</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        {errors.year && <span className="error-text">{errors.year}</span>}

        {/* Кнопки (Task 11) */}
        <button type="submit">Зарегистрироваться</button>
        <button type="reset">Очистить</button>
      </form>
    </div>
  );
};

export default RegForm;
