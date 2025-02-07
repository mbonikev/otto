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
        <p className="text-xl text-dark-text dark:text-light-color mb-20">
          Log in to enable full feature functionality.
        </p>
        <a
          href={`${backendUrl}/auth/google`}
          className="bg-transparent ring-1 ring-stone-200 text-dark-text dark:ring-card-hover-dark dark:text-light-color py-2 px-3 w-full fit max-md:pr-5 max-lg:text-sm flex items-center justify-start gap-3 rounded-full"
        >
          <FcGoogle className="text-3xl" />
          Continue with Google
        </a>
      </div>
    </div>
  );
}

export default LoginModal;
