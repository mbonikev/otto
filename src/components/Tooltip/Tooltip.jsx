import React from "react";

function Tooltip({ title }) {
  return (
    <div className="absolute top-[130%] w-fit whitespace-nowrap px-2.5 py-2 rounded-[9px] left-0 bg-[#1b1b1b] text-white/90 text-sm font-semibold">
      {title}
    </div>
  );
}

export default Tooltip;
