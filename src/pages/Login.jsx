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
      <div className="w-full h-full flex p-3">
        <div className="h-full flex-1 flex flex-col items-center justify-start gap-6 w-full p-0">
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
                className="bg-white dark:bg-card-dark-1 hover:bg-stone-200 dark:hover:bg-card-hover-dark ring-1 ring-stone-200 dark:ring-card-dark-1 text-dark-text dark:text-light-color py-2 px-3 w-fit min-w-[330px] max-md:min-w-fit max-md:pr-5 max-lg:text-sm flex items-center justify-center gap-3 rounded-2xl"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </a>
            </div>
            <p className="text-base text-dark-text-weak dark:text-light-color-weak mt-10 max-w-[300px] mb-7">
              By signing in, you agree to the{" "}
              <a className="underline hover:text-dark-text dark:hover:text-light-color cursor-pointer">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline hover:text-dark-text dark:hover:text-light-color cursor-pointer">
                Privacy Policy.
              </a>
            </p>
            <p className="text-base text-dark-text-weak dark:text-light-color-weak">
              Need help?{" "}
              <a className=" font-semibold text-main-color">
                Contact support
              </a>
            </p>
          </div>
          {/* <div className="w-full flex items-center justify-between p-1 flex-wrap gap-2 max-lg:justify-center">
            <h1 className="text-dark-text-weak dark:text-light-color-weak text-sm font-medium">
              &copy; Otto 2025. All rights reserved.
            </h1>
            <div className="flex items-center justify-end gap-3 text-dark-text-weak dark:text-light-color-weak text-sm">
              <Link to="/">Terms of Use</Link>|
              <Link to="/">Privacy Policy</Link>
            </div>
          </div> */}
        </div>
        <div className="w-1/2 h-full max-xl:hidden flex flex-col items-end justify-center gap-6 overflow-hidden relative">
          <div className="bg-stone-100 dark:bg-card-dark-1/40 w-full h-full rounded-2xl "></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
