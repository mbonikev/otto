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
        <div className="h-full flex-1 flex flex-col items-start justify-start gap-6 w-full p-6">
          <Link to={"/"} className="w-fit h-fit flex gap-2">
            <img src="./logo.png" className="h-9" />
            <h1 className="font-Kanit text-2xl font-light text-dark-text-weak dark:text-light-color-weak text-center">
              Otto
            </h1>
          </Link>
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-3">
            <h1 className="text-3xl font-semibold max-2xl:text-2xl mb-4 text-dark-text dark:text-light-color">
              Welcome back
            </h1>
            <a
              href={`${backendUrl}/auth/google`}
              className="bg-white dark:bg-body-dark hover:bg-stone-200 dark:hover:bg-card-hover-dark ring-1 ring-stone-200 dark:ring-card-hover-dark text-dark-text dark:text-light-color py-2 px-3 w-fit min-w-[230px] max-md:min-w-fit max-md:pr-5 max-lg:text-sm flex items-center justify-start gap-3 rounded-full"
            >
              <FcGoogle className="text-3xl" />
              Continue with Google
            </a>
          </div>
          <div className="w-full flex items-center justify-between p-1 flex-wrap gap-3 max-lg:justify-center">
            <h1 className="text-dark-text-weak dark:text-light-color-weak text-sm font-medium">
              &copy; Otto 2025. All rights reserved.
            </h1>
            <div className="flex items-center justify-end gap-3 text-dark-text-weak dark:text-light-color-weak text-sm">
              <Link to="/">Terms of Use</Link>|
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="w-3/5 h-full max-xl:hidden flex flex-col items-end justify-center gap-6 bg-stone-100 dark:bg-card-dark-1/40 overflow-hidden p-2 relative">
          <h1 className="absolute top-5 right-7 z-10 text-dark-text-weak dark:text-light-color-weak text-sm flex items-center gap-2 font-medium">
            <FaPlay className="text-xs opacity-40" />
            Demo
          </h1>
          <div className="w-full h-full overflow-hidden rounded-[30px] shadow-xl shadow-stone-200 dark:shadow-black/60 relative">
            <div className="w-full h-full rounded-3xl bg-white p-10">
              <ReactPlayer
                url="/assets/tutorial.mp4"
                controls={false}
                muted={true}
                loop={true}
                playing={true}
                width="100%"
                height="100%"
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload", // Prevents downloading
                      preload: "auto", // Preloads video for better quality
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
