import { useState } from "react";
import { ConversationsType, MessageConversationType } from "../lib/types/Conversation";
import { addConversationData } from "../redux/slices/Conversation";
import { addConversation, setMessageData } from "../redux/slices/Conversations";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setToken, setProfile } from "../redux/slices/user";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { Socket, connect } from "socket.io-client";


export default function useSocket() {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { profile, token } = useAppSelector(state => state.user);
    const [socket, setSocket] = useState<Socket>(
        connect(import.meta.env.VITE_SOCKET_BASE_URL, { auth: { token } })
    );
    // module.exports = {
    //     apps: [
    //         {
    //             name: "main-server",
    //             script: "dist/MainServer/app.js",
    //             node_args: "-r dotenv/config",
    //             env: {
    //                 DOTENV_CONFIG_PATH: ".env"
    //             },
    //         }, // dotenv -e .env -- pm2 start dist/MainServer/app.js --name main-server
    //         {
    //             name: "socket-server",
    //             script: "dist/SocketServer/app.js",
    //             node_args: "-r dotenv/config",
    //             env: {
    //                 DOTENV_CONFIG_PATH: ".env"
    //             },
    //         }, // dotenv -e .env -- pm2 start dist/SocketServer/app.js --name socket-server
    //         {
    //             name: "upload-server",
    //             script: "dist/UploadServer/app.js",
    //             node_args: "-r dotenv/config",
    //             env: {
    //                 DOTENV_CONFIG_PATH: ".env"
    //             },
    //         } // dotenv -e .env -- pm2 start dist/UploadServer/app.js --name upload-server
    //     ],
    // };
    const logout = (str?: string) => {
        str && toast.error(str);
        //clear browser
        localStorage.removeItem("token");
        localStorage.removeItem("profile");
        //clear the store
        dispatch(setToken(null));
        dispatch(setProfile(null));

        navigate("/");
    }

    const socketErrorHandler = (err: any) => {
        if (err.message === "Logout") {
            logout("Account has another login activity");
        } else if (err.message.length >= 15) {
            localStorage.setItem("token", err.message);
            dispatch(setToken(err.message));
            setSocket(connect(import.meta.env.VITE_SOCKET_BASE_URL,
                { auth: { token: err.message } }
            ));
        } else console.log("Error in Socket: ", err);
    }


    socket.emit("user", profile?._id);

    socket.on("connect_error", socketErrorHandler);

    socket.on("new-chat", (data: ConversationsType) => {
        dispatch(addConversation(data));
    });

    socket.on("new-message-out", (message: MessageConversationType) => {
        dispatch(setMessageData(message));
    });

    socket.on("new-message-in", (message: MessageConversationType) => {
        dispatch(addConversationData(message));
    });


    return socket

}