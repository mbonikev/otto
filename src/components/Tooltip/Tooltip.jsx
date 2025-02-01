import React from "react";

function Tooltip({ title, placement, shortcut }) {
  return (
    <div
      className={`absolute z-10 w-fit whitespace-nowrap px-3 py-[7px] rounded-[9px] bg-[#222222] text-white/90 text-sm font-semibold pointer-events-none opacity-0 group-hover:opacity-100 delay-150 flex flex-col items-center ${
        placement === "left"
          ? "top-[120%] left-0"
          : placement === "center"
          ? "top-[120%] left-[-50%] right-[-50%] mx-auto"
          : placement === "center"
          ? "top-[120%] right-0 "
          : placement === "right-center"
          ? "top-0 bottom-0 my-auto left-[110%]"
          : "top-[120%] left-0"
      }`}
    >
      <div
        className={`w-2 h-2 bg-[#222222] absolute rotate-45 ${
          placement === "left"
            ? "-top-[4px] left-[16px]"
            : placement === "center"
            ? "-top-[4px] left-[-50%] right-[-50%] mx-auto"
            : placement === "right-center"
            ? "top-0 bottom-0 left-[-4px]"
            : "-top-[4px] right-[16px]"
        }`}
      ></div>
      {title}
      {shortcut && (
        <span className="text-xs font-medium text-white/60 py-[2px]">
          {shortcut}
        </span>
      )}
    </div>
  );
}

export default Tooltip;
