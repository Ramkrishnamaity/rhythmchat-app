import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setProfile, setToken } from '../../redux/slices/user'
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { PiChatTextLight } from "react-icons/pi";
import { PiPhoneCallDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5"
import { CgMediaPodcast } from "react-icons/cg";
import ConfirmationModal from '../modal/ConfirmationModal';
import Image from '../common/Image';

interface SidebarPropsType {
    showNavbar: boolean
    right: string
    setRight: React.Dispatch<React.SetStateAction<string>>
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarPropsType> = ({ showNavbar, setShowNavbar, setRight, right }) => {


    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { profile } = useAppSelector(state => state.user)
    const [openModal, setOpenModal] = useState<boolean>(false)

    function logout() {
        //clear browser
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
        //clear the store
        dispatch(setToken(null))
        dispatch(setProfile(null))

        navigate('/')
    }

    return (
        <div className={`bg-[white] hide-scrollbar overflow-x-hidden overflow-y-auto text-lowBlack z-10 xs:text-sm text-xs w-full h-full sm:w-[calc(30%-6px)] md:w-[calc(30%-10px)] xs:rounded-xl ${!showNavbar ? 'hidden' : 'sm:relative absolute'} sm:block`}>

            <div className='w-full min-h-full flex flex-col justify-evenly lg:gap-10 gap-10 py-5 '>
                <div className='ml-5 text-md font-semibold uppercase sm:hidden flex gap-3 items-center'>
                    <div className='rounded-full'>
                        <Image src={profile?.image ?? ''} className='w-[35px] h-[35px] object-cover rounded-full' />
                    </div>
                    <p>{profile?.firstName} {profile?.lastName}</p>
                </div>
                <div className='tracking-widest sm:mt-5 md:mt-4'>
                    <ul className='space-y-10'>
                        <li onClick={() => { setRight('Chats'); setShowNavbar(false) }}
                            className={`${right === 'Chats' && 'border-l-4 text-black'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                            <PiChatTextLight size={22} />
                            <p>Chats</p>
                        </li>
                        <li onClick={() => { setRight('Status'); setShowNavbar(false) }}
                            className={`${right === 'Status' && 'border-l-4 text-black'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                            <CgMediaPodcast size={20} />
                            <p>Status</p>
                        </li>
                        <li onClick={() => { setRight('Calls'); setShowNavbar(false) }}
                            className={`${right === 'Calls' && 'border-l-4 text-black'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                            <PiPhoneCallDuotone size={22} />
                            <p>Calls</p>
                        </li>
                        <li onClick={() => { setRight('Profile'); setShowNavbar(false) }}
                            className={`${right === 'Profile' && 'border-l-4 text-black'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                            <CgProfile size={20} />
                            <p>Profile</p>
                        </li>
                        <li onClick={() => { setRight('Settings'); setShowNavbar(false) }}
                            className={`${right === 'Settings' && 'border-l-4 text-black'} cursor-pointer rounded-sm px-3 py-2 flex items-center gap-2`}>
                            <IoSettingsOutline size={20} />
                            <p>Settings</p>
                        </li>
                    </ul>
                </div>
                <div className='ml-5'>
                    <button
                        onClick={() => setOpenModal(true)}
                        className='text-black flex items-center gap-4'>
                        <span><HiOutlineLogout className='rotate-180' size={15} /></span>
                        Log out
                    </button>
                </div>

            </div>

            {/* modal */}
            {
                openModal && (<ConfirmationModal desc='Are You Want to Logout' btnText='Log Out' triggerFunction={logout} setOpenModal={setOpenModal} />)
            }
        </div >
    )
}

export default Sidebar
