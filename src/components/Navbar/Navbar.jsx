import React from "react";
import { HiMiniPlus, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import Tooltip from "../Tooltip/Tooltip";
import { RxPencil2 } from "react-icons/rx";

function Navbar() {
  return (
    <div className="w-full h-[70px] grid grid-cols-3 text-dark-text px-4">
      {/* 1 */}
      <div className="flex items-center justify-start gap-0">
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <HiOutlineChatBubbleLeftRight />
          <Tooltip title="Chat history" placement="left"/>
        </button>
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <RxPencil2 />
          <Tooltip title="New chat" placement="center"/>
        </button>
      </div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-1 select-none">
        <div className="w-7 min-w-7">
          <img src="/logo.png" alt="logo" className="w-full h-fit " />
        </div>
        <h1 className="font-Kanit text-2xl font-light text-dark-text-weak">Otto</h1>
      </div>
      {/* 3 */}
      <div className="flex items-center justify-end gap-1 relative">
        <button className="h-9 w-9 rounded-full overflow-hidden">
          <img src="/avatars/avatar3.png" alt="avatar" className="bg-stone-100 w-full h-fit min-h-full object-cover rounded-full" />
        </button>
        {/* dropdown */}
        <div className=""></div>
      </div>
    </div>
  );
}

export default Navbar;
