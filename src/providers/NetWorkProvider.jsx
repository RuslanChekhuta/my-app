import React, { useEffect, useState } from "react";
import { NetWorkContext } from "../context/NetWorkContext";

const NetWorkProvider = ({ children }) => {
  const [netWorkStatus, setNetWorkStatus] = useState({
    isOnline: navigator.onLine,
    howNotification: false,
    message: "",
  });

  useEffect(() => {
    const handleOnline = () => {
      setNetWorkStatus({
        isOnline: true,
        showNotification: true,
        message: "Соединение восстановлено",
      });
      setTimeout(() => {
        setNetWorkStatus((prev) => ({
          ...prev,
          showNotification: false,
        }));
      }, 3000);
    };

    const handleOffline = () => {
      setNetWorkStatus({
        isOnline: false,
        showNotification: true,
        message: "Отсутствует подключение к интернету",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <NetWorkContext.Provider value={{ netWorkStatus }}>
      {children}
    </NetWorkContext.Provider>
  );
};

export default NetWorkProvider;
