import React, { useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";

function ParentComponent() {
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Состояние воспроизведения

  const handlePlay = () => {
    audioPlayerRef.current?.play();
  };

  const handlePause = () => {
    audioPlayerRef.current?.pause();
  };

  const handleSeekForward = () => {
    audioPlayerRef.current.seekForward(); // Перематываем на 30 секунд вперед
  };

  const handleSeekBack = () => {
    audioPlayerRef.current.seekBack(); // Перематываем на 30 секунд назад
  };

  const handleEnd = () => {
    setIsPlaying(false); // Устанавливаем состояние воспроизведения в false
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#121212",
        backgroundImage: isPlaying ? "url('/eq.gif')" : "none",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "300px",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <h1
        style={{
          color: "#eee",
        }}
      >
        Аудиоплеер
      </h1>
      <AudioPlayer
        ref={audioPlayerRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnd={handleEnd}
      />
      <button
        onClick={handlePlay}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Играть
      </button>
      <button
        onClick={handlePause}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Пауза
      </button>
      <button
        onClick={handleSeekForward}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Вперед на 30 сек
      </button>
      <button
        onClick={handleSeekBack}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Назад на 30 сек
      </button>
    </div>
  );
}

export default ParentComponent;
