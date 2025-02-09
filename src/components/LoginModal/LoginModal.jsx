import React, { useState, useEffect } from "react";
import { HiMiniMagnifyingGlass, HiMiniXCircle } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { RiLoader2Fill } from "react-icons/ri";
import { PiChatsCircleFill } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";

function LoginModal() {
  const backendUrl = import.meta.env.VITE_BACKEND_API;
  return (
    <div className="w-[320px] h-fit p-0">
      <div className="w-full h-full bg-white dark:bg-card-dark-1 text-dark-text dark:text-light-color rounded-3xl p-5 flex flex-col gap-3">
        <div className="h-12 w-fit">
          <img src="/logo.png" alt="" className="h-full w-auto" />
        </div>
        <p className="text-xl text-dark-text dark:text-light-color mb-10">
          Log in to enable full feature functionality.
        </p>
        <a
          href={`${backendUrl}/auth/google`}
          className="bg-transparent hover:bg-stone-200/50 dark:hover:bg-card-hover-dark/30 ring-1 ring-stone-200 dark:ring-card-dark-1 text-dark-text dark:text-light-color py-2 px-3 w-full max-md:pr-5 text-sm flex items-center justify-center gap-2 rounded-2xl transition-all active:scale-95"
        >
          <FcGoogle className="text-3xl" />
          Continue with Google
        </a>
      </div>
    </div>
  );
}

export default LoginModal;
