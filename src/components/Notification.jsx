import {
  RiCheckLine,
  RiErrorWarningLine,
  RiInformationLine,
} from "react-icons/ri";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

const Notification = () => {
  const { networkStatus } = useNetworkStatus();

  const { showNotification, message, variant } = networkStatus;

  if (!showNotification) return null;

  const variantClasses = {
    error:
      "border-[rgba(181,38,54,0.18)] bg-[rgba(255,255,255,0.82)] text-[#8f1f2d] dark:border-[rgba(255,115,141,0.2)] dark:bg-slate-950/90 dark:text-[#ffb1be]",
    success:
      "border-[rgba(21,119,128,0.18)] bg-[rgba(255,255,255,0.82)] text-[#0e6971] dark:border-[rgba(84,205,208,0.2)] dark:bg-slate-950/90 dark:text-[#8be4e6]",
    info:
      "border-slate-200 bg-[rgba(255,255,255,0.82)] text-slate-700 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100",
  };

  const icons = {
    error: <RiErrorWarningLine className="text-lg" />,
    success: <RiCheckLine className="text-lg" />,
    info: <RiInformationLine className="text-lg" />,
  };

  return (
    <div
      className={`fixed top-4 right-4 left-4 z-50 mx-auto flex w-auto max-w-md items-start gap-3 rounded-[1.35rem] border px-4 py-3 text-sm shadow-[0_25px_55px_rgba(17,35,46,0.16)] backdrop-blur-xl sm:left-auto ${
        variantClasses[variant] ?? variantClasses.info
      }`}
    >
      <div className="mt-0.5">{icons[variant] ?? icons.info}</div>
      <div className="leading-6">{message}</div>
    </div>
  );
};

export default Notification;
