import React, { useEffect, useState } from "react";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector } from "../../redux/hooks";
import { FaPlus } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import NewChatModal from "../modal/NewChatModal";
import NotificationModal from "../modal/NotificationModal";
import { Socket } from "socket.io-client";
// @ts-ignore
import soundFile from "../../assets/notification.mp3";
import Image from "../common/Image";

interface DashboardHeaderProps {
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>
    setRight: React.Dispatch<React.SetStateAction<string>>
    showNavbar: boolean
    socket: Socket | null
}

const Header: React.FC<DashboardHeaderProps> = ({ socket, setRight, setShowNavbar, showNavbar }) => {

    const { profile } = useAppSelector(state => state.user);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModal2, setOpenModal2] = useState<boolean>(false);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);
    const [notify, setNotify] = useState<number>(0);

    function sendRequest(data: { senderId: string, receiverId: string }) {
        socket?.emit("send-request", data);
    }

    useEffect(() => {
        socket?.on("notify", (data: number) => {
            console.log("notification", data);
            setNotify(data);
            if (notify < data) {
                if (!isFirstLoad) {
                    new Audio(soundFile).play();
                    setFirstLoad(false);
                }
            }
        });
    }, [socket]);

    return (
        <div className='w-full text-lowBlack md:h-[50px] h-[40px] py-2 px-3 flex justify-between items-center xs:rounded-xl bg-[white]'>
            <div>
                <span
                    onClick={() => setShowNavbar((prev) => !prev)}
                    className='sm:hidden text block cursor-pointer'>
                    {
                        showNavbar ? <RxCross2 size={23} /> : <HiBars3CenterLeft size={25} />
                    }
                </span>
                <div className='hidden text-md text-black font-bold uppercase tracking-wider sm:flex gap-3 items-center'>
                    <div className='rounded-full cursor-pointer' onClick={() => setRight("Profile")}>
                        <Image src={profile?.image ?? ""} className='w-[35px] h-[35px] object-cover rounded-full' />
                    </div>
                    <p>{profile?.firstName} {profile?.lastName}</p>
                </div>
            </div>
            <div className='flex items-center md:gap-4 gap-3'>
                <button onClick={() => setOpenModal(true)}
                    className='bg-blue rounded-md text-[white] sm:px-2 px-1 py-1 sm:py-[6px] flex items-center justify-between gap-2'>
                    <p><FaPlus size={12} /></p>
                    <p className='sm:block hidden tracking-wider text-xs'>New Chat</p>
                </button>
                <div className='relative cursor-pointer' onClick={() => setOpenModal2(true)}>
                    <IoMdNotificationsOutline className='text-blue sm:text-3xl text-2xl' />
                    <div className={`absolute sm:w-[6px] w-[5px] sm:h-[6px] h-[5px] rounded-full bg-[red] sm:top-[5px] top-1 sm:right-[5px] right-1 ${notify !== 0 ? "block" : "hidden"}`}></div>
                </div>
            </div>
            {/* modal */}
            {
                openModal && (<NewChatModal setRight={setRight} sendRequest={sendRequest} setOpenModal={setOpenModal} />)
            }
            {
                openModal2 && (<NotificationModal socket={socket} setOpenModal={setOpenModal2} />)
            }
        </div>
    );
};

export default Header;
