const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="w-full h-fit flex p-2">
        <img src="./logo.png" className="h-12" />
      </div>
      <a href={`${backendUrl}/auth/google`} className="bg-blue-500 text-white p-3 rounded">
        Continue with Google
      </a>
    </div>
  );
};

export default Login;
