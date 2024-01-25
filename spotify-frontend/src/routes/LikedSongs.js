import { useState, useEffect, useCallback, useContext } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";
import NewHome from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";

const LikedSongs = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentSong } = useContext(songContext);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser._id;
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/song/likedsong/" + userId
        );
        if (response.data) {
          setSongData(response.data);
        } else {
          setError(response.err);
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const closeErrorSuccess = () => {
    setError("");
  };

  return (
    <LoggedInContainer curActiveScreen="myMusic">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMsg errText={error} closeError={closeErrorSuccess} />
      ) : (
        <div className={`${currentSong ? " mb-20 " : ""}`}>
          <div className={`  text-white text-xl font-semibold pb-4 pl-2 pt-8`}>
            Your Liked Song
          </div>
          <div className="space-y-3 overflow-auto">
            {songData.map((item) => (
              <SingleSongCard
                info={item}
                playSound={() => {}}
                key={JSON.stringify(item)}
              />
            ))}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default LikedSongs;
