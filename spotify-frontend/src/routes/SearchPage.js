import { useContext, useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import {
  makeAuthenticatedGETRequest,
  makeLogoutGETRequest,
} from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import songContext from "../contexts/songContext";

const SearchPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(cookie.token));

  const { currentSong } = useContext(songContext);

  const searchSong = async (searchText) => {
    try {
      setLoading(true);
      if (isLoggedIn) {
        const response = await makeAuthenticatedGETRequest(
          "/song/get/songname/" + searchText
        );
        setSongData(response.data);
      } else {
        const response = await makeLogoutGETRequest(
          "/song/get/logout/songname/" + searchText
        );
        setSongData(response.data);
      }
      setError(null);
    } catch (error) {
      setSongData([]);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const closeErrorSuccess = () => {
    setError("");
  };

  return (
    <LoggedInContainer curActiveScreen="search">
      <div className={`${currentSong ? " mb-20 " : ""} w-full py-6`}>
        <div className={`  text-white text-xl font-semibold pb-4 pl-2 pt-2`}>
          Search Song : <span className="font-bold"> {searchText}</span>
        </div>
        <div
          className={`w-full md:w-1/3  py-2 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <Icon icon="ic:outline-search" fontSize={30} className="text-2xl" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className=" text-sm w-full bg-gray-800 outline-none focus:outline-none"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              searchSong(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSong(searchText);
              }
            }}
          />
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMsg errText={error} closeError={closeErrorSuccess} />
        ) : songData.length > 0 ? (
          <div className="pt-3 space-y-3 h-full">
            <div className="text-white">
              Showing search results for
              <span className="font-bold"> {searchText}</span>
            </div>
            {songData.map((item) => (
              <Link to={!isLoggedIn && "/login"} key={JSON.stringify(item)}>
                <SingleSongCard info={item} playSound={() => {}} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 pt-3 h-full">Nothing to show here.</div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
