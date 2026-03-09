import { useCallback, useEffect, useRef, useState } from "react";
import { NetworkContext } from "../context/NetworkContext";
import { useLocalization } from "../hooks/useLocalization";

const getInitialNetworkStatus = (t) => {
  const isOnline = typeof navigator === "undefined" ? true : navigator.onLine;

  return {
    isOnline,
    showNotification: !isOnline,
    message: isOnline ? "" : t("network.offline"),
    variant: isOnline ? "info" : "error",
  };
};

const NetworkProvider = ({ children }) => {
  const { t } = useLocalization();
  const [networkStatus, setNetworkStatus] = useState(() =>
    getInitialNetworkStatus(t)
  );
  const hideTimeoutRef = useRef(null);
  const translationRef = useRef(t);

  useEffect(() => {
    translationRef.current = t;
  }, [t]);

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
      isOnline = typeof navigator === "undefined" ? true : navigator.onLine,
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
    [clearHideTimeout]
  );

  const showOfflineMessage = useCallback(
    (message = translationRef.current("network.offline")) => {
      showNotification({
        message,
        variant: "error",
        isOnline: false,
      });
    },
    [showNotification]
  );

  const showRequestError = useCallback(
    (message = translationRef.current("network.requestError")) => {
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
    setNetworkStatus((previousState) => {
      if (!previousState.showNotification) {
        return previousState;
      }

      if (!previousState.isOnline) {
        return {
          ...previousState,
          message: t("network.offline"),
        };
      }

      if (previousState.variant === "success") {
        return {
          ...previousState,
          message: t("network.onlineRestored"),
        };
      }

      return previousState;
    });
  }, [t]);

  useEffect(() => {
    const handleOnline = () => {
      showNotification({
        message: translationRef.current("network.onlineRestored"),
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
