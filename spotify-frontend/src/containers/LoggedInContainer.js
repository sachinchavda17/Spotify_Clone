import {
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import spotify_logo from "../images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContext";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import loggedInUser from "../contexts/logedInUser";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(cookie.token)); // Check if the user is logged in
  // const { userFirstName } = useContext(loggedInUser);
  const handleLogout = () => {
    removeCookie("token");
    // Update the login status to false
    setIsLoggedIn(false);
  };

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const handleTimeUpdate = () => {
    if (soundPlayed) {
      const newCurrentTime =
        (soundPlayed.seek() / soundPlayed.duration()) * 100;
      setCurrentSong((prevSong) => ({
        ...prevSong,
        currentTime: newCurrentTime,
      }));
      console.log("currentTime", newCurrentTime);
    }
  };

  const handleSeekBarClick = (e) => {
    if (soundPlayed) {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = (offsetX / rect.width) * soundPlayed.duration();
      soundPlayed.seek(newTime);
      setCurrentSong((prevSong) => ({
        ...prevSong,
        currentTime: (newTime / soundPlayed.duration()) * 100,
      }));
    }
  };

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    // the following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };
  // useEffect(() => {
  //   if (soundPlayed) {
  //     soundPlayed.on("end", () => {
  //       // Logic to handle song end
  //       // For example, you may want to play the next song in the playlist.
  //       // Or you can reset the player state.
  //       // setCurrentSong(null);
  //       // setSoundPlayed(null);
  //       // setIsPaused(false);
  //     });

  //     soundPlayed.on("play", () => {
  //       // Logic to handle song play
  //       // For example, you can update UI to indicate that the song is playing.
  //       // You can also start updating the seek bar circle position.
  //     });

  //     soundPlayed.on("pause", () => {
  //       // Logic to handle song pause
  //       // For example, you can update UI to indicate that the song is paused.
  //       // You can also stop updating the seek bar circle position.
  //     });

  //     soundPlayed.on("stop", () => {
  //       // Logic to handle song stop
  //       // For example, you can update UI to indicate that the song has stopped.
  //       // You can also reset the player state.
  //       // setCurrentSong(null);
  //       // setSoundPlayed(null);
  //       // setIsPaused(false);
  //     });

  //     soundPlayed.on("seek", () => {
  //       // Logic to handle song seek
  //       handleTimeUpdate();
  //     });
  //   }
  // }, [soundPlayed]);
  
  return (
    <div className="h-full w-full bg-black">
      <div className={`${currentSong ? "h-[75vh]" : "h-full"} w-full flex`}>
        {/* This first div will be the left panel */}
        <div
          style={{ width: "20vw", height: currentSong ? "75vh" : "100vh" }}
          className="bg-black flex flex-col justify-between pb-10 md:w-1/4 lg:w-1/5"
        >
          <div>
            {/* This div is for logo */}
            <div className="logoDiv p-6 bg-app-black m-2 rounded">
              <Link to="/home">
                <img src={spotify_logo} alt="spotify logo" width={125} />
              </Link>
            </div>
            <div className="py-5 bg-app-black m-2 rounded">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                targetLink={"/"}
                active={curActiveScreen === "home"}
              />
              <IconText
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
                active={curActiveScreen === "search"}
                targetLink={"/search"}
              />
              <IconText
                iconName={"icomoon-free:books"}
                displayText={"Library"}
                active={curActiveScreen === "library"}
                targetLink={"/library"}
              />
              {isLoggedIn && (
                <IconText
                  iconName={"material-symbols:library-music-sharp"}
                  displayText={"My Music"}
                  targetLink="/myMusic"
                  active={curActiveScreen === "myMusic"}
                />
              )}
            </div>
            {isLoggedIn && (
              <div className="py-5 bg-app-black m-2 rounded">
                <IconText
                  iconName={"material-symbols:add-box"}
                  displayText={"Create Playlist"}
                  targetLink={"/createplaylist"}
                />
                <IconText
                  iconName={"mdi:cards-heart"}
                  displayText={"Liked Songs"}
                  targetLink={"/likedsong"}
                />
              </div>
            )}
          </div>
          <div className="px-5">
            <div className="border border-gray-300 hover:border-white text-gray-300 hover:text-white  w-2/5 flex px-2 py-1 rounded-full items-center justify-center cursor-pointer">
              <div className="w-full">
                <Icon icon="mingcute:earth-line" />
              </div>
              <div className="ml-1 mr-1  text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        {/* This second div will be the right part(main content) */}
        <div
          style={{ width: "80vw", height: currentSong ? "85vh" : "100vh" }}
          className=" overflow-auto bg-app-black rounded  w-full md:w-3/4 lg:w-4/5"
        >
          <div className="navbar px-8  py-3 w-full h-1/10  bg-black bg-opacity-40 rounded flex items-center justify-end overflow-hidden">
            <div className="w-full flex justify-between h-full pr-4 ">
              <div className="flex justify-around items-center">
                <div className="text-2xl">
                  <Icon icon="mingcute:left-fill" color="white" />
                </div>
                <div className="text-2xl">
                  <Icon icon="mingcute:right-fill" color="white" />
                </div>
              </div>
              <div className={`flex justify-end h-full items-center`}>
                {isLoggedIn ? (
                  <div className="px-3">
                    <Link to="/uploadsong">
                      <TextWithHover displayText={"Upload Song"} />
                    </Link>
                  </div>
                ) : (
                  <div className="px-3">
                    <Link to="/signup">
                      <TextWithHover displayText={"Signup"} />
                    </Link>
                  </div>
                )}
                <div className=" toogle-login-logout bg-gray-500 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  <div className=" flex justify-around h-full items-center">
                    {isLoggedIn ? (
                      <div
                        className="bg-gray-500 text-white  px-4 py-2  flex items-center justify-center rounded-full font-semibold cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    ) : (
                      <Link to="/login">
                        <div className="text-sm text-white bg-gray-500  px-4 py-2 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                          LOGIN
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" relative content p-8 pt-0 overflow-auto ">
            {children}
          </div>
        </div>
      </div>
      {/* This div is the current playing song */}
      {currentSong && (
        <div
          style={{ height: "15vh" }}
          className="w-full bg-app-black  text-white flex items-center px-4 z-10 overflow-hidden"
        >
          <div className="w-1/4  h-full flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbail"
              className="h-14 w-14 rounded p-1"
            />
            <div className="pl-4">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex justify-center  flex-col items-center">
            <div className="flex h-1/2 w-1/3 justify-between items-center">
              {/* controls for the playing song go here */}
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="mdi:skip-previous-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={50}
                className={`cursor-pointer text-white   `}
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="ic:twotone-repeat"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            {/* <div>Progress Bar Here</div> */}
            <div
              className="seekbar w-full h-1 mt-3 border border-1 rounded bg-white rounded cursor-pointer"
              onClick={(e) => handleSeekBarClick(e)}
            >
              <div
                onChange={handleTimeUpdate(currentSong.currentTime)}
                className="circle w-4 h-4 bottom-1.5  bg-white border rounded-full relative"
                style={{ left: `${currentSong.currentTime}%` }}
              ></div>
            </div>
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
            <Icon
              icon="ph:heart-bold"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
