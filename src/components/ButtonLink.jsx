import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
const ButtonLink = ({ children, tip = "", link = "/" }) => {
  return (
    <div className="">
      {" "}
      <Tooltip title={tip}>
        <a
          href={link}
          className=" flex items-center hover:bg-slate-400/10 w-full py-1 rounded "
        >
          <IconButton>{children}</IconButton>
          <span className="ml-2 hidden lg:inline text-lg font-normal">
            {tip}
          </span>
        </a>
      </Tooltip>
    </div>
  );
};

export default ButtonLink;
