import React, { useState, useEffect } from "react";
import { HiMiniMagnifyingGlass, HiMiniXCircle } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { RiLoader2Fill } from "react-icons/ri";
import { PiChatsCircleFill } from "react-icons/pi";

function LoginModal() {
  return (
    <div className="w-[320px] h-[300px] p-2">
      <div className="w-full h-full bg-white dark:bg-card-dark-1 text-dark-text dark:text-light-color rounded-2xl p-5 flex flex-col">
        <div className="h-12 w-fit">
          <img src="/logo.png" alt="" className="h-full w-auto" />
        </div>
        <p className="text-xl text-dark-text dark:text-light-color">
          Log in to access your account and enable full feature functionality.
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
