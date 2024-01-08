import { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";

const SearchPage = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchSong = async (searchText) => {
    try {
      setLoading(true);
      const response = await makeAuthenticatedGETRequest(
        "/song/get/songname/" + searchText
      );
      setSongData(response.data);
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
      <div className="w-full py-6">
        <div
          className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 px-5 flex text-white space-x-3 items-center ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <Icon icon="ic:outline-search" className="text-lg" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 outline-none"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
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
          <div className="pt-10 space-y-3">
            <div className="text-white">
              Showing search results for
              <span className="font-bold"> {searchText}</span>
            </div>
            {songData.map((item) => (
              <SingleSongCard
                info={item}
                key={JSON.stringify(item)}
                playSound={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-400 pt-10">Nothing to show here.</div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
