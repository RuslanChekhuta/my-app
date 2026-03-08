import { useContext } from "react";
import { NetworkContext } from "../context/NetworkContext";

export const useNetworkStatus = () => {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error(
      "useNetworkStatus должен использоваться внутри NetworkProvider"
    );
  }

  return context;
};
