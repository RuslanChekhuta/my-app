import { useContext } from "react";
import { NetWorkContext } from "../context/NetWorkContext";

export const useNetworkStatus = () => {
  const context = useContext(NetWorkContext);

  if (!context) {
    throw new Error(
      "useNetworkStatus должен использоваться внутри NetWorkProvider"
    );
  }

  return context;
};
