import React, { useState } from "react";
import { HiMiniMagnifyingGlass, HiMiniXCircle } from "react-icons/hi2";
import { Link, useLocation, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function ChatHistory({ convs }) {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation()
  const chat = useParams()
  console.log(location.pathname, chat)
  console.log(convs);
  const handleMigrate = (link) => {
    Cookies.set("convId", link, {
      expires: 1,
      path: "/",
    });
    window.location.reload()
  }
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
        {/* <div className="w-[95%] h-[1px] bg-stone-200 mx-auto my-2"></div> */}
        {/*  */}
        {/* 2 */}
        <div className="w-full flex-1 flex flex-col overflow-y-auto custom_scrollbar gap-2 mt-2 pr-1 my-0">
          {/* <h1 className="text-xs font-medium text-dark-text-weak px-2.5">
            Today
          </h1> */}
          {/* chats */}
          <div className="flex flex-col w-full h-fit">
            {convs.map((msg, index) => (
              <button
                key={index}
                onClick={() => handleMigrate(msg.conversationId)}
                className={`w-full px-3 py-2 hover:bg-stone-100 rounded-xl text-sm text-left text-dark-text`}
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
