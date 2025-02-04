const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;
  document.title = "Login - Otto";
  return (
    <div className="h-screen flex justify-start items-center flex-col p-5">
      <div className="w-full h-fit flex gap-2">
        <img src="./logo.png" className="h-9" />
        <h1 className="font-Kanit text-2xl font-light text-dark-text-weak text-center">
          Otto
        </h1>
      </div>
      <div className="w-full h-full grid grid-cols-2 max-lg:grid-cols-1">
        <div className="h-full flex-1 flex flex-col items-center justify-center gap-6 w-full py-14">
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <a
            href={`${backendUrl}/auth/google`}
            className="bg-blue-500 text-white p-3 w-fit"
          >
            Continue with Google
          </a>
        </div>
        <div className="flex-1 flex flex-col items-center gap-6 w-full py-14"></div>
      </div>
    </div>
  );
};

export default Login;
