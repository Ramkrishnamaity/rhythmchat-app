import React from 'react'
import { IoIosSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { MdKeyboardVoice } from "react-icons/md";

const ChatFooter: React.FC = () => {


  return (
    <div className='xs:pb-2 pb-1 xs:px-3 px-2 w-full h-[40px] xs:rounded-b-xl flex justify-between items-center gap-1'>
      <input type='text'
        className='px-2 w-full rounded-md bg-wrapper text-black xs:text-sm text-xs xs:h-[34px] h-[31px] outline-none'
      />
      <div className='flex items-center justify-between xs:gap-2 gap-1 w-max h-full'>
        <button className='bg-wrapper p-[7px] rounded-md xs:text-[18px] text-[15px]'>
          <GrAttachment />
        </button>
        <button className='bg-wrapper p-[6px] rounded-md xs:text-[20px] text-[17px]'>
          <MdKeyboardVoice />
        </button>
        <button className='bg-wrapper p-[6px] rounded-md xs:text-[20px] text-[17px]'>
          <IoIosSend />
        </button>
      </div>

    </div>
  )
}

export default ChatFooter