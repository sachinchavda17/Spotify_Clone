import { useState } from "react";
import { Icon } from "@iconify/react";
import spotify_logo from "../images/spotify_logo_white.svg";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import IconText from "../components/shared/IconText";
import TextInput from "../components/shared/TextInput";
import TextWithHover from "../components/shared/TextWithHover";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useForm } from "react-hook-form";
import ErrorMsg from "../components/shared/ErrorMsg";
import SuccessMsg from "../components/shared/SuccessMsg";
import NewHome from "../containers/LoggedInContainer";

const UploadSong = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailName, setThumbnailName] = useState();
  const [buttonLoading, setButtonLoading] = useState(null);
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const currentUser = localStorage.getItem("currentUser");
  const submitSong = async (songData) => {
    try {
      setButtonLoading(true);
      const data = {
        name: songData.name,
        thumbnail: thumbnail,
        track: playlistUrl,
        userId: currentUser._id,
      };
      const response = await makeAuthenticatedPOSTRequest("/song/create", data);
      setButtonLoading(false);
      if (response.err) {
        setButtonLoading(false);
        setError(response.err);
      } else {
        setSuccess("Song Created");
        setButtonLoading(false);
        setTimeout(() => {
          setSuccess(null);
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setButtonLoading(false);
      setError(err.message);
    }
  };

  const closeErrorSuccess = () => {
    setButtonLoading(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <LoggedInContainer>
      <div className="h-full w-full">
        <form onSubmit={handleSubmit((data) => submitSong(data))}>
          <div className="text-2xl  font-semibold mb-5 text-gray-200 mt-8">
            Upload Your Music
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              <TextInput
                label="Song Name"
                labelClassName={"text-white"}
                placeholder="Enter song name"
                register={register}
                registerName={"name"}
                error={errors?.name?.message}
              />
            </div>
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="pt-5">
              {thumbnailName ? (
                <div className="bg-green-600 rounded-full p-3  ">
                  {thumbnailName.substring(0, 50)}...
                </div>
              ) : (
                <CloudinaryUpload
                  setUrl={setThumbnail}
                  setName={setThumbnailName}
                  displayName={"Select Thumbnail"}
                />
              )}
            </div>
            <div className="py-5">
              {uploadedSongFileName ? (
                <div className="bg-green-600 rounded-full p-3 ">
                  {uploadedSongFileName.substring(0, 35)}...
                </div>
              ) : (
                <CloudinaryUpload
                  setUrl={setPlaylistUrl}
                  setName={setUploadedSongFileName}
                  displayName={"Select Track"}
                />
              )}
            </div>
          </div>

          <button
            disabled={buttonLoading}
            className="bg-green-600 w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold transition-shadow transform hover:scale-105 transition-transform"
            type="submit"
          >
            {buttonLoading ? (
              <div className="px-3 py-0">
                <Icon
                  icon="line-md:loading-alt-loop"
                  color="#eee"
                  width="27"
                  height="27"
                />
              </div>
            ) : (
              "Submit Song"
            )}
          </button>
          {error && <ErrorMsg errText={error} closeError={closeErrorSuccess} />}
          {success && (
            <SuccessMsg
              successText={success}
              closeSuccess={closeErrorSuccess}
            />
          )}
        </form>
      </div>
     </LoggedInContainer>
  );
};

export default UploadSong;
