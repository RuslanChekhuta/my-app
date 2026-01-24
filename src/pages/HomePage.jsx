import Button from "../components/Button";
import Header from "../components/Header";

const HomePage = () => {
  // TODO: Реализуйте логику здесь.

  const handleAction = (text) => {
    alert(text);
  };

  return (
    <>
      <Header />
      <div>
        Основной контент
        <Button
          label="Кликни чтобы увидеть alert"
          onClick={() => {
            handleAction("Привет из HomePage!");
          }}
          customStyle={{ backgroundColor: "orange", marginTop: "20px" }}
        />
      </div>
    </>
  );
};

export default HomePage;
