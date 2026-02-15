import { useRef, useState } from "react";

function Step3CustomVideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = async () => {
    // TODO Шаг 3:
    // 1) проверь videoRef.current
    // 2) если videoRef.current.paused === true -> вызови play() и setIsPlaying(true)
    // 3) иначе вызови pause() и setIsPlaying(false)
    // 4) после переключения проверь текст кнопки
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    if (videoElement.paused) {
      await videoElement.play();
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }
    videoElement.currentTime = 0;
  };

  return (
    <div>
      <p className="hint">
        Цель: управлять видео через DOM-методы play/pause с помощью ref.
      </p>
      <div className="demo-box stack">
        <video
          ref={videoRef}
          width="420"
          controls
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        />
        <div className="controls">
          <button onClick={handlePlayPause}>
            {isPlaying ? "Пауза" : "Плей"}
          </button>
          <button onClick={handleRestart}>С начала</button>
        </div>
      </div>
    </div>
  );
}

export default Step3CustomVideoPlayer;
