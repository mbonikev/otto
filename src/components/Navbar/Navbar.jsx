import React from "react";
import { IoChatbubblesOutline } from "react-icons/io5";

function Navbar() {
  return (
    <div className="w-full h-[70px] grid grid-cols-3 text-dark-text">
      {/* 1 */}
      <div className="flex items-center justify-start gap-1">
        <button className="p-3 bg-stone-200 rounded-full">
          <IoChatbubblesOutline />
        </button>
      </div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-1">
        <div className="w-7 min-w-7">
          <img src="/logo.png" alt="logo" className="w-full h-fit " />
        </div>
        <h1 className="font-Kanit text-2xl font-light">Otto</h1>
      </div>
      {/* 3 */}
      <div className="flex items-center justify-end gap-1"></div>
    </div>
  );
}

export default Navbar;
