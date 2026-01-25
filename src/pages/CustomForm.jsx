import { useForm } from "react-hook-form";
import Input from "../components/CustomForms/Input";
import Select from "../components/CustomForms/Select";
import Checkbox from "../components/CustomForms/Checkbox";
import Textarea from "../components/CustomForms/Textarea";
import "./CustomForm.css";

const CustomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("Custom Form Data:", data);

  return (
    <form className="custom-form" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Имя"
        error={errors.userName}
        {...register("userName", {
          required: "Имя обязательно",
          minLength: { value: 3, message: "Минимум 3 символа" },
        })}
      />

      <Select
        label="Пол"
        options={["Мужской", "Женский"]}
        error={errors.gender}
        {...register("gender", { required: "Выберите пол" })}
      />

      <Textarea
        label="О себе"
        error={errors.about}
        {...register("about", {
          maxLength: { value: 200, message: "Максимум 200 символов" },
        })}
      />

      <Checkbox
        label="Согласен с условиями"
        error={errors.agree}
        {...register("agree", { required: "Нужно ваше согласие" })}
      />

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default CustomForm;
