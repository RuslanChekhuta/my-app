import { v4 as uuidv4 } from "uuid";

const UserList = () => {
  const users = [
    { id: uuidv4(), name: "Иван", role: "Admin" },
    { id: uuidv4(), name: "Мария", role: "Editor" },
    { id: uuidv4(), name: "Петр", role: "Viewer" },
  ];

  // TODO: Реализуйте логику здесь.
  return (
    <div className="card">
      <ul>
        {users.map(({ name, role, id }) => (
          <li className="list-item" key={id}>
            <h3>{name}</h3>
            <p>Role: {role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
