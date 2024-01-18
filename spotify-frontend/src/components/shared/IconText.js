import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
  return (
    <Link
      to={targetLink}
      className="flex items-center p-2 text-gray-900 rounded-lg  text-white hover:bg-gray-100  hover:bg-gray-700 group"
    >
      <div
        className="flex items-center justify-start cursor-pointer"
        onClick={onClick}
      >
        <div className=" text-gray-500 transition duration-75  text-gray-400 group-hover:text-gray-900   group-hover:text-white">
          <Icon
            icon={iconName}
            color={active ? "white" : "gray"}
            fontSize={27}
          />
        </div>
        <div
          className={`${
            active ? "text-white" : "text-gray-400 "
          } text-sm font-semibold hover:text-white ms-3 `}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
