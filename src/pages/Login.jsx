import React from "react";

function Login() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <div>
      <button onClick={loginWithGoogle}>Continue with Google</button>;
    </div>
  );
}

export default Login;
