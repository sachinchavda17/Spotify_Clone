import React, { useState, Fragment, useContext, useEffect } from "react";
import IconText from "../components/shared/IconText";
import spotify_logo from "../images/spotify_logo_white.svg";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Icon } from "@iconify/react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import songContext from "../contexts/songContext";
import MusicFooter from "../components/shared/MusicFooter";

const NewHome = ({ children, curActiveScreen }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(cookie?.token));
  const handleLogout = () => {
    removeCookie("token");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentSong(null);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        setUserData(user);
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="bg-black w-full h-full">
      <nav className="fixed top-0 z-50 w-full text-white border-b border-gray-200 bg-app-black border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="rgba(5, 150, 105, 1)"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <Link to="/home" className="flex ms-2 md:me-24">
                <img src={spotify_logo} alt="spotify logo" width={125} />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <Menu as="div" className="relative ml-3">
                  <div>
                    {isLoggedIn ? (
                      <Menu.Button className="flex max-w-xs items-center rounded-lg bg-gray-600 text-sm  ">
                        <span className="sr-only">Open user menu</span>
                        <div className="bg-green-700 text-white p-2 cursor-pointer flex items-center rounded-lg">
                          <div className="mr-2 overflow-hidden rounded-md">
                            <Icon
                              icon="ep:user-filled"
                              width={"23"}
                              color="black"
                            />
                          </div>
                          <div className="mr-2 text-sm capitalize text-black">
                            {isLoggedIn && userData.firstName}
                          </div>
                          <div>
                            <Icon
                              icon="mingcute:down-fill"
                              width={"20"}
                              color="black"
                            />
                          </div>
                        </div>
                      </Menu.Button>
                    ) : (
                      <Link to="/login">
                        <div className="text-sm text-white bg-green-600  px-4 py-2 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                          LOGIN
                        </div>
                      </Link>
                    )}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        <Link
                          to={"/profile"}
                          className={
                            "bg-gray-100 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          }
                        >
                          Profile
                        </Link>
                        <Link
                          to={"/uploadSong"}
                          className={
                            "bg-gray-100 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          }
                        >
                          Upload Song
                        </Link>
                        <div
                          onClick={handleLogout}
                          className={
                            "bg-gray-100 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                          }
                        >
                          Logout
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <aside
          style={{ height: currentSong && "84vh" }}
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64  pt-20 h-full transition-transform -translate-x-full   sm:translate-x-0  bg-black overflow-auto  "
          aria-label="Sidebar"
        >
          <div className="h-full  pb-4 overflow-y-auto ">
            <div className="py-5 px-3 bg-app-black m-2 rounded">
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
              <div className="py-5 px-3 bg-app-black m-2 rounded">
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
        </aside>

        <div className="p-8 bg-app-black rounded-lg  sm:ml-64  bg-app-black mt-14  overflow-auto ">
          {children}
        </div>
      </div>
      {/* <div className="sm:ml-64 relative content p-8 pt-0 mt-14 bg-app-black overflow-auto ">
        {children}
      </div> */}
      {/* This div is the current playing song */}
      {currentSong ? <MusicFooter /> : null}
    </div>
  );
};

export default NewHome;
