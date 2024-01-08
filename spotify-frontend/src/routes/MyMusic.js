import { useState, useEffect } from "react";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
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
        <div>
          <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
            My Songs
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

export default MyMusic;
