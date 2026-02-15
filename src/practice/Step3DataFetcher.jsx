import { useEffect, useState } from "react";

function FetchExercise() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    // TODO Шаг 3:
    // 1) добавь локальный флаг isMounted = true
    // 2) перед началом запроса поставь setLoading(true)
    // 3) загрузи данные из jsonplaceholder posts с _limit=5
    // 4) вызывай setData/setLoading только когда isMounted === true
    // 5) в cleanup установи isMounted = false
    //
    // Дополнительно (по желанию): сделай вариант через AbortController.

    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
        );

        const result = await response.json();

        if (isMounted) setData(result);
      } catch (error) {
        if (isMounted) console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [requestKey]);

  return (
    <div className="demo-box">
      <button onClick={() => setRequestKey((prev) => prev + 1)}>
        Запросить снова
      </button>
      {loading && <p>Загрузка...</p>}
      {!loading && data.length === 0 && (
        <p>Пока нет данных. Нажми "Запросить снова".</p>
      )}
      {!loading && data.length > 0 && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Step3DataFetcher() {
  const [showFetcher, setShowFetcher] = useState(true);

  return (
    <div>
      <p className="hint">
        Цель: защитить обновление state, если компонент размонтировался до конца
        запроса.
      </p>
      <button onClick={() => setShowFetcher((prev) => !prev)}>
        {showFetcher ? "Скрыть блок запроса" : "Показать блок запроса"}
      </button>

      {!showFetcher && (
        <div className="demo-box">
          <p>Блок запроса размонтирован.</p>
        </div>
      )}
      {showFetcher && <FetchExercise />}
    </div>
  );
}

export default Step3DataFetcher;
