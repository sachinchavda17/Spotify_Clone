import { useState, useEffect, useContext } from "react";
import Loading from "../components/shared/Loading";
import ErrorMsg from "../components/shared/ErrorMsg";
import SingleSongBox from "../components/shared/SingleSongBox";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import songContext from "../contexts/songContext";
import LoggedInContainer from "../containers/LoggedInContainer";

const EditPage = () => {
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {currentSong} = useContext(songContext)

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
    <LoggedInContainer curActiveScreen="edit">
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMsg errText={error} closeError={closeErrorSuccess} />
      ) : (
        <div className={`${currentSong?"mb-10":"mb-1"}`}>
          <div className="text-white text-2xl font-semibold pb-4 pl-2 pt-8">
            My Songs
          </div>
          <div className="py-5 grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 overflow-auto max-lg:grid-cols-3 max-md:grid-cols-2">
            {songData.map((item) => (
              <SingleSongBox
                info={item}
                edit={1}
                key={JSON.stringify(item)}
              />
            ))}
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default EditPage;
