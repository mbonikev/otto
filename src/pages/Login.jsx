import { FaGoogle, FaPlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;
  document.title = "Login - Otto";
  return (
    <div className="h-svh max-lg:min-h-full flex justify-start items-center flex-col bg-sidebar-color">
      <div className="w-full h-full flex flex-1">
        <div className="h-full flex-1 flex flex-col items-center justify-start gap-6 w-full p-10 max-lg:p-5 overflow-auto no_scroll">
          <div className="w-fit flex-1 flex flex-col items-start justify-center gap-1">
            <Link to={"/"} className="w-fit h-fit flex gap-2 mb-8">
              <img src="./logo.png" className="h-8" />
              {/* <h1 className="font-Kanit text-xl font-medium text-dark-text dark:text-light-color text-center">
              Otto
            </h1> */}
            </Link>
            <h1 className="text-2xl font-medium text-dark-text dark:text-light-color">
              Sign in to Otto
            </h1>
            <p className="text-base text-dark-text-weak dark:text-light-color-weak mb-9">
              To enable full feature functionality.
            </p>
            <div className="flex-1 w-full max-h-[240px] flex flex-col gap-1">
              <p className="text-base text-dark-text dark:text-light-color mb-3">
                Continue with:
              </p>
              <a
                href={`${backendUrl}/auth/google`}
                className="bg-transparent hover:bg-stone-200 dark:hover:bg-card-hover-dark/30 ring-1 ring-stone-200 dark:ring-card-dark-1 text-dark-text dark:text-light-color py-[10px] px-3 w-fit min-w-[330px] max-md:min-w-full max-md:pr-5 text-sm flex items-center justify-center gap-2 rounded-2xl transition-all active:scale-95"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </a>
            </div>
            <p className="text-sm text-dark-text-weak dark:text-light-color-weak mt-10 max-w-[300px] mb-7">
              By signing in, you agree to the{" "}
              <a className="underline hover:text-dark-text dark:hover:text-light-color cursor-pointer">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline hover:text-dark-text dark:hover:text-light-color cursor-pointer">
                Privacy Policy.
              </a>
            </p>
            <p className="text-sm text-dark-text-weak dark:text-light-color-weak">
              Need help?{" "}
              <a className=" font-medium text-main-color">Contact support</a>
            </p>
          </div>
        </div>
        <div className="w-1/2 h-full max-xl:hidden flex flex-col items-end justify-center gap-6 overflow-hidden relative">
          <div className="bg-stone-100 dark:bg-red-400 w-full h-full ">
          <img src="./assets/screenshot_dark.png" className="w-fit h-full object-cover object-left-top" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
