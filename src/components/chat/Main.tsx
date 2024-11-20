import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { IoMdDownload } from "react-icons/io";
import { FaCirclePlay } from "react-icons/fa6";
import DisplayModal from "../modal/DisplayModal";

const Main: React.FC = () => {

    const { data } = useAppSelector(state => state.conversation);
    const { profile } = useAppSelector(state => state.user);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [src, setSrc] = useState<string>('');
    const [type, setType] = useState<string>('');

    function changeOpenModal(src: string, type: string) {
        setSrc(src)
        setType(type)
        setOpenModal(true)
    }

    return (
        <div className="space-y-5 py-2 text-xs leading-1">
            {
                data?.map((item, index) => {
                    if (item.user._id === profile?._id) {
                        return (
                            <div key={index} className='xs:px-4 px-2 flex justify-end items-end' >
                                {
                                    item.type !== "text" ? (
                                        item.type !== "video" ? (
                                            <div className="relative sm:w-[250px] w-[200px]" onClick={() => changeOpenModal(item.message, "image")}>
                                                <img src={item.message} className="rounded-lg border border-blue" />
                                                <div onClick={(e) => e.stopPropagation()}
                                                    className="absolute top-0 right-0 w-7 h-7 flex items-center justify-center rounded-full bg-[black] text-[white]">
                                                    <IoMdDownload size={20} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative sm:w-[250px] w-[200px]" onClick={() => changeOpenModal(item.message, "video")}>
                                                <img src={item.thumbnail} className="rounded-lg border border-blue" />
                                                <div onClick={(e) => e.stopPropagation()}
                                                    className="absolute top-0 right-0 w-7 h-7 flex items-center justify-center rounded-full bg-[black] text-[white]">
                                                    <IoMdDownload size={20} />
                                                </div>
                                                <div className="absolute text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                    <FaCirclePlay size={30} />
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <p className="bg-[white] border border-blue break-words p-3 w-max max-w-[80%] rounded-l-lg rounded-t-lg">{item.message}</p>
                                    )
                                }

                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className='xs:px-4 px-2 flex justify-start items-end gap-1' >
                                <div className="w-[25px] h-[25px]">
                                    <img src={item.user.image} className='w-full h-full object-contain rounded-full' />
                                </div>
                                <p className="bg-[white] border border-blue break-words p-3 w-max rounded-r-lg rounded-t-lg">{item.message}</p>
                            </div>
                        );
                    }
                })
            }
            {/* display modal */}
            {
                openModal && (<DisplayModal type={type} src={src} setOpenModal={setOpenModal} />)
            }
        </div>
    );
};

export default Main;