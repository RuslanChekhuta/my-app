import { useContext } from "react";
import { NetWorkContext } from "../context/NetWorkContext";

const Notification = () => {
  const { netWorkStatus } = useContext(NetWorkContext);

  const { isOnline, showNotification, message } = netWorkStatus;

  if (!showNotification) return null;

  return (
    <div
      className={`mt-2 p-2 rounded text-sm ${
        isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
