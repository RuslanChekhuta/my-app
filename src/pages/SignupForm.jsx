import { useForm } from "react-hook-form";
import "./SignupForm.css";

const SignupForm = () => {
  // TODO: Реализуйте логику здесь.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="signup-container">
      <h2>Signup Form</h2>
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: "Имя обязательно" })}
          placeholder="Name"
        />
        {errors.name && <p className="error-msg">{errors.name.message}</p>}
        <input
          {...register("email", { required: "Email обязателен" })}
          placeholder="Email"
          type="email"
        />
        {errors.email && <p className="error-msg">{errors.email.message}</p>}

        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default SignupForm;
import "./SignupForm.css";
