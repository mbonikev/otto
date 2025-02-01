import React, { useEffect, useState } from "react";
import { HiMiniPlus, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import Tooltip from "../Tooltip/Tooltip";
import { RxPencil2 } from "react-icons/rx";

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
      <div className="flex items-center justify-end gap-1 relative">
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
            className="absolute top-[90%] w-[220px] h-[240px] rounded-2xl ring-1 ring-stone-200 shadow-lg"
          ></div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
