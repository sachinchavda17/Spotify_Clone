import { useState, useEffect, useCallback, useContext } from "react";
import SingleSongCard from "../components/SingleSongCard";
import { makeGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import NewHome from "../containers/LoggedInContainer";
import { useAudio } from "../contexts/AudioContext";

const LikedSongs = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentSong} = useAudio()

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser._id;
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeGETRequest("/song/likedsong/" + userId);
        if (response.data) {
          setSongData(response.data);
          console.log(response.data)
        } else {
          toast.error(response.err);
        }
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen="likedsong">
      {loading ? (
        <Loading />
      ) : (
        <div className={`${currentSong ? " mb-20 " : ""}`}>
          <div className={`  text-white text-2xl font-semibold pb-4 pl-2 sm:pt-5`}>
            Your Liked Song
          </div>
          <div className="space-y-3 overflow-auto">
            {songData.map((item) => (
              <SingleSongCard
                info={item}
                songList={songData}
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
