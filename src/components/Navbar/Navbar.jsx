import React from "react";
import { HiMiniPlus, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import Tooltip from "../Tooltip/Tooltip";

function Navbar() {
  return (
    <div className="w-full h-[70px] grid grid-cols-3 text-dark-text px-4">
      {/* 1 */}
      <div className="flex items-center justify-start gap-2">
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl bg-hover:stone-100 text-dark-text/70 rounded-full relative">
          <HiOutlineChatBubbleLeftRight />
          <Tooltip title="Chat history" placement="left"/>
        </button>
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl bg-hover:stone-100 text-dark-text/70 rounded-full relative">
          <HiMiniPlus />
          <Tooltip title="New chat" placement="center"/>
        </button>
      </div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-1 select-none">
        <div className="w-7 min-w-7">
          <img src="/logo.png" alt="logo" className="w-full h-fit " />
        </div>
        <h1 className="font-Kanit text-2xl font-light">Otto</h1>
      </div>
      {/* 3 */}
      <div className="flex items-center justify-end gap-1">
        <button className="bg-stone-100 hover:bg-stone-200 rounded-full overflow-hidden">
          <img src="" alt="" className="bg-stone-100 h-10 w-10 rounded-full" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
