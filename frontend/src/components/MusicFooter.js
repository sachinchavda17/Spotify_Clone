import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useAudio } from "../contexts/AudioContext.js";
import { secondsToHms } from "../containers/functionContainer.js";

const MusicFooter = () => {
  const {
    currentSong,
    currentTrack,
    isPlaying,
    volume,
    togglePlayPause,
    setAudioVolume,
    play,
    seekTo,
    progress,
    duration,
  } = useAudio();

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isLikedPopover, setIsLikedPopover] = useState(false);
  const [liked, setLiked] = useState(false); // For like toggle simulation

  const handleSeekChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    setAudioVolume(parseFloat(e.target.value));
  };

  const likeToggleFetch = async () => {
    // Simulate toggling like (update with actual API call if needed)
    setLiked(!liked);
  };

  const nextSongHandler = () => {
    console.log("Play next song");
    // Implement your next song logic here
  };

  const prevSongHandler = () => {
    console.log("Play previous song");
    // Implement your previous song logic here
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-app-black text-white px-4 py-3 z-50"
      tabIndex="0"
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center w-1/2 sm:w-1/4">
          <Link to={"/playedsong"}>
            <img
              src={currentSong?.thumbnail || "/placeholder.jpg"}
              alt="Song Cover"
              className="w-12 h-12 sm:w-16 sm:h-16 mr-4"
            />
          </Link>
          <div>
            <p className="">{currentSong?.name || "No Track"}</p>
            <p className="text-sm hidden sm:block">
              {currentSong?.artist?.firstName +
                " " +
                currentSong?.artist?.lastName || "Unknown Artist"}
            </p>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center space-x-4 flex-col w-1/4 sm:w-2/3">
          <div className="flex items-center space-x-4">
            <button onClick={prevSongHandler} className="pl-5">
              <Icon
                icon="bi:skip-backward"
                fontSize={25}
                className="cursor-pointer text-lightGray hover:text-white hidden sm:block"
              />
            </button>

            <button
              onClick={() => togglePlayPause(currentTrack)}
              className="text-3xl"
            >
              <Icon
                icon={
                  isPlaying
                    ? "ic:baseline-pause-circle"
                    : "ic:baseline-play-circle"
                }
                fontSize={50}
                className="cursor-pointer text-white"
              />
            </button>

            <button onClick={nextSongHandler}>
              <Icon
                icon="bi:skip-forward"
                fontSize={25}
                className="cursor-pointer text-lightGray hover:text-white hidden sm:block"
              />
            </button>
          </div>
          <div className="hidden sm:flex items-center justify-between space-x-4 w-full">
            <span className="w-12 text-sm">{secondsToHms(progress)}</span>
            <input
              type="range"
              value={(progress / duration) * 100 || 0}
              onChange={handleSeekChange}
              min="0"
              max="100"
              className="w-full cursor-pointer rounded appearance-none h-2 bg-gradient-to-r from-lightGray to-lightGray"
            />
            <span className="w-12 text-sm">{secondsToHms(duration)}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 w-1/4">
          <Icon
            icon="ic:round-playlist-add"
            fontSize={30}
            className="cursor-pointer text-lightGray hover:text-white hidden sm:block"
          />
          <div className="relative">
            <Icon
              onMouseEnter={() => setIsLikedPopover(true)}
              onMouseLeave={() => setIsLikedPopover(false)}
              icon={liked ? "ph:heart-fill" : "ph:heart-bold"}
              fontSize={25}
              className={`cursor-pointer ${
                liked ? "text-primary" : "text-lightGray hover:text-white"
              }`}
              onClick={likeToggleFetch}
            />
            {isLikedPopover && (
              <div className="absolute z-10 bottom-0 right-0 mb-8 mr-0 text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 text-lightGray border-darkGray-light bg-darkGray">
                <div className="px-3 py-2 border-b rounded-t-lg border-darkGray-light bg-darkGray-light">
                  <h3 className="font-semibold text-lightGray-light">
                    {liked ? "Liked" : "Not Liked"}
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onMouseEnter={() => setIsPopoverVisible(true)}
              onMouseLeave={() => setIsPopoverVisible(false)}
            >
              <Icon
                icon={volume === 0 ? "bi:volume-mute" : "bi:volume-up"}
                fontSize={25}
                className={`cursor-pointer ${
                  volume === 0
                    ? "text-lightGray"
                    : volume < 0.5
                    ? "text-lightGray-light"
                    : "text-white"
                } hover:text-gray-100 hidden sm:block`}
              />
            </button>

            {isPopoverVisible && (
              <div className="absolute z-10 bottom-0 right-0 mb-8 mr-0 text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 text-lightGray border-darkGray-light bg-darkGray">
                <div className="px-3 py-2 border-b rounded-t-lg border-darkGray-light bg-darkGray-light">
                  <h3 className="font-semibold text-lightGray-light">
                    {(volume * 100).toFixed(0)}%
                  </h3>
                </div>
              </div>
            )}
          </div>

          <input
            className="appearance-none h-2 rounded bg-lightGray hidden sm:block"
            type="range"
            value={volume}
            onChange={handleVolumeChange}
            min="0"
            max="1"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicFooter;
