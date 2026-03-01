import React, { useImperativeHandle, useRef } from "react";

const AudioPlayer = ({ ref, src, onEnd, onPlay, onPause }) => {
  const audioRef = useRef(null);

  // Раскрываем методы через useImperativeHandle
  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
    seekForward: () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime; // Текущее время воспроизведения
        audioRef.current.currentTime = currentTime + 30; // Перематываем на 30 секунд вперед
      }
    },
    seekBack: () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime; // Текущее время воспроизведения
        audioRef.current.currentTime = currentTime - 30; // Перематываем на 30 секунд назад
      }
    },
  }));

  return (
    <div>
      <audio
        ref={audioRef}
        src={src}
        controls
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnd}
      >
        Ваш браузер не поддерживает аудиоэлемент.
      </audio>
    </div>
  );
};

export default AudioPlayer;
