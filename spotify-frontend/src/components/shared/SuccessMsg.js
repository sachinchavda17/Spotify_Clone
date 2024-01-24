import React from 'react';
import { Icon } from "@iconify/react";

const SuccessMsg = ({ successText, closeSuccess }) => {
  return (
    <div className="success-full bg-green-200 border border-green-500 text-green-700 px-4 py-3 rounded relative flex items-center justify-between my-3 shadow-md">
      <div className="success-msg">
        <span className="font-bold">{successText}</span>
        <span className="block mt-1">Thank you</span>
      </div>
      <div>
        <Icon
          icon="maki:cross"
          size={20}
          className="error-close fill-current text-green-700 h-6 w-6"
          onClick={closeSuccess}
        />
      </div>
    </div>
  );
};

export default SuccessMsg;
