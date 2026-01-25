import SignupForm from "./SignupForm";
import CustomForm from "./CustomForm";

const HomePage = () => (
  <>
    <h2>Простая форма (RHF)</h2>
    <SignupForm />
    <hr />
    <h2>Сложная форма (Custom Components)</h2>
    <CustomForm />
  </>
);

export default HomePage;
