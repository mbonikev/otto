import React from "react";

function Tooltip({ title }) {
  return (
    <div className="absolute top-[130%] w-fit whitespace-nowrap px-2.5 py-2 rounded-[9px] left-0 bg-[#333] text-white/80 text-xs font-semibold">
      {title}
    </div>
  );
}

export default Tooltip;
