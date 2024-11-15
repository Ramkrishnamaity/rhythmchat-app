import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { SlUserFollow, SlArrowRightCircle } from "react-icons/sl";
import { GroupProfileResponceType } from '../../lib/types/Profile'
import { MdBlockFlipped, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useAppSelector } from '../../redux/hooks'
import DisplayModal from './DisplayModal'

interface PropsType {
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>
    groupInfo: GroupProfileResponceType | null
    isFavorite: boolean
    handleFavoriteBtn: () => void
}

const GroupModal: React.FC<PropsType> = ({ groupInfo, clickHandler, isFavorite, handleFavoriteBtn }) => {

    const { profile } = useAppSelector(state => state.conversation);
    const user = useAppSelector(state => state.user);
    const [openModal, setOpenModal] = useState<boolean>(false);

    function formatDateString(dateString?: Date) {
        if (!dateString) return
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    function formatDateString2(dateString?: Date) {
        if (!dateString) return
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        return `${day} ${month}`;
    }

    async function SendFriendRequest() {

    }

    async function goToChat() {

    }


    return (
        <div className='z-10 lg:rounded-3xl rounded-none absolute overflow-auto top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-10 backdrop-blur-sm'>
            <div className='relative xs:py-5 py-3 xs:w-max xs:h-max h-full w-full xs:rounded-xl bg-[white]'>
                <div onClick={() => clickHandler(false)} className='absolute xs:top-5 top-2 left-3 cursor-pointer'>
                    <IoIosArrowBack className='text-xl' />
                </div>
                <div>
                    <div className='relative boxshadow p-1 sm:w-[120px] w-[80px] sm:h-[120px] h-[80px] mx-auto rounded-full cursor-pointer'
                        onClick={() => setOpenModal(true)}
                    >
                        <img src={groupInfo?.image ?? ''} className='w-full h-full object-contain rounded-full' />
                    </div>
                    <p className='text-center font-bold sm:text-xl text-lg mt-2 uppercase'>{groupInfo?.name}</p>
                    <div className='space-y-5 my-3 xs:px-5 px-3'>
                        <div className='relative w-full'>
                            <input type='text' readOnly={true} value={groupInfo?.description} className='px-2 py-1 text-xs tracking-widest outline-none text-lowBlack border rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
                            <p className='text-[10px] text-[black] bg-[white] absolute md:bottom-[24px] bottom-[19px] px-1 left-2'>Description</p>
                        </div>
                        <div className='relative w-full'>
                            <div className='show-scrollbar2 overflow-scroll pt-2 text-xs tracking-widest text-lowBlack border rounded-sm w-full bg-[white] h-[110px]'>
                                {
                                    groupInfo?.members.map((member, index) => {
                                        return (
                                            <div key={index} className='py-2 px-3 flex justify-start gap-2 items-center'>
                                                <img src={member.image} className='w-6 h-6 rounded-full' />
                                                {
                                                    member.userId === user.profile?._id ?
                                                        <p>You</p> :
                                                        <p>{member.firstName}</p>
                                                }
                                                {
                                                    member.userId !== user.profile?._id && (
                                                        !member.isFriend ?
                                                            <p onClick={SendFriendRequest} className='cursor-pointer'>
                                                                <SlUserFollow className='text-md text-blue' />
                                                            </p>
                                                            :
                                                            <p onClick={goToChat} className='cursor-pointer'>
                                                                <SlArrowRightCircle className='text-md text-blue' />
                                                            </p>
                                                    )
                                                }
                                                {
                                                    member.type !== "admin" ?
                                                        <p>{`from ${formatDateString2(member?.createdOn)}`}</p> :
                                                        <p className='text-blue'>Admin</p>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <p className='text-[10px] text-[black] bg-[white] absolute top-[-9px] px-1 left-2'>Members</p>
                        </div>
                    </div>
                    <div className='relative xs:mx-5 mx-3 p-1 pl-8 text-xs'>
                        <div className='absolute top-[6px] left-[11px] w-3 h-3 rounded-full bg-black'></div>
                        {`Created On ${formatDateString(groupInfo?.createdOn)}`}
                    </div>
                    <div onClick={handleFavoriteBtn} className='cursor-pointer xs:mx-5 mx-3 flex justify-start items-center gap-2 p-2'>
                        {
                            isFavorite ? (
                                <>
                                    <MdFavorite className="md:text-xl text-lg text-[crimson]" />
                                    Remove From Favorite
                                </>
                            ) : (
                                <>
                                    <MdFavoriteBorder className="md:text-xl text-lg" />
                                    Add to Favorite
                                </>
                            )
                        }
                    </div>
                    <div className='cursor-pointer xs:mx-5 mx-3 flex justify-start items-center gap-2 p-2'>
                        <MdBlockFlipped className="md:text-xl text-lg" />
                        {
                            profile?.isGroup ? 'leave the Group' : 'Block the User'
                        }
                    </div>
                </div>
            </div>
            {/* display modal */}
            {
                openModal && (<DisplayModal type='image' src={profile?.image ?? ""} setOpenModal={setOpenModal} />)
            }
        </div>
    )
}

export default GroupModal