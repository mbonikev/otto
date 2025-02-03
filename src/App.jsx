import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

function App() {
  React.useEffect(() => {
    if (!window.location.hash) {
      window.location.replace(window.location.origin + "/");
    }
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
