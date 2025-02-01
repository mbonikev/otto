import React from "react";

function Tooltip({ children, title }) {
  return (
    <div className="w-[100px] relative">
      {children}
      <div className="absolute top-[110%] left-0 bg-dark-text text-white/80 text-xs font-semibold">
        {title}
      </div>
    </div>
  );
}

export default Tooltip;
