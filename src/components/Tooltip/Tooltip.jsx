import React from "react";

function Tooltip({ children }) {
  return (
    <div className="h-fit w-fit relative">
      {children}
      <div className="asbolute top-[110%] bg-dark-text ">
        
      </div>
    </div>
  );
}

export default Tooltip;
