import React from "react";

function Tooltip({ title, placement, shortcut }) {
  return (
    <div className={`absolute top-[120%] z-10 w-fit whitespace-nowrap px-3 py-[7px] rounded-[9px] bg-[#222222] text-white/90 text-sm font-semibold pointer-events-none opacity-0 group-hover:opacity-100 delay-150 ${placement === "left" ? "left-0" : placement === "center" ? "left-[-50%] right-[-50%] mx-auto" : "right-0 "}`}>
        <div className={`w-2 h-2 bg-[#222222] absolute -top-[4px] rotate-45 ${placement  === "left" ? "left-[16px]" : placement === "center" ? "left-[-50%] right-[-50%] mx-auto" : "right-[16px]"}`}></div>
      {title}
    </div>
  );
}

export default Tooltip;
