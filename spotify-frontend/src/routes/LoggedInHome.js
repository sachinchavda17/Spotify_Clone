import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongBox from "../components/shared/SingleSongBox";
import { useState, useEffect } from "react";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";

const Home = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/allsong");
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
    <LoggedInContainer curActiveScreen="home">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMsg errText={error} reload={true} closeError={closeErrorSuccess} />
      ) : (
        <div className="py-5 grid gap-2 grid-cols-4 overflow-auto">
          {songData.map((item) => (
            <SingleSongBox
              info={item}
              playSound={() => {}}
              key={JSON.stringify(item)}
            />
          ))}
        </div>
      )}
    </LoggedInContainer>
  );
};

export default Home;
