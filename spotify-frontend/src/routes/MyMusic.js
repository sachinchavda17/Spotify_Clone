import { useState, useEffect, useCallback, useContext } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";
import NewHome from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentSong } = useContext(songContext);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
        const currentUserString = localStorage.getItem("currentUser");
        const currentUser = currentUserString
          ? JSON.parse(currentUserString)
          : null;
        if (currentUser) {
          currentUser.MyMusic = response;
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
        setSongData(response.data);
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
            My Songs
          </div>
          <div className="space-y-3 overflow-auto">
            {songData.map((item) => (
              <SingleSongCard
                info={item}
                playSound={() => { }}
                key={JSON.stringify(item)}
              />
            ))}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default MyMusic;
