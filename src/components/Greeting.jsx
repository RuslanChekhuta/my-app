const Greeting = ({ isLoggedIn }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <>
      {isLoggedIn ? (
        <h3>С возвращением!</h3>
      ) : (
        <h3>Пожалуйста, войдите в систему.</h3>
      )}
    </>
  );
};

export default Greeting;
