const UserProfile = ({ user }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <>
      {!user && <div className="warning">Профиль не найден</div>}{" "}
      {user && (
        <div>
          <p>Имя: {user.name}</p>
          {user.age > 18 && <p>Возраст: {user.age}</p>}
        </div>
      )}
    </>
  );
};

export default UserProfile;
