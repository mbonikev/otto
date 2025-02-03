const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_API;

  return (
    <div className="h-screen flex justify-center items-center">
      <a href={`${backendUrl}/auth/google`} className="bg-blue-500 text-white p-3 rounded">
        Continue with Google
      </a>
    </div>
  );
};

export default Login;
