import React from "react";
import { HiMiniPlus, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import Tooltip from "../Tooltip/Tooltip";

function Navbar() {
  return (
    <div className="w-full h-[70px] grid grid-cols-3 text-dark-text px-4">
      {/* 1 */}
      <div className="flex items-center justify-start gap-1">
        <div className="relative">
          <button className="h-10 w-10 flex items-center justify-center text-xl bg-stone-100 hover:bg-stone-200 active:scale-95 rounded-full">
            <HiOutlineChatBubbleLeftRight />
          </button>
          <Tooltip title="Chat history" />
        </div>
        <button className="h-10 w-10 flex items-center justify-center text-xl bg-stone-100 hover:bg-stone-200 active:scale-95 rounded-full">
          <HiMiniPlus />
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
        <button className="bg-stone-100 hover:bg-stone-200 active:scale-95 rounded-full overflow-hidden">
          <img src="" alt="" className="bg-stone-100 h-9 w-9 rounded-full" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
