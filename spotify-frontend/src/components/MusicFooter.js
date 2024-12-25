import React, { useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import songContext from "../contexts/songContext.js";
import { secondsToHms } from "../containers/functionContainer.js";
import { makeGETRequest } from "../utils/serverHelpers.js";

const MusicFooter = () => {
  const {
    isPaused,
    setIsPaused,
    volume,
    setVolume,
    seek,
    setSeek,
    currentSong,
    soundPlayed,
    setSoundPlayed,
  } = useContext(songContext);

  const soundRef = useRef(null);
  const [liked, setLiked] = useState(null);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isLikedPopover, setIsLikedPopover] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser "));
  const userId = currentUser?._id;
  const songId = currentSong?._id;

  const fetchLikedStatus = async () => {
    try {
      const response = await makeGETRequest(`/song/liked/${userId}/${songId}`);
      const likedStatus =
        response?.liked !== undefined ? response.liked : false;
      setLiked(likedStatus);
    } catch (err) {
      console.error("Error fetching liked status:", err);
      setLiked(false);
    }
  };

  const likeToggleFetch = async () => {
    try {
      const response = await makeGETRequest(`/song/like/${userId}/${songId}`);
      setLiked(response.msg);
    } catch (err) {
      console.error("Error toggling like:", err);
      setLiked("Error toggling like");
    }
  };

  useEffect(() => {
    if (currentSong) {
      fetchLikedStatus();
      setSoundPlayed(currentSong.track); // Set soundPlayed when currentSong changes
    }
  }, [currentSong, userId, songId]);

  useEffect(() => {
    const sound = new Howl({
      src: [soundPlayed],
      volume: volume,
      html5: true,
      loop: true,
      onend: () => {
        setIsPaused(true);
        console.log("Song Ended");
      },
      onpause: () => {
        setIsPaused(true);
        console.log("Song Paused");
      },
      onplay: () => {
        setInterval(() => {
          setSeek(soundRef.current.seek());
        }, 100);
        setIsPaused(false);
        console.log("Song Played");
      },
      onstop: () => {
        setIsPaused(true);
        setSeek(0);
        console.log("Song Stopped");
      },
    });

    soundRef.current = sound;
    sound.play();

    return () => {
      sound.unload();
    };
  }, [soundPlayed, volume]);

  const playPauseHandler = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      if (isPaused) {
        soundRef.current.play();
      } else {
        soundRef.current.pause();
      }
      setIsPaused(!isPaused);
    } else if (e.type === "click") {
      if (isPaused) {
        soundRef.current.play();
      } else {
        soundRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const nextSongHandler = () => {
    // Logic for playing the next song
    console.log("Click on Next Song");
  };

  const prevSongHandler = () => {
    // Logic for playing the previous song
    console.log("Click on Previous Song");
  };

  const muteHandler = () => {
    const newVolume = volume === 0 ? 1 : 0;
    setVolume(newVolume);
    soundRef.current.volume(newVolume);
  };

  const volumeChangeHandler = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundRef.current.volume(newVolume);
  };

  const seekChangeHandler = (e) => {
    const newSeek = parseFloat(e.target.value);
    setSeek(newSeek);
    soundRef.current.seek(newSeek);
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-darkGray text-white px-4 py-1 z-100"
      tabIndex="0"
      onKeyDown={(e) => playPauseHandler(e)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/2 sm:w-1/4">
          <Link to={"/playedsong"}>
            <img
              src={currentSong.thumbnail}
              alt="Song Cover"
              className="w-12 h-12 sm:w-16 sm:h-16 mr-4"
            />
          </Link>
          <div>
            <p className="text-sm">{currentSong.name}</p>
            <p className="hidden sm:block">
              {currentSong.artist.firstName + " " + currentSong.artist.lastName}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 flex-col w-1/4 sm:w-2/3">
          <div className="flex items-center space-x-4">
            <button onClick={prevSongHandler} className="pl-5">
              <Icon
                icon="bi:skip-backward"
                fontSize={25}
                className="cursor-pointer text-lightGray hover:text-white hidden sm:block"
              />
            </button>

            <button onClick={(e) => playPauseHandler(e)} className="text-3xl">
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
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
          <div className="hidden sm:flex items-center justify-between space-x-4 w-2/3">
            <span className="w-1/9">{secondsToHms(seek)}</span>
            <input
              type="range"
              value={seek}
              onChange={(e) => seekChangeHandler(e)}
              min="0"
              max={soundRef.current?.duration() || 0}
              className="w-full cursor-pointer rounded appearance-none h-2 bg-gradient-to-r from-lightGray to-lightGray"
            />
            <span className="w-1/9">
              {secondsToHms(soundRef.current?.duration() || 0)}
            </span>
          </div>
        </div>
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
                liked ? "text-green-500" : "text-lightGray hover:text-white"
              }`}
              onClick={likeToggleFetch}
            />
            {isLikedPopover && (
              <div className="absolute z-10 bottom-0 right-0 mb-8 mr-0 text-sm transition-opacity duration-300 border rounded-lg shadow-sm opacity-100 text-lightGray border-darkGray-light bg-darkGray">
                <div className="px-3 py-2 border-b rounded-t-lg border-dark Gray-light bg-darkGray-light">
                  <h3 className="font-semibold text-lightGray-light">
                    {liked ? "Like" : "Dislike"}
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={muteHandler}
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
            onChange={(e) => volumeChangeHandler(e)}
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
