import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/common/NotFound";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/common/Home";
import Protector from "./components/common/Protector";
import SignUp from "./pages/auth/SignUp";
import { useAppDispatch } from "./redux/hooks";
import { setStatus } from "./redux/slices/InternetStatus";
import Reset from "./pages/auth/Reset";

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {

    const handleOnline = () => {
      // console.log("online");
      dispatch(setStatus(true));
    };

    const handleOffline = () => {
      // console.log("offline");
      dispatch(setStatus(false));
    };

    window.addEventListener("online", handleOnline);

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className='font-poppins z-0 flex justify-center items-center w-[100vw] min-h-[100vh]'>

      <Routes>
        <Route path="/" element={<Protector><Home /></Protector>} />
        <Route path="/dashboard" element={<Protector><Dashboard /></Protector>} />
        <Route path="/login" element={<Protector><Login /></Protector>} />
        <Route path="/signup" element={<Protector><SignUp /></Protector>} />
        <Route path="/reset-password/:token" element={<Reset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );

};

export default App;
