import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CommonResponseType } from "../../lib/types";
import { ConversationType } from "../../lib/types/Conversation";
import { getRequest } from "../../lib/utils/HttpsClient";
import { endpoints } from "../../lib/utils/Endpoint";
import { toast } from "react-toastify";
import Main from "../chat/Main";
import ChatHeader from "../chat/ChatHeader";
import ChatFooter from "../chat/ChatFooter";
import { setConversationData, setProfileChange } from "../../redux/slices/Conversation";
import { Socket } from "socket.io-client";
import ChatSkeleton from "../common/ChatSkeleton";

interface PropsType {
    modifyConversations: (str: string) => void
    socket: Socket | null
}

const Chat: React.FC<PropsType> = ({ socket, modifyConversations }) => {

    const dispatch = useAppDispatch();
    const { _id, data, isProfileChange } = useAppSelector(state => state.conversation);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const { token } = useAppSelector(state => state.user);
    const chatContainer = useRef<null | HTMLInputElement>(null);

    async function getConversation() {
        try {
            // setLoading(true);
            const response: CommonResponseType<ConversationType> = await getRequest(`${endpoints.getConversations}/${_id}?page=${page}`, { headers: { authorization: token } });
            if (response.status) {
                response.data && dispatch(setConversationData(response.data.reverse()));
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(response.message);
            }
        } catch (error) {
            setLoading(false);
            setPage(1)
            console.log(error);
        }
    }

    function scrollToBottom() {
        if (chatContainer.current) {
            chatContainer.current.scrollTop = chatContainer.current?.scrollHeight;
        }
    }

    useEffect(() => {
        if (isProfileChange || !data) {
            getConversation();
        } else setLoading(false);
        dispatch(setProfileChange(false));
    }, []);

    useEffect(() => {
        scrollToBottom();
    });

    return (
        <div className='relative bg-[white] text-black text-sm sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] w-full h-full xs:rounded-xl'>
            <ChatHeader modifyConversations={modifyConversations} socket={socket} />
            <div className='xs:px-3 xs:pb-2 pb-1  h-[calc(100%-95px)]'>
                <div ref={chatContainer} className='bg-wrapper xs:rounded-t-xl xs:rounded-b-md w-full h-full show-scrollbar3 overflow-y-auto' >
                    {
                        loading ? <ChatSkeleton color='[white]' /> : <Main />
                    }
                </div>
            </div>
            <ChatFooter socket={socket} />
        </div>
    );
};

export default Chat;
