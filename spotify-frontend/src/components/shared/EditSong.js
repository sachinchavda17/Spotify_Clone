import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import SuccessMsg from "./SuccessMsg";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../../utils/serverHelpers";
import CloudinaryUpload from "./CloudinaryUpload";
import songContext from "../../contexts/songContext";
import Loading from "./Loading";
import { Icon } from "@iconify/react";
import LoggedInContainer from "../../containers/LoggedInContainer";

const EditSongPage = () => {
  const [name, setName] = useState("");
  const [trackUrl, setTrackUrl] = useState("");
  const [trackName, setTrackName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailName, setThumbnailName] = useState();
  const [song, setSong] = useState([]);
  const { songId } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(null);
  const [buttonLoadingUpdate, setButtonLoadingUpdate] = useState(null);
  const [buttonLoadingDelete, setButtonLoadingDelete] = useState(null);
  const closeErrorSuccess = () => {
    setError("");
    setSuccess("");
  };

  const { currentSong } = useContext(songContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await makeAuthenticatedGETRequest(
          "/song/edit/" + songId
        );
        setLoading(false);
        setSong(response.data);
      } catch (err) {
        setLoading(false);
        setError("Error fetching song data");
      }
    };
    getData();
  }, [songId]);

  const submitProject = async () => {
    try {
      const data = {
        name: name,
        thumbnail: thumbnail,
        track: trackUrl,
      };
      setButtonLoadingUpdate(true);

      if (data.name === "") {
        data.name = song.name || "";
      }
      if (data.thumbnail === "") {
        data.thumbnail = song.thumbnail || "";
      }
      if (data.track === "") {
        data.track = song.track || "";
      }

      const response = await makeAuthenticatedPOSTRequest(
        "/song/edit/" + songId + "/update",
        data
      );

      setButtonLoadingUpdate(false);
      if (response.err) {
        setButtonLoadingUpdate(false);
        setError("Could not update Song");
      } else {
        setButtonLoadingUpdate(false);
        setSuccess("Song Updated.");
        setTimeout(() => {
          setSuccess("");
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setButtonLoadingUpdate(false);
      setError("Could not update Song");
    }
  };

  const deleteProject = async () => {
    try {
      setButtonLoadingDelete(true);
      await makeAuthenticatedGETRequest("/song/edit/" + songId + "/delete");
      setButtonLoadingDelete(false);
      setSuccess("Song deleted successfully");
      setTimeout(() => {
        setSuccess("");
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Could not delete Song");
    }
  };

  return (
    <LoggedInContainer curActiveScreen={"edit"}>
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`upload-container ${
            currentSong ? "mb-20" : ""
          } w-full h-full flex flex-col items-center bg-black overflow-auto`}
        >
          <div className="form bg-app-black text-white p-6 my-2 lg:px-12 rounded-lg shadow-md w-11/12 md:w-3/4 lg:w-1/2 ">
            <h1 className="w-full text-gray-200 text-xl border-b border-gray-700 pb-2 text-center">
              Editing {song.name}
            </h1>
            <div className="my-3">
              <label className="text-gray-200 " htmlFor="name">
                Name
              </label>
              <input
                className="my-2 px-4 py-2 text-gray-200 bg-gray-800 rounded focus:outline-none border-none w-full"
                type="text"
                name="name"
                placeholder="Edit song name"
                value={name === "" ? song.name || "" : name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my-3">
              <label className="text-gray-200 " htmlFor="thumbnail">
                Edit Thumbnail
              </label>
              <div className="flex items-center justify-center">
                <img
                  src={trackUrl ? trackUrl : song.thumbnail}
                  alt={trackUrl ? trackUrl : song.thumbnail}
                  className="  my-2 w-full md:w-40 md:h-40  rounded"
                />
              </div>
              <div className="py-1">
                {thumbnailName ? (
                  <div className="bg-green-600 rounded p-3 ">
                    {thumbnailName.substring(0, 35)}...
                  </div>
                ) : (
                  <CloudinaryUpload
                    edit={1}
                    setUrl={setThumbnail} // Use setImgUrl for thumbnail
                    setName={setThumbnailName} // Use setUploadedFileName for name
                    displayName={"Select New Thumbnail"}
                  />
                )}
              </div>
            </div>
            <div className="my-3">
              <label className="text-gray-200 " htmlFor="text">
                Edit Track
              </label>
              <div class="my-2">
                <audio controls preload="none" className="w-full ">
                  <source
                    src={trackUrl ? trackUrl : song.track}
                    type="audio/mp3"
                  />
                </audio>
              </div>
              <div className="my-2">
                {trackName ? (
                  <div className="bg-green-600 rounded-full p-3  ">
                    {trackName.substring(0, 50)}...
                  </div>
                ) : (
                  <CloudinaryUpload
                    edit={1}
                    setUrl={setTrackUrl}
                    setName={setTrackName}
                    displayName={"Select New Track"}
                  />
                )}
              </div>
            </div>

            {error && (
              <ErrorMsg errText={error} closeError={closeErrorSuccess} />
            )}
            {success && (
              <SuccessMsg
                successText={success}
                closeSuccess={closeErrorSuccess}
              />
            )}
            <div className="edit-btns flex  py-3 justify-around">
              <button
                disabled={buttonLoadingUpdate}
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
                onClick={submitProject}
              >
                {buttonLoadingUpdate ? (
                  <div className="px-3 py-0">
                    <Icon
                      icon="line-md:loading-alt-loop"
                      color="#eee"
                      width="27"
                      height="27"
                    />
                  </div>
                ) : (
                  "Update"
                )}
              </button>
              <button
                disabled={buttonLoadingDelete}
                type="delete"
                className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
                onClick={deleteProject}
              >
                {buttonLoadingDelete ? (
                  <div className="px-3 py-0">
                    <Icon
                      icon="line-md:loading-alt-loop"
                      color="#eee"
                      width="27"
                      height="27"
                    />
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </LoggedInContainer>
  );
};

export default EditSongPage;
