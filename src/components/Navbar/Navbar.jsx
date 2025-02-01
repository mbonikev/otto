import React, { useEffect, useRef, useState } from "react";
import {
  HiMiniPlus,
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";
import Tooltip from "../Tooltip/Tooltip";
import { RxPencil2 } from "react-icons/rx";
import { TbMessage2Share } from "react-icons/tb";
import { VscShare } from "react-icons/vsc";
import { RiShareLine } from "react-icons/ri";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);
  const profileRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
      if (menunRef.current && !menunRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full h-[70px] grid grid-cols-3 text-dark-text px-4">
      {/* 1 */}
      <div className="flex items-center justify-start gap-0">
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <HiOutlineChatBubbleLeftRight />
          <Tooltip title="Chat history" placement="left" />
        </button>
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <RxPencil2 />
          <Tooltip title="New chat" placement="center" />
        </button>
      </div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-1 select-none">
        <div className="w-7 min-w-7">
          <img src="/logo.png" alt="logo" className="w-full h-fit " />
        </div>
        <h1 className="font-Kanit text-2xl font-light text-dark-text-weak">
          Otto
        </h1>
      </div>
      {/* 3 */}
      <div className="flex items-center justify-end gap-3 relative select-none">
        <button className="group h-9 w-fit px-3 ring-1 ring-stone-200 flex items-center justify-center gap-1 text-sm hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <RiShareLine className="text-xl" />
          <h1>Share</h1>
        </button>
        <button
          ref={profileRef}
          onClick={() => setShowPopup(true)}
          className="h-9 w-9 rounded-full overflow-hidden"
        >
          <img
            src="/avatars/avatar3.png"
            alt="avatar"
            className="bg-stone-100 w-full h-fit min-h-full object-cover rounded-full"
          />
        </button>
        {/* dropdown */}
        {showPopup && (
          <div
            ref={popupRef}
            className="absolute top-[90%] w-[220px] h-fit rounded-2xl ring-1 ring-stone-200 shadow-lg p-1.5"
          >
            <button className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100">
              <HiOutlineArrowRightStartOnRectangle className="text-xl text-dark-text-weak/50" />
              <h1 className="text-sm">Sign Out</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
