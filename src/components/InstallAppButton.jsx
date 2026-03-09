import { useState } from "react";
import {
  RiAlertLine,
  RiDownloadCloud2Line,
  RiShareForwardLine,
} from "react-icons/ri";
import { usePwaInstallPrompt } from "../hooks/usePwaInstallPrompt";
import { useLocalization } from "../hooks/useLocalization";
import Button from "./ui/Button";
import StatusMessage from "./ui/StatusMessage";

const InstallAppButton = () => {
  const { t } = useLocalization();
  const [showIosHelp, setShowIosHelp] = useState(false);
  const {
    isInstallAvailable,
    isStandalone,
    isIosSafari,
    isAndroid,
    isSecureContext,
    promptInstall,
  } = usePwaInstallPrompt();

  if (isStandalone) {
    return null;
  }

  if (isInstallAvailable) {
    return (
      <Button onClick={promptInstall} variant="secondary" size="md">
        <RiDownloadCloud2Line className="text-lg" />
        <span>{t("install.install")}</span>
      </Button>
    );
  }

  if (isAndroid) {
    return (
      <StatusMessage
        tone={isSecureContext ? "info" : "warning"}
        icon={<RiAlertLine className="text-lg" />}
        className="max-w-sm text-left"
      >
        {isSecureContext
          ? t("install.androidMenuHint")
          : t("install.androidSecureHint")}
      </StatusMessage>
    );
  }

  if (!isIosSafari) {
    return null;
  }

  return (
    <div className="flex max-w-full flex-col items-end gap-2">
      <Button
        onClick={() => setShowIosHelp((current) => !current)}
        variant="secondary"
        size="md"
      >
        <RiShareForwardLine className="text-lg" />
        <span>{t("install.howTo")}</span>
      </Button>

      {showIosHelp ? (
        <StatusMessage tone="info" className="max-w-xs text-left">
          {t("install.iosHint")}
        </StatusMessage>
      ) : null}
    </div>
  );
};

export default InstallAppButton;
