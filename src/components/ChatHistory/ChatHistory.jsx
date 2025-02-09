import React, { useState, useEffect } from "react";
import { HiMiniMagnifyingGlass, HiMiniXCircle } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { RiLoader2Fill } from "react-icons/ri";
import { PiChatsCircleFill } from "react-icons/pi";

function ChatHistory({ convs, loadingConvs }) {
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

  // Filter conversations based on search value
  const filteredConvs = convs.filter((msg) =>
    msg.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-[300px] h-svh p-2">
      <div className="w-full h-full bg-white dark:bg-card-dark-1 rounded-2xl px-1 pb-2 flex flex-col">
        {/* 1 */}
        <div className="w-full h-fit px-2 py-1">
          <div className="w-full h-[44px] min-h-[44px] border-b-[1px] dark:border-light-color-weak/40 pb-0">
            <div className="w-full h-full bg-transparent rounded-xl flex items-center justify-start">
              <HiMiniMagnifyingGlass className="mx-2 text-lg min-w-fit dark:text-light-color-weak" />
              <input
                type="text"
                autoFocus={true}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className="h-full w-full bg-transparent text-dark-text dark:text-light-color placeholder:text-dark-text-weak/50 dark:placeholder:text-light-color-weak text-sm"
                placeholder="Search chats..."
              />
              {searchValue !== "" && (
                <HiMiniXCircle
                  onClick={() => setSearchValue("")}
                  className="mx-2 min-w-fit text-xl text-dark-text-weak/40 dark:text-light-color-weak/40 hover:text-dark-text-weak dark:hover:text-light-color-weak transition cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="w-full flex-1 flex flex-col overflow-y-auto custom_scrollbar gap-2 mt-2 px-1 pr-2 my-0">
          {/* chats */}
          {loadingConvs ? (
            <div className="w-full h-full flex flex-col items-center justify-start py-10">
              <RiLoader2Fill className="text-2xl w-auto animate-spin text-dark-text-weak/50 stroke-[1px]" />
            </div>
          ) : (
            <div className="flex flex-col w-full h-full gap-0.5">
              {filteredConvs.length !== 0 ? (
                filteredConvs.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleMigrate(msg.conversationId)}
                    className={`w-full px-3 py-2 ${
                      chatId === msg.conversationId
                        ? "bg-stone-100 dark:bg-card-hover-dark dark:text-light-color"
                        : "hover:bg-stone-100 dark:hover:bg-card-hover-dark"
                    } rounded-xl text-sm text-left text-dark-text dark:text-light-color`}
                  >
                    {msg.title.replace(/"/g, "")}
                  </button>
                ))
              ) : (
                <div className="w-full min-h-full flex items-center justify-center flex-col gap-1">
                  <PiChatsCircleFill className="text-dark-text-weak dark:text-light-color-weak text-6xl opacity-20 dark:opacity-20" />
                  <p className="text-dark-text-weak dark:text-light-color-weak/50">
                    Chats Empty
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
