import { useEffect } from "react";
import useApi from "../hooks/useApi";

const UserList = () => {
  const { data, loading, error, get } = useApi(
    "https://69a46855611ecf5bfc24dc66.mockapi.io/",
  );

  useEffect(() => {
    get("users");
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error.massage}</p>;
  }

  return (
    <div>
      <h1>Лист пользователей</h1>
      <ul>
        {data &&
          data.map((user) => (
            <li key={user.id}>
              {user.id}. Имя:{user.name} <br /> Наличие машины :
              {user.hasCar ? "есть" : "нету"}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
