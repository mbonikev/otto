import React from "react";

function Login() {
  const loginWithGoogle = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_API;
    window.location.href = `${apiUrl}/auth/google`;
  };
  return (
    <div>
      <button onClick={loginWithGoogle}>Continue with Google</button>;
    </div>
  );
}

export default Login;
