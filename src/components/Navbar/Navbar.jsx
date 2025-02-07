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
import Cookies from "js-cookie";
import avatar from "/avatars/avatar1.png";

function Navbar({
  photo,
  displayName,
  user,
  userId,
  setMessages,
  setThinking,
  thinking,
}) {
  const [showPopup, setShowPopup] = useState(false);
  const profileRef = useRef(null);
  const popupRef = useRef(null);
  const [chatsModal, setChatsModal] = useState(false);
  const [animateChatsModal, setAnimateChatsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingConvs, setLoadingConvs] = useState(false);
  const [convs, setConvs] = useState([]);
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false)

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/auth/logout`,
        {},
        { withCredentials: true }
      );

      Cookies.remove("selectedModel");
      Cookies.remove("convId");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetConvs = async () => {
      const retrieveId = Cookies.get("convId") || "";
      const apiUrl = import.meta.env.VITE_BACKEND_API;
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      try {
        setLoadingConvs(true);
        const response = await axios.get(`${apiUrl}/api/getconvs`, {
          params: { userId },
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data)
        if (response.data.convsWithTitles) {
          setConvs(response.data.convsWithTitles);
          setLoadingConvs(false);
        }
      } catch (error) {
        console.error("conversations:", error);
        setLoadingConvs(false);
      }
    };

    // Call both functions to fetch data
    handleGetConvs();
  }, []);

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

  const handleCloseModal = () => {
    setAnimateChatsModal(false);
    setTimeout(() => setChatsModal(false), 300);
  };

  // shortcuts
  useEffect(() => {
    if (user) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          handleCloseModal();
        } else if (event.altKey && event.key.toLowerCase() === "c") {
          event.preventDefault();
          handleOpenChatsModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

  const handleNew = () => {
    Cookies.remove("convId");
    setMessages([]);
    window.location.reload();
  };

  const handleLoginModal = () => {};

  return (
    <div className="w-full h-fit bg-white/80 dark:bg-body-dark/80 backdrop-blur-lg grid grid-cols-3 text-dark-text dark:text-light-color px-3 py-2 sticky top-0">
      {/* Overlay */}
      {chatsModal && (
        <div
          onClick={handleCloseModal}
          className={`fixed top-0 left-0 w-full h-full bg-black/15 dark:bg-black/30 z-20 transition-opacity duration-300 ${
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
          <ChatHistory convs={convs} loadingConvs={loadingConvs} />
        </div>
      )}

      {/* login Modal */}


      {/* 1 */}
      <div className="flex items-center justify-start gap-0">
        <button
          onClick={user ? handleOpenChatsModal : handleLoginModal}
          className="group h-10 w-auto aspect-square flex items-center justify-center text-[22px] hover:bg-stone-200/70 text-dark-text-weak dark:text-light-color-weak hover:text-dark-text-weak dark:hover:bg-card-hover-dark dark:hover:text-light-color-weak rounded-full relative"
        >
          <HiOutlineChatBubbleLeftRight className="" />
          <Tooltip title="Chat history" placement="left" shortcut="Alt + c" />
        </button>
        <button
          onClick={user ? handleNew : handleLoginModal}
          className="group h-10 w-auto aspect-square flex items-center justify-center text-[22px] hover:bg-stone-200/70 text-dark-text-weak dark:text-light-color-weak hover:text-dark-text-weak dark:hover:bg-card-hover-dark dark:hover:text-light-color-weak rounded-full relative"
        >
          <RxPencil2 className=""  />
          <Tooltip title="New chat" placement="center" />
        </button>
      </div>
      {/* 2 */}
      <div className="flex items-center justify-center gap-1 select-none w-full max-w-[100px] h-full mx-auto relative group bg-transparent">
        {/* info */}
        <div className="w-[260px] h-fit delay-150 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:transition-all bg-transparent absolute top-0 mx-auto z-10 pt-2">
          <div className="w-full h-full bg-white dark:bg-card-dark-1 ring-1 ring-stone-200 dark:ring-card-dark-1 shadow-lg rounded-2xl pt-[88px] px-2 pb-2 text-center">
            <h1 className="font-Kanit delay-150 transition-all whitespace-nowrap opacity-0 group-hover:opacity-100 text-2xl font-light text-dark-text-weak dark:text-light-color-weak text-center">
              Otto
              <span className="text-xs mx-1 rounded-xl text-dark-text-weak dark:text-light-color-weak bg-stone-200/50 dark:bg-light-color-weak/20 font-Inter px-2 py-0.5 delay-150 transition-all whitespace-nowrap opacity-0 group-hover:opacity-100 font-medium  mt-0">
                Beta
              </span>
            </h1>
            <div className="w-full flex flex-col mt-3">
              <div className="w-full h-14 rounded-xl hover:bg-stone-100/70 dark:hover:bg-light-color-weak/10 cursor-pointer p-2 flex items-center justify-between">
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-9 h-9 min-w-9 aspect-square flex justify-center items-center rounded-full bg-stone-200/50 text-dark-text dark:text-light-color dark:bg-light-color-weak/20 text-lg">
                    <BsStars />
                  </div>
                  <div className="flex flex-col gap-[2px] items-start leading-5">
                    <h1>Otto Plus</h1>
                    <p className="text-xs text-left text-dark-text/50 dark:text-light-color/50 leading-3">
                      Comming Soon
                    </p>
                  </div>
                </div>
                <div className="h-full w-7 min-w-5 flex items-center justify-center text-dark-text/60 dark:text-light-color/60 text-lg">
                  <BiSolidLockAlt />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-7 min-w-7 z-10 group-hover:w-16 absolute top-1.5 left-0 right-0 m-auto delay-150 group-hover:translate-y-5 transition-all dark:saturate-0 dark:group-hover:saturate-100 dark:opacity-65 dark:group-hover:opacity-80">
          <img src="/logo.png" alt="logo" className="w-full h-fit " />
        </div>
      </div>
      {/* 3 */}
      <div className="flex items-center justify-end gap-0 relative select-none">
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-[22px] hover:bg-stone-200/70 text-dark-text-weak hover:text-dark-text-weak dark:text-light-color-weak dark:hover:bg-card-hover-dark dark:hover:text-light-color-weak rounded-full relative">
          <BsIncognito className="" />
          <Tooltip title="Temporary Mode" placement="center" />
        </button>
        <button className="group h-10 w-auto aspect-square flex items-center justify-center text-[22px] hover:bg-stone-200/70 text-dark-text-weak hover:text-dark-text-weak dark:text-light-color-weak dark:hover:bg-card-hover-dark dark:hover:text-light-color-weak rounded-full relative">
          <IoShareSocialOutline className="" />
          <Tooltip title="Share" placement="center" />
        </button>
        {user ? (
          <button
            ref={profileRef}
            onClick={() => setShowPopup(true)}
            className="h-9 w-auto aspect-square rounded-full overflow-hidden ml-3"
          >
            <img
              src={photo ? photo : avatar}
              alt="avatar"
              className="bg-stone-100 w-full h-fit min-h-full object-cover rounded-full"
            />
          </button>
        ) : (
          <button className="h-9 w-fit px-4 bg-body-dark dark:bg-light-color text-light-color dark:text-dark-text rounded-full overflow-hidden ml-3">
            Login
          </button>
        )}
        {/* dropdown */}
        {user && showPopup && (
          <div
            ref={popupRef}
            className="absolute top-[120%] w-[220px] h-fit rounded-2xl ring-1 bg-white dark:bg-card-dark-1 ring-stone-200 dark:ring-card-dark-1 shadow-lg p-1.5"
          >
            <button className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100 text-dark-text-weak hover:text-dark-text dark:text-light-color dark:hover:text-light-color dark:hover:bg-light-color-weak/10">
              <HiOutlineUser className="text-2xl text-dark-text-weak/70 dark:text-light-color-weak" />
              <h1 className="text-sm">My account</h1>
            </button>
            <button className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100 text-dark-text-weak hover:text-dark-text dark:text-light-color dark:hover:text-light-color dark:hover:bg-light-color-weak/10">
              <HiOutlineCog6Tooth className="text-2xl text-dark-text-weak/70 dark:text-light-color-weak" />
              <h1 className="text-sm">Settings</h1>
            </button>
            {/*  */}
            <div className="w-[90%] h-[1px] bg-stone-200 dark:bg-dark-text-weak/40 mx-auto my-1"></div>
            {/*  */}
            <button className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100 text-dark-text-weak hover:text-dark-text dark:text-light-color dark:hover:text-light-color dark:hover:bg-light-color-weak/10">
              <HiOutlineMegaphone className="text-2xl text-dark-text-weak/70 dark:text-light-color-weak" />
              <h1 className="text-sm">Updates</h1>
            </button>
            {/*  */}
            <div className="w-[90%] h-[1px] bg-stone-200 dark:bg-dark-text-weak/40 mx-auto my-1"></div>
            {/*  */}
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full rounded-xl p-2 flex items-center justify-start gap-2 hover:bg-stone-100 text-dark-text-weak hover:text-dark-text dark:text-light-color dark:hover:text-light-color dark:hover:bg-light-color-weak/10"
            >
              {loading ? (
                <>
                  <LuLoaderCircle className="text-2xl text-dark-text-weak/70 dark:text-light-color-weak animate-spinLoader" />
                  <h1 className="text-sm">Sign Out</h1>
                </>
              ) : (
                <>
                  <HiOutlineArrowRightStartOnRectangle className="text-2xl text-dark-text-weak/70 dark:text-light-color-weak" />
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
