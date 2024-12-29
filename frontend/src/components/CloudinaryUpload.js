import { openUploadWidget } from "../utils/CloudinaryService.js";
import {
  cloudinary_upload_preset,
  cloudinary_cloudName,
} from "../utils/config.js";
import { useState } from "react";
import { Icon } from "@iconify/react";

const CloudinaryUpload = ({ setUrl, setName, displayName, edit }) => {
  const [buttonLoading, setButtonLoading] = useState(null);
  const uploadWidget = () => {
    setButtonLoading(true);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloudinary_cloudName,
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
    setButtonLoading(false);
    myUploadWidget.open();
  };

  return (
    <button
      disabled={buttonLoading}
      type="button"
      className={`${
        edit ? "" : "hover:scale-105"
      } w-full lg:w-base bg-primary hover:bg-primary-light text-lightGray-light cursor-pointer  rounded-xl p-4 font-semibold transition-shadow transform  transition-transform`}
      onClick={(e) => {
        e.preventDefault();
        uploadWidget();
      }}
    >
      {buttonLoading ? (
        <div className=" px-3 py-0">
          <Icon
            icon="line-md:loading-alt-loop"
            color="#eee"
            width="27"
            height="27"
          />
        </div>
      ) : (
        displayName
      )}
    </button>
  );
};

export default CloudinaryUpload;
