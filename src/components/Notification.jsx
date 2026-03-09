import {
  RiCheckLine,
  RiErrorWarningLine,
  RiInformationLine,
} from "react-icons/ri";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import StatusMessage from "./ui/StatusMessage";

const Notification = () => {
  const { networkStatus } = useNetworkStatus();

  const { showNotification, message, variant } = networkStatus;

  if (!showNotification) return null;

  const icons = {
    error: <RiErrorWarningLine className="text-lg" />,
    success: <RiCheckLine className="text-lg" />,
    info: <RiInformationLine className="text-lg" />,
  };

  return (
    <StatusMessage
      tone={variant ?? "info"}
      icon={icons[variant] ?? icons.info}
      className="motion-slide-down fixed top-3 right-3 left-3 z-50 mx-auto w-auto max-w-none shadow-[0_25px_55px_rgba(17,35,46,0.16)] sm:top-4 sm:right-4 sm:left-auto sm:max-w-md"
    >
      {message}
    </StatusMessage>
  );
};

export default Notification;
