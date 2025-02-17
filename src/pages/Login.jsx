import { FaGoogle, FaPlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;
  document.title = "Login - Otto";

  const handleGoogleLogin = async () => {
    // setLoading(true);
    // setError(null);
  
    try {
      const response = await axios.get(`${backendUrl}/auth/google/callback`, {
        withCredentials: false, // We no longer need credentials with cookies
      });
  
      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token); // Store JWT token in localStorage
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // setError(error.response?.data?.message || "Login failed");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="h-svh max-lg:min-h-full flex justify-start items-center flex-col bg-white dark:bg-sidebar-color">
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
              <button
                // href={`${backendUrl}/auth/google`}
                onClick={handleGoogleLogin}
                className="bg-transparent hover:bg-stone-200/50 dark:hover:bg-card-hover-dark/30 ring-1 ring-stone-200 dark:ring-card-dark-1 text-dark-text dark:text-light-color py-[10px] px-3 w-fit min-w-[330px] max-md:min-w-full max-md:pr-5 text-sm flex items-center justify-center gap-2 rounded-2xl transition-all active:scale-95"
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </button>
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
        <div className="login_right_side w-1/2 h-full max-lg:hidden flex flex-col items-end justify-center gap-6 pointer-events-none select-none overflow-hidden pt-10 pl-10 bg-main-color/20 dark:bg-main-color/15 relative">
          <div className="absolute bottom-0 left-0 h-[40%] w-full bg-gradient-to-t dark:from-sidebar-color dark:via-sidebar-color/40 from-white/50 via-white/40"></div>
          <div className=" w-full h-full rounded-tl-[20px] overflow-hidden dark:bg-body-dark py-4 pl-4 hidden dark:block">
            <img
              src="./assets/screenshot_dark.png"
              className="w-fit h-full object-cover object-left-top "
            />
          </div>
          <div className=" w-full h-full rounded-tl-3xl overflow-hidden dark:bg-body-dark bg-white py-4 pl-4 block dark:hidden">
            <img
              src="./assets/screenshot_light.png"
              className="w-fit h-full object-cover object-left-top "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
