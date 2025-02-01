import React from "react";

function Tooltip({ title, placement }) {
  return (
    <div className={`absolute top-[110px] w-fit whitespace-nowrap px-3 py-[2px] rounded-[9px] bg-[#1b1b1b] text-white/90 text-[13px] font-semibold ${placement === "left" ? "left-0" : placement === "center" ? "left-[-50%] right-[-50%] mx-auto" : "right-0 "}`}>
        <div className={`w-2 h-2 bg-[#1b1b1b] absolute -top-[4px] rotate-45 ${placement  === "left" ? "left-[16px]" : placement === "center" ? "left-[-50%] right-[-50%] mx-auto" : "right-[16px]"}`}></div>
      {title}
    </div>
  );
}

export default Tooltip;
