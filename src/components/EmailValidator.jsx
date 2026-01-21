const EmailValidator = () => {
  // TODO: Реализуйте логику здесь.

  const email = "ruslan@gmail.com";

  return (
    <div>
      {email ? (
        <h4>Email: {email}</h4>
      ) : (
        <h4 style={{ color: "red" }}>Email не указан</h4>
      )}
    </div>
  );
};

export default EmailValidator;
