import React from "react";

function Tooltip({ children, title }) {
  return (
    <div className="h-fit w-fit relative">
      <div className="asbolute top-[110%] left-0 bg-dark-text text-white/90 text-xs font-semibold px-2">
        {title}
      </div>
    </div>
  );
}

export default Tooltip;
