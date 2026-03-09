export const registerServiceWorker = () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return;
  }

  const isLocalHost = ["localhost", "127.0.0.1", "[::1]"].includes(
    window.location.hostname
  );
  const isSecureOrigin = window.isSecureContext || isLocalHost;

  if (!isSecureOrigin) {
    return;
  }

  const register = async () => {
    try {
      await navigator.serviceWorker.register("/service-worker.js");
    } catch (error) {
      console.error("Не удалось зарегистрировать service worker:", error);
    }
  };

  if (document.readyState === "complete") {
    void register();
    return;
  }

  window.addEventListener("load", () => {
    void register();
  });
};
