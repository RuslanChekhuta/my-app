import { useNetworkStatus } from "../hooks/useNetworkStatus";

const Notification = () => {
  const { networkStatus } = useNetworkStatus();

  const { showNotification, message, variant } = networkStatus;

  if (!showNotification) return null;

  const variantClasses = {
    error: "bg-red-100 text-red-800 border-red-200",
    success: "bg-green-100 text-green-800 border-green-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm rounded-lg border px-4 py-3 text-sm shadow-lg ${
        variantClasses[variant] ?? variantClasses.info
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
