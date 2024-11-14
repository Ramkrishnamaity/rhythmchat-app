import React, { ChangeEvent, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../redux/hooks";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";

interface PropsType {
  socket: Socket | null
}

const ChatFooter: React.FC<PropsType> = ({ socket }) => {

  const { profile } = useAppSelector(state => state.user);
  const { _id } = useAppSelector(state => state.conversation);
  const [message, setMessage] = useState<string>("");
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const fileInput = useRef<null | HTMLInputElement>(null);

  function SendMessage() {
    const data = {
      conversationId: _id,
      userId: profile?._id,
      user: {
        _id: profile?._id,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        image: profile?.image
      },
      type: "text",
      message
    };
    socket?.emit("message", data);
    setMessage("");
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  async function enterHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const data = {
        conversationId: _id,
        userId: profile?._id,
        user: {
          _id: profile?._id,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          image: profile?.image
        },
        type: "text",
        message
      };
      socket?.emit("message", data);
      setMessage("");
    }
  }

  function pickImageHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      console.log(e.target.files);
    }
  }

  return (
    <div className='relative xs:pb-2 pb-1 xs:px-3 px-2 w-full h-[40px] xs:rounded-b-xl flex justify-between items-center gap-1'>
      <input type='text' onChange={changeHandler} value={message} onKeyUp={enterHandler}
        className='px-2 w-full rounded-md bg-wrapper text-black xs:text-sm text-xs xs:h-[34px] h-[31px] outline-none'
      />
      <div className='flex items-center justify-between xs:gap-2 gap-1 w-max h-full'>
        <button className='bg-wrapper p-[7px] rounded-md xs:text-[18px] text-[15px]'
          onClick={() => setOpenOptions(prev => !prev)}
        >
          <FaRegSmile className={`${openOptions && "text-blue"}`} />
        </button>
        <button className='bg-wrapper p-[6px] rounded-md xs:text-[20px] text-[17px]'
          onClick={()=> fileInput.current?.click()}
        >
          <GrAttachment />
        </button>
        <button className='p-[6px] rounded-md bg-blue xs:text-[20px] text-[17px]' onClick={SendMessage}>
          <IoIosSend className="text-[white]" />
        </button>
      </div>
      <div className={`${openOptions ? "visible" : "hidden"} w-max h-max absolute sm:bottom-12 sm:right-3 bottom-11 xs:right-2 right-0 rounded-lg flex justify-center items-center`}>
        <EmojiPicker
          onEmojiClick={({ emoji }) => {
            setMessage(prev => `${prev}${emoji}`);
          }}
          width={250}
          height={350}
        />
      </div>
      <input type="file" className="hidden" ref={fileInput} onChange={pickImageHandler}/>
    </div>
  );
};

export default ChatFooter;