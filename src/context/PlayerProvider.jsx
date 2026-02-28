import { useState } from "react";
import { PlayerContext } from "./PlayerContext";

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const player = {
    isPlaying,
    togglePlay,
  };

  return (
    <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
  );
};
