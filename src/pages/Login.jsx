import { FaGoogle, FaPlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;
  document.title = "Login - Otto";
  return (
    <div className="h-svh flex justify-start items-center flex-col">
      <div className="w-full h-full flex p-3 gap-3">
        <div className="h-full flex-1 flex flex-col items-start justify-start gap-6 w-full p-6">
          <Link to={"/"} className="w-fit h-fit flex gap-2">
            <img src="./logo.png" className="h-8" />
            <h1 className="font-Kanit text-xl font-medium text-dark-text dark:text-light-color text-center">
              Otto
            </h1>
          </Link>
          <div className="w-full flex-1 flex flex-col items-start justify-start gap-3 pt-[5vh]">
            <h1 className="text-3xl font-semibold max-2xl:text-2xl mb-4 text-dark-text dark:text-light-color">
              Log in to your account
            </h1>
            <a
              href={`${backendUrl}/auth/google`}
              className="bg-white dark:bg-card-dark-1 hover:bg-stone-200 dark:hover:bg-card-hover-dark ring-1 ring-stone-200 dark:ring-card-dark-1 text-dark-text dark:text-light-color py-2 px-3 w-full max-md:min-w-fit max-md:pr-5 max-lg:text-sm flex items-center justify-center gap-3 rounded-full"
            >
              <FcGoogle className="text-3xl" />
              Continue with Google
            </a>
          </div>
          <div className="w-full flex items-center justify-between p-1 flex-wrap gap-2 max-lg:justify-center">
            <h1 className="text-dark-text-weak dark:text-light-color-weak text-sm font-medium">
              &copy; Otto 2025. All rights reserved.
            </h1>
            <div className="flex items-center justify-end gap-3 text-dark-text-weak dark:text-light-color-weak text-sm">
              <Link to="/">Terms of Use</Link>|
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="w-[72%] h-full max-xl:hidden flex flex-col items-end justify-center gap-6 overflow-hidden relative">
          <div className="bg-stone-100 dark:bg-card-dark-1/40 w-full h-full rounded-2xl "></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
