import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { AnotherProfileResponceType } from '../../lib/types/Profile'
import { MdBlockFlipped, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useAppSelector } from '../../redux/hooks'
import DisplayModal from './DisplayModal'

interface PropsType {
    clickHandler: React.Dispatch<React.SetStateAction<boolean>>
    profileData: AnotherProfileResponceType | null
    isFavorite: boolean
    handleFavoriteBtn: () => void
}

const ProfileModal: React.FC<PropsType> = ({ clickHandler, profileData, isFavorite, handleFavoriteBtn }) => {

    const { profile } = useAppSelector(state => state.conversation);
    const [openModal, setOpenModal] = useState<boolean>(false);


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
                        <img src={profileData?.image ?? ''} className='w-full h-full object-contain rounded-full' />
                    </div>
                    <p className='text-center font-bold sm:text-xl text-lg mt-2 uppercase'>{profileData?.firstName} {profileData?.lastName}</p>
                    <div className='space-y-5 my-5 xs:px-5 px-3'>
                        <div className='relative w-full'>
                            <input type='text' readOnly={true} value={profileData?.email} className='px-2 py-1 text-xs tracking-widest outline-none text-lowBlack border rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
                            <p className='text-[10px] text-[black] bg-[white] absolute md:bottom-[24px] bottom-[19px] px-1 left-2'>Email</p>
                        </div>
                        <div className='relative w-full'>
                            <input type='text' readOnly={true} value={profileData?.about} className='px-2 py-1 text-xs tracking-widest outline-none text-lowBlack border rounded-sm w-full md:h-[35px] h-[30px] bg-[white]' />
                            <p className='text-[10px] text-[black] bg-[white] absolute md:bottom-[24px] bottom-[19px] px-1 left-2'>About</p>
                        </div>
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
                            profile?.isGroup ? 'Remove From the Group' : 'Block the User'
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

export default ProfileModal