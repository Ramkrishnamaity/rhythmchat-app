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

const App: React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("online", () => {
      dispatch(setStatus(true));
    });

    window.addEventListener("offline", () => {
      dispatch(setStatus(false));
    });
  });

  return (
    <div className='font-poppins z-0 flex justify-center items-center w-[100vw] min-h-[100vh]'>

      <Routes>
        <Route path="/" element={<Protector><Home /></Protector>} />
        <Route path="/dashboard" element={<Protector><Dashboard /></Protector>} />
        <Route path="/login" element={<Protector><Login /></Protector>} />
        <Route path="/signup" element={<Protector><SignUp /></Protector>} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );

}; 

export default App;
