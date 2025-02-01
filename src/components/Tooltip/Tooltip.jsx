import React from "react";

function Tooltip({ title }) {
  return (
    <div className="absolute top-[130%] w-fit whitespace-nowrap px-3 py-1 rounded-[9px] left-0 bg-[#1b1b1b] text-white/90 text-[13px] font-semibold">
        <div className="w-2 h-2 bg-[#1b1b1b] absolute -top-1"></div>
      {title}
    </div>
  );
}

export default Tooltip;
