import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongBox from "../components/shared/SingleSongBox";
import { useState, useEffect } from "react";
import ErrorMsg from "../components/shared/ErrorMsg";
import Loading from "../components/shared/Loading";
import NewHome from "./NewHome";

const LoggedInHome = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/allsong");
        const currentUserString = localStorage.getItem("currentUser");
        let currentUser = currentUserString
          ? JSON.parse(currentUserString)
          : null;
        if (currentUser) {
          currentUser.allSongs = response;
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
    // <LoggedInContainer curActiveScreen="home">
    <NewHome curActiveScreen="home">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMsg
          errText={error}
          reload={true}
          closeError={closeErrorSuccess}
        />
      ) : (
        <div className="py-5 grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 overflow-auto max-lg:grid-cols-3 max-md:grid-cols-2">
          {songData.map((item) => (
            <SingleSongBox
              info={item}
              playSound={() => {}}
              key={JSON.stringify(item)}
            />
          ))}
        </div>
      )}
      {/* </LoggedInContainer> */}
    </NewHome>
  );
};

export default LoggedInHome;
