import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";


interface ModalPropsType {
    type: string
    src: string
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const DisplayModal: React.FC<ModalPropsType> = ({ type, src, setOpenModal }) => {
    return (
        <div className='z-10 lg:rounded-3xl rounded-none fixed top-0 left-0 right-0 bottom-0 bg-[black]'>
            {
                type === 'image' && (
                    <img src={src} className='md:w-full h-full object-contain lg:rounded-3xl rounded-none' />
                )
            }
            <div onClick={()=> setOpenModal(false)} className='text-[white] cursor-pointer p-5 absolute sm:top-5 top-0 left-0 sm:left-5'>
                <FaArrowLeft size={20}/>
            </div>
        </div>
    )
}

export default DisplayModal
