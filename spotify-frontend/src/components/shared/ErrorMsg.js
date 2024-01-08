import React from "react";
import { Icon } from "@iconify/react";

const ErrorMsg = ({ errText = "error", closeError, reload, className }) => {
  return (
    <div
      className={`error-full flex justify-between items-center bg-pink-200 border border-red-600 text-red-700 px-4 py-3 my-3 rounded ${className}`}
      style={{ width: className }}
    >
      <div className="error-msg  ">
        <strong className="font-bold">{errText}</strong>
        <span className="block mt-1">Please Try again !!</span>
      </div>
      {reload && (
        <span>
          <button
            className="reload-btn px-2 py-1 bg-blue-500 text-white rounded border border-blue-500 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </span>
      )}
      <div>
        <Icon
          icon="maki:cross"
          size={20}
          className="error-close fill-current text-red-700 h-6 w-6"
          onClick={closeError}
        />
      </div>
    </div>
  );
};

export default ErrorMsg;
