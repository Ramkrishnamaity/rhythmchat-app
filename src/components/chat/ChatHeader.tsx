import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../common/Image";
import { IoIosArrowBack } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";
import { MdBlockFlipped } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { removeConversationId } from "../../redux/slices/Conversation";
import { Socket } from "socket.io-client";

interface PropsType {
  socket: Socket | null
  modifyConversations: (str: string) => void
}

const ChatHeader: React.FC<PropsType> = ({ modifyConversations }) => {

  const dispatch = useAppDispatch();
  const { profile, isFavorite } = useAppSelector(state => state.conversation);
  const [openOptions, setOpenOptions] = useState<boolean>(false);

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
                <IoIosArrowBack className='text-xl' />
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
            <div className='text-black font-bold cursor-pointer relative'>
              <div className={`w-max h-max p-1 rounded-full ${openOptions && "bg-wrapper"}`}>
                <CiMenuKebab size={25} onClick={() => setOpenOptions((prev) => !prev)} />
              </div>
              {openOptions && (
                <div className="absolute right-1 top-7 mt-3 p-1 bg-wrapper border-2 border-[white] shadow-lg rounded-md md:w-36 w-32 z-10">
                  <ul className="text-black text-md font-medium">
                    <li
                      className="cursor-pointer p-2 hover:bg-[white] gap-2 flex justify-start items-center"
                    // onClick={() => handleMenuOptionClick('Block')}
                    >
                      <RiContactsLine className="md:text-xl text-lg" />
                      Profile
                    </li>
                    <li
                      className="cursor-pointer p-2 hover:bg-[white] gap-2 flex justify-start items-center"
                    // onClick={() => handleMenuOptionClick('Block')}
                    >
                      <IoCallOutline className="md:text-xl text-lg" />
                      Call
                    </li>
                    <li
                      className="cursor-pointer p-2 hover:bg-[white] gap-2 flex justify-start items-center"
                    // onClick={() => handleMenuOptionClick('Block')}
                    >
                      {
                        isFavorite ? (
                          <>
                            <MdFavorite className="md:text-xl text-lg" />
                            Remove
                          </>
                        ) : (
<>
                            <MdFavoriteBorder className="md:text-xl text-lg" />
                            Add
                          </>
                        )
                      }
                    </li>
                    <li
                      className="cursor-pointer p-2 hover:bg-[white] gap-2 flex justify-start items-center"
                    // onClick={() => handleMenuOptionClick('Block')}
                    >
                      <MdBlockFlipped className="md:text-xl text-lg" />
                      Block
                    </li>
                    <li
                      className="cursor-pointer p-2 hover:bg-[white]"
                    // onClick={() => handleMenuOptionClick('Report')}
                    >
                      More..
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        )
      }
    </div>
  );
};

export default ChatHeader;