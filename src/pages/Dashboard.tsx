import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import Chats from "../components/dashboard/Chats";
import Profile from "../components/dashboard/Profile";
import Status from "../components/dashboard/Status";
import Calls from "../components/dashboard/Calls";
import Settings from "../components/dashboard/Settings";
import { Socket, connect } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setToken, setProfile } from "../redux/slices/user";
import InternetStatusCard from "../components/card/InternetStatusCard";
import { initializeNotification } from "../lib/utils/PushNotification";
import { getRequest } from "../lib/utils/HttpsClient";
import { endpoints } from "../lib/utils/Endpoint";

const Dashboard: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [right, setRight] = useState<string>("Chats");
  const { profile, token } = useAppSelector(state => state.user);
  const { online } = useAppSelector(state => state.internet);
  const [socket, setSocket] = useState<Socket | null>(null);

  const logout = useCallback((str?: string) => {
    str && toast.error(str);
    //clear browser
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    //clear the store
    dispatch(setToken(null));
    dispatch(setProfile(null));

    navigate("/");
  }, []);

  const socketErrorHandler = useCallback((err: any) => {
    if (err.message === "Logout") {
      logout("Account has another login activity");
    } else if (err.message.length >= 15) {
      localStorage.setItem("token", err.message);
      dispatch(setToken(err.message));
      setSocket(connect(import.meta.env.VITE_SOCKET_BASE_URL,
        { auth: { token: err.message } }
      ));
    } else console.log("Error in Socket: ", err);
  }, []);

  const checkCredentials = useCallback(async () => {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile");
    if (!token || !profile) {
      logout();
      socket?.disconnect();
    }
  }, [socket]);

  const setDeviceToken = useCallback(async () => {
    try {
      const deviceToken = await initializeNotification();

      if (deviceToken && deviceToken !== profile?.deviceToken) {
        const response = await getRequest(`${endpoints.setDeviceToken}/${deviceToken}`);
        if (!response.status) console.log("error on setDeviceToken api call", response.message);
      }

    } catch (error) {
      console.log("error on setDevice Token function", error);
    }
  }, []);

  useEffect(() => {
    setSocket(connect(import.meta.env.VITE_SOCKET_BASE_URL,
      { auth: { token } }
    ));
    setDeviceToken();
  }, []);

  useEffect(() => {
    socket?.emit("user", profile?._id);

    socket?.on("connect_error", socketErrorHandler);

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    checkCredentials();
  });

  return (
    <div className='backdrop-blur-sm md:w-[799px] w-full h-[100vh] lg:h-[calc(100vh-40px)] xl:h-[calc(100vh-80px)] mx-auto lg:rounded-3xl rounded-none text-[white] bg-wrapper md:p-5 xs:p-3 p-0 tracking-widest text-md md:space-y-5 space-y-3 shadow-lg'>
      {
        online ? (
          <>
            <Header showNavbar={showNavbar} socket={socket} setRight={setRight} setShowNavbar={setShowNavbar} />
            <div className='relative z-0 flex w-full md:h-[calc(100%-70px)] h-[calc(100%-52px)] md:gap-5 gap-3'>
              <Sidebar showNavbar={showNavbar} setShowNavbar={setShowNavbar} setRight={setRight} right={right} />
              {
                right === "Profile" && <Profile />
              }
              {
                right === "Chats" && <Chats socket={socket} isFirstLoad={isFirstLoad} setIsFirstLoad={setIsFirstLoad} />
              }
              {
                right === "Status" && <Status />
              }
              {
                right === "Calls" && <Calls />
              }
              {
                right === "Settings" && <Settings />
              }
            </div>
          </>
        ) : (
          <InternetStatusCard />
        )
      }

    </div>
  );
};

export default Dashboard;
