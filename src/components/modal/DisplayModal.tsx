import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import ReactPlayer from "react-player";

interface ModalPropsType {
    type: string
    src: string
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DisplayModal: React.FC<ModalPropsType> = ({ type, src, setOpenModal }) => {
    return (
        <div className='z-10 lg:rounded-3xl rounded-none fixed top-0 left-0 md:pt-14 right-0 bottom-0 bg-[black] flex justify-center items-center'>
            {
                type === "image" ? (
                    <img src={src} className='md:w-[80%] md:h-[90%] object-contain' />
                ) : (
                    <div className="md:w-[80%]">
                        <ReactPlayer
                            url={src}
                            width="100%"
                            height="100%"
                            controls={true}
                            playing={false}
                        />
                    </div>
                )
            }
            <div onClick={() => setOpenModal(false)} className='text-[white] cursor-pointer p-5 absolute sm:top-5 top-0 left-0 sm:left-5'>
                <FaArrowLeft size={20} />
            </div>
        </div>
    );
};

export default DisplayModal;
