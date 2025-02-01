import React from "react";

function Tooltip({ children, title }) {
  return (
    <div className="h-fit w-fit relative">
      {children}
      <div className="asbolute top-[110%] bg-dark-text text-white text-xs font-semibold">
        {title}
      </div>
    </div>
  );
}

export default Tooltip;
