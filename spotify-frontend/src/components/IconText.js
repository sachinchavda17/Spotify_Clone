import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
  return (
    <Link
      to={targetLink}
      className={`flex items-center m-1 p-2 rounded-lg text-lightGray hover:bg-darkGray-light hover:text-lightGray-light transition  ${
        active && "bg-darkGray-light"
      } `}
    >
      <div
        className="flex items-center justify-start cursor-pointer"
        onClick={onClick}
      >
        <div className="">
          <Icon
            icon={iconName}
            className={`${active && "text-white"} `}
            fontSize={27}
          />
        </div>
        <div
          className={`${active && "text-white"} text-sm font-semibold  ms-3  `}
        >
          {displayText}
        </div>
      </div>
    </Link>
  );
};

export default IconText;
