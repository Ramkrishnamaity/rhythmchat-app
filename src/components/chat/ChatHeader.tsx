import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../common/Image";
import { FaArrowLeft } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { removeConversationId } from "../../redux/slices/Conversation";

interface PropsType {
  modifyConversations: (str: string) => void
}

const ChatHeader: React.FC<PropsType> = ({modifyConversations}) => {

  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(state => state.conversation);

  const clickHandler = useCallback(() => {
    modifyConversations("all");
    dispatch(removeConversationId());
  }, []);

  return (
    <div className='bg-[white] w-full h-[55px] xs:p-2 p-1 flex items-center justify-between rounded-t-xl'>
      {
        profile && (
          <>
            <div className='flex items-center justify-between gap-2'>
              <div onClick={clickHandler} className='cursor-pointer'>
                <FaArrowLeft className='text-sm' />
              </div>
              <div className='text-sm text-black font-bold uppercase sm:tracking-wider tracking-wide flex gap-3 items-center'>
                <div className='rounded-full cursor-pointer'>
                  <Image src={profile.image} className='w-[30px] h-[30px] object-cover rounded-full' />
                </div>
                <div>
                  <p className='cursor-pointer'>{profile.name}</p>
                  <p className='opacity-70 text-xs lowercase'>Online</p>
                </div>
              </div>
            </div>
            <div className='text-black font-bold cursor-pointer'>
              <CiMenuKebab size={25} />
            </div>
          </>
        )
      }
    </div>
  );
};

export default ChatHeader;