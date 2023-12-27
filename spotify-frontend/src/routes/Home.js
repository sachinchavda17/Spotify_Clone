import { Icon } from "@iconify/react";
import spotify_logo from "../images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Link } from "react-router-dom";
import { makeLogoutGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import SingleSongBox from "../components/shared/SingleSongBox";

const Home = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeLogoutGETRequest("/song/get/logout/allsong");
      setSongData(response.data);
    };
    getData();
  }, []);
  return (
    <div className="h-full w-full flex">
      {/* This first div will be the left panel */}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          {/* This div is for logo */}
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="spotify logo" width={125} />
          </div>
          <div className="py-5">
            <IconText
              iconName={"material-symbols:home"}
              displayText={"Home"}
              active
            />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
          </div>
          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create Playlist"}
            />
            <IconText
              iconName={"mdi:cards-heart"}
              displayText={"Liked Songs"}
            />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-gray-300 hover:border-white text-gray-300 hover:text-white  w-2/5 flex px-2 py-1 rounded-full items-center justify-center cursor-pointer">
            <div className="w-full">
              {/* <Icon icon="carbon:earth-europe-africa" className="fill-current" /> */}
              <Icon icon="mingcute:earth-line" />
            </div>
            <div className="ml-1 mr-1 text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
      {/* This second div will be the right part(main content) */}
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-3/5 flex justify-around items-center">
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-1/2 border-r border-white"></div>
            </div>
            <div className="w-2/5 flex justify-around h-full items-center">
              <Link to="/signup">
                <TextWithHover displayText={"Sign up"} />
              </Link>
              <Link
                to="/login"
                className="bg-white h-2/3 px-8 py-6  flex items-center justify-center rounded-full font-semibold cursor-pointer  "
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
        <div className="py-5 grid gap-2 grid-cols-4 overflow-auto">
          {songData ? (
            songData.map((item) => {
              return (
                <Link to={"/login"}>
                  <SingleSongBox
                    info={item}
                    key={JSON.stringify(item)}
                    playSound={() => {}}
                  />
                </Link>
              );
            })
          ) : (
            <div className="text-white">No data found! </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
