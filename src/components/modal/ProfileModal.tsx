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
            <div className='relative xs:py-5 py-3 h-full w-full xs:rounded-xl sm:h-[95%] xs:-[90%] xs:w-[80%] bg-wrapper'>
                <div onClick={() => clickHandler(false)} className='absolute xs:top-5 top-2 left-3 cursor-pointer'>
                    <IoIosArrowBack className='text-xl' />
                </div>
                <div>
                    <div className='relative boxshadow p-1 sm:w-[150px] xs:w-[100px] w-[80px] xs:h-[100px] sm:h-[150px] h-[80px] mx-auto rounded-full cursor-pointer'
                        onClick={() => setOpenModal(true)}
                    >
                        <img src={profileData?.image ?? ''} className='w-full h-full object-contain rounded-full' />
                    </div>
                    <p className='text-center font-bold text-xl mt-2'>{profileData?.firstName} {profileData?.lastName}</p>
                    <div>
                        <p>{profileData?.email}</p>
                        <p>{profileData?.about}</p>
                    </div>
                    <div onClick={handleFavoriteBtn} className='flex justify-start items-center gap-2'>
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
                    <div className='flex justify-start items-center gap-2'>
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