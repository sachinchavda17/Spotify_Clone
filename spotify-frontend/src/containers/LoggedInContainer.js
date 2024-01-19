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
import MusicFooter from "../components/shared/MusicFooter";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(cookie.token));
  
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    removeCookie("token");
    setIsLoggedIn(false);
    setCurrentSong(null);
  };

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
  }, [currentSong && currentSong.track]);

  return (
    <div className="h-full w-full bg-black">
      <div className={`${currentSong ? "h-[85vh]" : "h-full"} w-full flex`}>
        {/* This first div will be the left panel */}
        <div
          style={{ width: "20vw", height: currentSong ? "75vh" : "100vh" }}
          className="bg-black overflow-y-auto  flex flex-col justify-between pb-10 md:w-1/4 lg:w-1/5"
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
                iconName={"icomoon-free:book"}
                displayText={"Responsive"}
                active={curActiveScreen === "responsive"}
                targetLink={"/res"}
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
          <div className="navbar  px-8  py-3 w-full h-1/10  bg-black bg-opacity-40 rounded flex items-center justify-end overflow-hidden">
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
                        className="bg-green-600 text-white  px-4 py-2  flex items-center justify-center rounded-full font-semibold cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    ) : (
                      <Link to="/login">
                        <div className="text-sm text-white bg-green-600  px-4 py-2 flex items-center justify-center rounded-full font-semibold cursor-pointer">
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
      {currentSong &&  <MusicFooter /> }
    </div>
  );
};

export default LoggedInContainer;
