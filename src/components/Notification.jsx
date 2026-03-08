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
      className="motion-slide-down fixed top-4 right-4 left-4 z-50 mx-auto w-auto max-w-md shadow-[0_25px_55px_rgba(17,35,46,0.16)] sm:left-auto"
    >
      {message}
    </StatusMessage>
  );
};

export default Notification;
