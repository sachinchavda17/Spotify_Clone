import { openUploadWidget } from "../../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../config.js";

const CloudinaryUpload = ({ setUrl, setName, displayName }) => {
  const uploadAudioWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dbm00gxt1",
        uploadPreset: cloudinary_upload_preset,
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <div
      className="bg-green-600 text-black cursor-pointer  rounded-full p-4 font-semibold transition-shadow transform hover:scale-105 transition-transform"
      onClick={uploadAudioWidget}
      
    >
      {displayName}
    </div>
  );
};

export default CloudinaryUpload;
