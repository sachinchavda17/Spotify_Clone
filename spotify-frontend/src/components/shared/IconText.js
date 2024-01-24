import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
  return (
    <Link
      to={targetLink}
      className="flex items-center p-2 text-gray-900 rounded-lg text-white hover:bg-gray-700 hover:text-white"
    >
      <div
        className="flex items-center justify-start cursor-pointer"
        onClick={onClick}
      >
        <div className=" text-gray-500 transition duration-75  ">
          <Icon
            icon={iconName}
            className={`${
              active ? "text-white" : "text-gray-400"
            } hover:text-white`}
            fontSize={27}
          />
        </div>
        <div
          className={`${
            active ? "text-white" : "text-gray-400 "
          } text-sm font-semibold hover:text-white  ms-3 transition duration-75 `}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
