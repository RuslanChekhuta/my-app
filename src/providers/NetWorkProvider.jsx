import { useCallback, useEffect, useRef, useState } from "react";
import { NetWorkContext } from "../context/NetWorkContext";

const getInitialNetworkStatus = () => {
  const isOnline = typeof navigator === "undefined" ? true : navigator.onLine;

  return {
    isOnline,
    showNotification: !isOnline,
    message: isOnline
      ? ""
      : "Нет подключения к интернету. Показаны локальные данные.",
    variant: isOnline ? "info" : "error",
  };
};

const NetWorkProvider = ({ children }) => {
  const [networkStatus, setNetworkStatus] = useState(getInitialNetworkStatus);
  const hideTimeoutRef = useRef(null);

  const clearHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const showNotification = useCallback(
    ({
      message,
      variant = "info",
      isOnline = networkStatus.isOnline,
      autoHide = false,
      duration = 3000,
    }) => {
      clearHideTimeout();

      setNetworkStatus({
        isOnline,
        showNotification: true,
        message,
        variant,
      });

      if (autoHide) {
        hideTimeoutRef.current = setTimeout(() => {
          setNetworkStatus((prev) => ({
            ...prev,
            showNotification: false,
          }));
          hideTimeoutRef.current = null;
        }, duration);
      }
    },
    [clearHideTimeout, networkStatus.isOnline]
  );

  const showOfflineMessage = useCallback(
    (
      message = "Нет подключения к интернету. Показаны локальные данные."
    ) => {
      showNotification({
        message,
        variant: "error",
        isOnline: false,
      });
    },
    [showNotification]
  );

  const showRequestError = useCallback(
    (message = "Не удалось выполнить запрос. Попробуйте ещё раз.") => {
      showNotification({
        message,
        variant: "error",
        autoHide: true,
        duration: 4000,
      });
    },
    [showNotification]
  );

  useEffect(() => {
    const handleOnline = () => {
      showNotification({
        message: "Соединение восстановлено",
        variant: "success",
        isOnline: true,
        autoHide: true,
      });
    };

    const handleOffline = () => {
      showOfflineMessage();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearHideTimeout();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [clearHideTimeout, showNotification, showOfflineMessage]);

  return (
    <NetWorkContext.Provider
      value={{
        networkStatus,
        isOnline: networkStatus.isOnline,
        showOfflineMessage,
        showRequestError,
      }}
    >
      {children}
    </NetWorkContext.Provider>
  );
};

export default NetWorkProvider;
