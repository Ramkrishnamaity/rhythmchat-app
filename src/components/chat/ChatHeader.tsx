import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../common/Image";
import { IoIosArrowBack } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";
import { MdBlockFlipped } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { removeConversationId, setConversationType } from "../../redux/slices/Conversation";
import { Socket } from "socket.io-client";
import ConfirmationModal from "../modal/ConfirmationModal";
import { CommonResponseType } from "../../lib/types";
import { getRequest } from "../../lib/utils/HttpsClient";
import { endpoints } from "../../lib/utils/Endpoint";
import { toast } from "react-toastify";
import { changeFavorite } from "../../redux/slices/Conversations";
import ProfileModal from "../modal/ProfileModal";
import { AnotherProfileResponceType, GroupProfileResponceType, MembersType } from "../../lib/types/Profile";
import GroupModal from "../modal/GroupModal";
import { v4 as UUID } from "uuid";
import { setHostByUser, setRoom } from "../../redux/slices/Room";

interface PropsType {
  socket: Socket | null
  modifyConversations: (str: string) => void
  setRight: React.Dispatch<React.SetStateAction<string>>
}

const ChatHeader: React.FC<PropsType> = ({ modifyConversations, socket, setRight }) => {

  const dispatch = useAppDispatch();
  const { _id, profile, isFavorite } = useAppSelector(state => state.conversation);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<AnotherProfileResponceType | null>(null)
  const [groupInfo, setGroupInfo] = useState<GroupProfileResponceType | null>(null)

  async function profileMethod() {
    try {
      const response: CommonResponseType<AnotherProfileResponceType | GroupProfileResponceType> = await getRequest(`${endpoints.profile}/${profile?._id}?isGroup=${profile?.isGroup}`);
      if (response.status) {
        if (profile?.isGroup && response.data) {
          let groupInfo = response.data as GroupProfileResponceType
          let admins: MembersType[] = []
          const data = groupInfo.members.reduce((accumulator: MembersType[], expense: MembersType) => {
            if (expense.type === "admin") {
              admins.push(expense)
            } else {
              accumulator.push(expense);
            }
            return accumulator;
          }, []);
          groupInfo.members = [...admins, ...data]
          setGroupInfo(groupInfo)
        } else setProfileData(response.data as AnotherProfileResponceType)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function favoriteMethod() {
    try {
      const response: CommonResponseType = await getRequest(`${endpoints.favorite}/${_id}`);
      if (response.status) {
        dispatch(changeFavorite(_id ?? ''))
        dispatch(setConversationType(!isFavorite))
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFavoriteBtn() {
    setOpenOptions(false)
    setOpenModal(true)
  }

  function handleCall() {
    const roomId = UUID()
    socket?.emit('room-invite', {roomId, userId: profile?._id})
  }

  function handleProfileBtn() {
    setOpenOptions(false)
    setOpenProfileModal(true)
  }
  useEffect(() => {
    profileMethod()
  }, [])

  useEffect(() => {
    if (profile?.isGroup) socket?.emit('is-online-ques', profile?._id.toString())
    socket?.on('is-online-ans', (data: boolean) => {
      setIsOnline(data)
    })
  }, [socket])

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
              <div onClick={handleProfileBtn} className='cursor-pointer text-sm text-black font-bold uppercase sm:tracking-wider tracking-wide flex gap-3 items-center'>
                <div className='rounded-full cursor-pointer'>
                  <Image src={profile.image} className='w-[30px] h-[30px] object-cover rounded-full' />
                </div>
                <div>
                  <p >{profile.name}</p>
                  <p className='opacity-70 text-xs lowercase'>
                    {
                      profile.isGroup ? 'tap here for info' : isOnline && 'Online'
                    }
                  </p>
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
                      onClick={handleProfileBtn}
                    >
                      <RiContactsLine className="md:text-xl text-lg" />
                      Profile
                    </li>
                    <li
                      className="cursor-pointer p-2 hover:bg-[white] gap-2 flex justify-start items-center"
                      onClick={handleCall}
                    >
                      <IoCallOutline className="md:text-xl text-lg" />
                      Call
                    </li>
                    <li
                      className="cursor-pointer p-2 hover:bg-[white] gap-2 flex justify-start items-center"
                      onClick={handleFavoriteBtn}
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
      {/* modal */}
      {
        openModal && (<ConfirmationModal desc={isFavorite ? 'Are You Want to remove.' : 'Are You Want to Add.'} btnText={isFavorite ? 'Remove' : 'Add'} triggerFunction={favoriteMethod} setOpenModal={setOpenModal} />)
      }
      {
        openProfileModal && (
          !profile?.isGroup ?
            <ProfileModal handleFavoriteBtn={favoriteMethod} isFavorite={isFavorite} clickHandler={setOpenProfileModal} profileData={profileData} /> :
            <GroupModal handleFavoriteBtn={favoriteMethod} isFavorite={isFavorite} clickHandler={setOpenProfileModal} groupInfo={groupInfo} />
        )
      }
    </div>
  );
};

export default ChatHeader;