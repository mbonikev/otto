import React from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

function ChatHistory() {
  return (
    <div className="w-[300px] h-svh p-3">
      <div className="w-full h-full bg-white rounded-2xl">
        {/* 1 */}
        <div className="w-full h-[50px]">
          <div className="w-full h-full bg-stone-100 rounded-xl flex items-center justify-start">
            <HiMiniMagnifyingGlass />
            <input type="text" name="" id="" className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
