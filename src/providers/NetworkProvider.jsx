import { useCallback, useEffect, useRef, useState } from "react";
import { NetworkContext } from "../context/NetworkContext";

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

const NetworkProvider = ({ children }) => {
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

  const showInfoMessage = useCallback(
    (message) => {
      showNotification({
        message,
        variant: "info",
        autoHide: true,
      });
    },
    [showNotification]
  );

  const showSuccessMessage = useCallback(
    (message) => {
      showNotification({
        message,
        variant: "success",
        autoHide: true,
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
    <NetworkContext.Provider
      value={{
        networkStatus,
        isOnline: networkStatus.isOnline,
        showOfflineMessage,
        showRequestError,
        showInfoMessage,
        showSuccessMessage,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkProvider;
