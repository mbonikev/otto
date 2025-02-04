const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  return (
    <div className="h-screen flex justify-start items-center flex-col p-5">
      <div className="w-full h-fit flex">
        <img src="./logo.png" className="h-9" />
      </div>
      <a href={`${backendUrl}/auth/google`} className="bg-blue-500 text-white p-3 rounded">
        Continue with Google
      </a>
    </div>
  );
};

export default Login;
