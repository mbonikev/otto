import React from "react";

function Navbar() {
  return (
    <div className="w-full h-[70px] grid grid-cols-3">
      {/* 1 */}
      <div className="flex items-center justify-start gap-1"></div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-1">
        <div className="w-7 min-w-7">
          <img src="/logo.png" alt="logo" className="w-full h-fit " />
        </div>
        <h1 className="font-Kanit text-2xl font-normal">Otto</h1>
      </div>
      {/* 3 */}
      <div className="flex items-center justify-end gap-1"></div>
    </div>
  );
}

export default Navbar;
