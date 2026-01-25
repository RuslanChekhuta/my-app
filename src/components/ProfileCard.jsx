const ProfileCard = ({ name, role, age, status }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <div className="Profile-card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Age: {age}</p>
      <p>
        Status: <strong>{status}</strong>
      </p>
    </div>
  );
};

export default ProfileCard;
