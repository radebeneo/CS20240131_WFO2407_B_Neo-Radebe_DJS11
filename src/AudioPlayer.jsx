import React, { useState, useRef } from 'react';

function AudioPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-900 text-white">
      <audio ref={audioRef} onTimeUpdate={updateProgress} src={src} />
      <div className="flex items-center justify-between">
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="w-full mx-4 bg-gray-600 h-2">
          <div className="bg-blue-500 h-2" style={{ width: `${progress}%` }} />
        </div>
        <span>{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

export default AudioPlayer;
