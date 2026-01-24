const UserProfile = ({ name, age, job, status }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <div class="card">
      <h2>{name}</h2>
      <p>{age}</p>
      <p>{job}</p>
      <p>{status}</p>
    </div>
  );
};

export default UserProfile;
