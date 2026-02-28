import { useState, useEffect, useCallback } from "react";

const UserSearch = ({ userId }) => {
  const [userData, setUserDada] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      console.log("Запрос данных пользователя....");

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const data = await response.json();

      setUserDada(data);

      console.log("Данные пользователя", data);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h2>Данные пользователя</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p color="red">{error}</p>}
      {userData && (
        <div>
          <p>{userData.name}</p>
          <p>{userData.email}</p>
          <p>{userData.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
