import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import NotificationCard from "../card/NotificationCard";
import { NotificationType } from "../../lib/types/Notification";
import { toast } from "react-toastify";
import { CommonResponseType } from "../../lib/types";
import { endpoints } from "../../lib/utils/Endpoint";
import { getRequest } from "../../lib/utils/HttpsClient";
import { Socket } from "socket.io-client";
import Skeleton from "../common/Skeleton";
import { useAppSelector } from "../../redux/hooks";

interface ModalPropsType {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    socket: Socket | null
}

const NotificationModal: React.FC<ModalPropsType> = ({ setOpenModal, socket }) => {

    const { profile } = useAppSelector(state => state.user);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [notification, setNotification] = useState<NotificationType[]>([]);
    const scrollableRef = useRef<HTMLDivElement | null>(null);

    async function getNotification() {
        try {
            if (page > maxPage) return;
            setLoading(true);
            const response: CommonResponseType<NotificationType[]> = await getRequest(`${endpoints.getNotification}?page=${page}`);
            if (response.status) {
                setLoading(false);
                setNotification(prev => [...prev, ...response.data ?? []]);
                response.totalPage && setMaxPage(response.totalPage);
                socket?.emit("notify-me", profile?._id);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleScroll = () => {
        const viewWindow = scrollableRef.current?.clientHeight;
        const viewHeight = scrollableRef.current?.scrollHeight;
        const scrollTop = scrollableRef.current?.scrollTop;
        if (viewHeight && viewWindow && scrollTop) {
            if (scrollTop + viewWindow + 1 >= viewHeight) {
                setPage(prev => prev + 1);
            }
        }
    };

    useEffect(() => {
        getNotification();
    }, [page]);

    useEffect(() => {
        setTimeout(() => {
            scrollableRef.current?.addEventListener("scroll", handleScroll);
        }, 500);
    }, []);

    return (
        <div className='z-10 lg:rounded-3xl rounded-none fixed overflow-auto top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-10 backdrop-blur-sm'>
            <div className='xs:h-[calc(100%-35px)] h-full w-full rounded-sm xs:w-[400px] bg-wrapper'>
                <div className='sm:h-[55px] h-[40px]'>
                    <div className='bg-[white] text-xl flex justify-start items-center gap-5 sm:p-4 p-2'>
                        <RxCross2 className='cursor-pointer' onClick={() => setOpenModal(false)} />
                        <p className='text-sm'>Notifications</p>
                    </div>
                </div>

                {
                    notification.length === 0 && !loading ? (
                        <div className='text-center text-sm flex items-center justify-center w-full xs:h-[calc(100%-55px)] h-[calc(100%-40px)]'>
                            Not Found
                        </div>
                    ) : (
                        <div ref={scrollableRef} className='w-full show-scrollbar1 xs:h-[calc(100%-55px)] h-[calc(100%-40px)] overflow-y-auto flex flex-col'>
                            {
                                notification.map((item, index) => {
                                    return (<NotificationCard setNotification={setNotification} key={index} data={item} socket={socket} />);
                                })
                            }
                            {
                                loading && <Skeleton color='[white]'/>
                            }
                        </div>
                    )
                }

            </div>
        </div >
    );
};

export default NotificationModal;
