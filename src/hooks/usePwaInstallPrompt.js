import { useEffect, useState } from "react";

const isStandaloneMode = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
};

const isIosSafariBrowser = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/i.test(userAgent);
  const isWebkit = /WebKit/i.test(userAgent);
  const isOtherIosBrowser = /CriOS|FxiOS|EdgiOS/i.test(userAgent);

  return isIos && isWebkit && !isOtherIosBrowser;
};

const isAndroidBrowser = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return /Android/i.test(window.navigator.userAgent);
};

const isSecureInstallContext = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const isLocalHost = ["localhost", "127.0.0.1", "[::1]"].includes(
    window.location.hostname
  );

  return window.isSecureContext || isLocalHost;
};

export const usePwaInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(isStandaloneMode);
  const [isIosSafari, setIsIosSafari] = useState(isIosSafariBrowser);
  const [isAndroid, setIsAndroid] = useState(isAndroidBrowser);
  const [isSecureContext, setIsSecureContext] = useState(isSecureInstallContext);

  useEffect(() => {
    setIsStandalone(isStandaloneMode());
    setIsIosSafari(isIosSafariBrowser());
    setIsAndroid(isAndroidBrowser());
    setIsSecureContext(isSecureInstallContext());

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      return false;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);

    return true;
  };

  return {
    isInstallAvailable: Boolean(deferredPrompt),
    isStandalone,
    isIosSafari,
    isAndroid,
    isSecureContext,
    promptInstall,
  };
};
