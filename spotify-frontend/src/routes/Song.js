import React, { useState, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const storedSong = localStorage.getItem('currentSong');
    if (storedSong) {
      setCurrentSong(JSON.parse(storedSong));
    }

    const storedVolume = localStorage.getItem('volume');
    if (storedVolume) {
      setVolume(Number(storedVolume));
    }
  }, []);

  useEffect(() => {
    if (currentSong) {
      localStorage.setItem('currentSong', JSON.stringify(currentSong));
    }
  }, [currentSong]);

  useEffect(() => {
    localStorage.setItem('volume', volume);
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Music Player</h1>
      {currentSong && (
        <div>
          <h2 className="text-xl font-semibold mb-2">{currentSong.title}</h2>
          <audio
            controls
            src={currentSong.url}
            onTimeUpdate={handleTimeUpdate}
            autoPlay={isPlaying}
            className="w-full"
          />
          <p className="text-sm mt-2">Current Time: {currentTime.toFixed(2)}</p>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full mt-2"
          />
        </div>
      )}
      <button
        onClick={handlePlayPause}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default MusicPlayer;
