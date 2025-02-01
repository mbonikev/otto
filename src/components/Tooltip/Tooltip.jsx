import React from "react";

function Tooltip({ title }) {
  return (
    <div className="absolute top-[110%] w-fit whitespace-nowrap px-2 py-2 left-0 bg-dark-text text-white/80 text-xs font-semibold">
      {title}
    </div>
  );
}

export default Tooltip;
