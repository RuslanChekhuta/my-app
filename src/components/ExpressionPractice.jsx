const ExpressionPractice = () => {
  // TODO: Реализуйте логику здесь.

  const name = "Ruslan";

  const age = 35;

  const imgUrl = "https://placehold.co/100";

  return (
    <div>
      <h2>Привет, {name}!</h2>
      <p>В следующем году вам будет {age + 1}</p>
      <img src={imgUrl} alt="avatar" />
    </div>
  );
};

export default ExpressionPractice;
