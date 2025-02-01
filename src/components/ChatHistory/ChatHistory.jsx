import React, { useState } from "react";
import { HiMiniMagnifyingGlass, HiMiniXCircle } from "react-icons/hi2";

function ChatHistory() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="w-[300px] h-svh p-3">
      <div className="w-full h-full bg-white rounded-2xl p-2">
        {/* 1 */}
        <div className="w-full h-[36px]">
          <div className="w-full h-full bg-stone-100 rounded-xl flex items-center justify-start">
            <HiMiniMagnifyingGlass className="mx-2 text-lg min-w-fit" />
            <input
              type="text"
              autoFocus={true}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              className="h-full w-full bg-transparent text-dark-text placeholder:text-dark-text-weak/50 text-sm"
              placeholder="Search chats..."
            />
            {searchValue !== "" && (
              <HiMiniXCircle onClick={() => setSearchValue("")} className="mx-2 min-w-fit text-xl text-dark-text-weak/40 cursor-pointer" />
            )}
          </div>
        </div>
        {/*  */}
        <div className="w-[90%] h-[1px] bg-stone-200 mx-auto my-2"></div>
        {/*  */}
        <h1 className="text-xs font-medium text-dark-text-weak mb-2">Today</h1>
        
      </div>
    </div>
  );
}

export default ChatHistory;
