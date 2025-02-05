import React, { useState, useEffect } from "react";
import { HiMiniMagnifyingGlass, HiMiniXCircle } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function ChatHistory({ convs }) {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation(); // Use the useLocation hook to get the current URL

  // Get the 'chat' parameter from the URL
  const urlParams = new URLSearchParams(location.search);
  const chatId = urlParams.get("chat") || "";

  const handleMigrate = (link) => {
    Cookies.set("convId", link, {
      expires: 1,
      path: "/",
    });
    window.location.reload();
  };

  return (
    <div className="w-[300px] h-svh p-2">
      <div className="w-full h-full bg-white rounded-2xl p-2 flex flex-col">
        {/* 1 */}
        <div className="w-full h-[44px] min-h-[44px] border-b-[1px] pb-2">
          <div className="w-full h-full bg-transparent rounded-xl flex items-center justify-start">
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
              <HiMiniXCircle
                onClick={() => setSearchValue("")}
                className="mx-2 min-w-fit text-xl text-dark-text-weak/40 cursor-pointer"
              />
            )}
          </div>
        </div>
        {/*  */}
        <div className="w-full flex-1 flex flex-col overflow-y-auto custom_scrollbar gap-2 mt-2 pr-1 my-0">
          {/* chats */}
          <div className="flex flex-col w-full h-fit">
            {convs.map((msg, index) => (
              <button
                key={index}
                onClick={() => handleMigrate(msg.conversationId)}
                className={`w-full px-3 py-2 ${chatId === msg.conversationId} hover:bg-stone-100 rounded-xl text-sm text-left text-dark-text`}
              >
                {msg.title.replace(/"/g, "")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
