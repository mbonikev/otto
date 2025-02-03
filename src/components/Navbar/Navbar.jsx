import React, { useEffect, useRef, useState } from "react";
import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineMegaphone,
  HiOutlineShare,
  HiOutlineUser,
} from "react-icons/hi2";
import Tooltip from "../Tooltip/Tooltip";
import { RxPencil2 } from "react-icons/rx";
import { IoShareSocialOutline } from "react-icons/io5";
import ChatHistory from "../ChatHistory/ChatHistory";
import { useNavigate } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";
import axios from "axios";
import { BsIncognito, BsLockFill, BsStars } from "react-icons/bs";
import { BiSolidLockAlt } from "react-icons/bi";

function Navbar({ photo, displayName }) {
  const [showPopup, setShowPopup] = useState(false);
  const profileRef = useRef(null);
  const popupRef = useRef(null);
  const [chatsModal, setChatsModal] = useState(false);
  const [animateChatsModal, setAnimateChatsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  };
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
  
      // Wait briefly to allow the cookie to be cleared
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };
  

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenChatsModal = () => {
    setChatsModal(true);
    setTimeout(() => setAnimateChatsModal(true), 50);
  };

  const handleCloseChatsModal = () => {
    setAnimateChatsModal(false);
    setTimeout(() => setChatsModal(false), 300);
  };

  // shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCloseChatsModal();
      } else if (event.altKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        handleOpenChatsModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full h-[70px] min-h-[70px] bg-white grid grid-cols-3 text-dark-text px-4 sticky">
      {/* Overlay */}
      {chatsModal && (
        <div
          onClick={handleCloseChatsModal}
          className={`fixed top-0 left-0 w-full h-full bg-black/10 z-20 transition-opacity duration-300 ${
            animateChatsModal ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Chat Modal */}
      {chatsModal && (
        <div
          className={`w-fit h-svh fixed top-0 left-0 transition-transform duration-300 ease-in-out z-30
                ${
                  animateChatsModal ? "translate-x-0" : "-translate-x-[300px]"
                }`}
        >
          <ChatHistory />
        </div>
      )}
      {/* 1 */}
      <div className="flex items-center justify-start gap-0">
        <button
          onClick={handleOpenChatsModal}
          className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative"
        >
          <HiOutlineChatBubbleLeftRight />
          <Tooltip title="Chat history" placement="left" shortcut="Alt + c" />
        </button>
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <RxPencil2 />
          <Tooltip title="New chat" placement="center" />
        </button>
      </div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-1 select-none w-full max-w-[100px] mx-auto relative group bg-transparent">
        {/* info */}
        <div className="w-[260px] h-fit delay-150 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:transition-all bg-transparent absolute top-0 mx-auto z-10 pt-2">
          <div className="w-full h-full bg-white ring-1 ring-stone-200 shadow-lg rounded-2xl pt-[88px] px-2 pb-2 text-center">
            <h1 className="font-Kanit delay-150 transition-all whitespace-nowrap opacity-0 group-hover:opacity-100 text-2xl font-light text-dark-text-weak text-center">
              Otto
              <span className="text-xs mx-1 rounded-xl bg-stone-200/50 font-Inter px-2 py-0.5 delay-150 transition-all whitespace-nowrap opacity-0 group-hover:opacity-100 font-medium text-dark-text-weak mt-0">
                Beta
              </span>
            </h1>
            <div className="w-full flex flex-col mt-3">
              <div className="w-full h-14 rounded-xl hover:bg-stone-100/70 cursor-pointer p-2 flex items-center justify-between">
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-9 h-9 min-w-9 aspect-square flex justify-center items-center rounded-full bg-stone-200/50 text-dark-text text-lg">
                    <BsStars />
                  </div>
                  <div className="flex flex-col gap-[2px] items-start leading-5">
                    <h1>Otto Plus</h1>
                    <p className="text-xs text-dark-text/50 leading-3">
                      More Models & more
                    </p>
                  </div>
                </div>
                <div className="h-full w-7 min-w-5 flex items-center justify-center text-dark-text/60 text-lg">
                  <BiSolidLockAlt />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-7 min-w-7 z-10 group-hover:w-16 delay-150 group-hover:translate-y-5 transition-all">
          <img src="/logo.png" alt="logo" className="w-full h-fit " />
        </div>
      </div>
      {/* 3 */}
      <div className="flex items-center justify-end gap-0 relative select-none">
      <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <BsIncognito />
          <Tooltip title="Temporary Mode" placement="center" />
        </button>
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-2xl hover:bg-stone-100 text-dark-text-weak hover:text-dark-text rounded-full relative">
          <IoShareSocialOutline />
          <Tooltip title="Share" placement="center" />
        </button>    
        <button
          ref={profileRef}
          onClick={() => setShowPopup(true)}
          className="h-9 w-9 rounded-full overflow-hidden ml-3"
        >
          {photo !== "" ? (
            <img
              src={photo}
              alt="avatar"
              className="bg-stone-100 w-full h-fit min-h-full object-cover rounded-full"
            />
          ) : (
            <img
              src="/avatars/avatar3.png"
              alt="avatar"
              className="bg-stone-100 w-full h-fit min-h-full object-cover rounded-full"
            />
          )}
        </button>
        {/* dropdown */}
        {showPopup && (
          <div
            ref={popupRef}
            className="absolute top-[90%] w-[220px] h-fit rounded-2xl ring-1 bg-white ring-stone-200 shadow-lg p-1.5"
          >
            <button className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100">
              <HiOutlineUser className="text-2xl text-dark-text-weak/70" />
              <h1 className="text-sm">My account</h1>
            </button>
            <button className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100">
              <HiOutlineCog6Tooth className="text-2xl text-dark-text-weak/70" />
              <h1 className="text-sm">Settings</h1>
            </button>
            {/*  */}
            <div className="w-[90%] h-[1px] bg-stone-200 mx-auto my-1"></div>
            {/*  */}
            <button className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100">
              <HiOutlineMegaphone className="text-2xl text-dark-text-weak/70" />
              <h1 className="text-sm">Updates</h1>
            </button>
            {/*  */}
            <div className="w-[90%] h-[1px] bg-stone-200 mx-auto my-1"></div>
            {/*  */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100"
            >
              {loading ? (
                <>
                  <LuLoaderCircle className="text-2xl text-dark-text-weak/70 animate-spinLoader" />
                  <h1 className="text-sm">Sign Out</h1>
                </>
              ) : (
                <>
                  <HiOutlineArrowRightStartOnRectangle className="text-2xl text-dark-text-weak/70" />
                  <h1 className="text-sm">Sign Out</h1>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
