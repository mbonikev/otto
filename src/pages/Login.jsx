import { FaGoogle, FaPlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;
  document.title = "Login - Otto";
  return (
    <div className="h-svh flex justify-start items-center flex-col max-lg:p-0">
      <div className="w-full h-full flex">
        <div className="h-full flex-1 flex flex-col items-start justify-start gap-6 w-full p-5">
          <Link to={'/'} className="w-fit h-fit flex gap-2">
            <img src="./logo.png" className="h-9" />
            <h1 className="font-Kanit text-2xl font-light text-dark-text-weak text-center">
              Otto
            </h1>
          </Link>
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-3">
            <h1 className="text-3xl font-semibold max-2xl:text-2xl mb-4">
              Welcome back
            </h1>
            <a
              href={`${backendUrl}/auth/google`}
              className="bg-white hover:bg-stone-200 ring-1 ring-stone-200 text-dark-text py-2 px-3 w-fit min-w-[230px] max-md:min-w-fit max-md:pr-5 max-lg:text-sm flex items-center justify-start gap-3 rounded-full"
            >
              <FcGoogle className="text-3xl" />
              Continue with Google
            </a>
          </div>
          <div className="w-full flex items-center justify-between p-0 flex-wrap gap-3 max-lg:justify-center">
            <h1 className="text-dark-text-weak text-sm font-medium">
              &copy; Otto 2025. All rights reserved.
            </h1>
            <div className="flex items-center justify-end gap-3 text-dark-text-weak text-sm">
              <Link to="/">Terms of Use</Link>|
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="w-3/5 h-full max-xl:hidden flex flex-col items-end justify-center gap-6 overflow-hidden p-3 bg-stone-100.0">
          <div className="w-full h-fit object-contain overflow-hidden rounded-[30px] ring-1 ring-stone-200 relative">
            <h1 className="absolute top-8 right-8 text-dark-text-weak text-sm flex items-center gap-2 font-medium">
              <FaPlay className="text-xs opacity-40" />
              Demo
            </h1>
            <div className="w-full h-full object-contain overflow-hidden rounded-3xl bg-white p-5">
              <div className="h-full w-full">
                <ReactPlayer
                  url="./assets/tutorial.mp4"
                  controls={false}
                  muted={true}
                  loop={true}
                  playing={true}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
