import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Socket } from 'socket.io-client';
import { ConversationsType } from '../../lib/types/Conversation';
import { getRequest } from '../../lib/utils/HttpsClient';
import { endpoints } from '../../lib/utils/Endpoint';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CommonResponseType } from '../../lib/types';
import { toast } from 'react-toastify';
import Skeleton from '../common/Skeleton';
import ConversationCard from '../card/ConversationCard';
import Chat from './Chat';
import { setConversations } from '../../redux/slices/Conversations';

interface ChatsPropsType {
    socket: Socket | null
    isFirstLoad: boolean
    setIsFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
}


const Chats: React.FC<ChatsPropsType> = ({ socket, isFirstLoad, setIsFirstLoad }) => {


    const dispatch = useAppDispatch()
    const [openSearch, setOpenSearch] = useState<boolean>(false)
    const [searchStr, setSearchStr] = useState<string>('')
    const [tab, setTab] = useState<string>('all')
    const { token } = useAppSelector(state => state.user)
    const [loading, setLoading] = useState<boolean>(false)
    const conversation = useAppSelector(state => state.conversation)
    const conversations = useAppSelector(state => state.conversations)
    const [conversationData, setConversationData] = useState<ConversationsType[]>(conversations.data)


    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setSearchStr(e.target.value)
    }

    function enterHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            console.log("Search String: ", searchStr)
            return
        }
    }

    function clickHandler() {
        setSearchStr('')
        setOpenSearch((prev) => !prev)
    }

    async function getConversation() {
        try {
            setLoading(true)
            const response: CommonResponseType<ConversationsType[]> = await getRequest(endpoints.getConversations, { headers: { authorization: token } })
            if (response.status) {
                if (response.data) {
                    dispatch(setConversations(response.data))
                    setConversationData(response.data)
                }
                setLoading(false)
                setIsFirstLoad(false)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    function modifyConversations(str: string) {
        setTab(str)
        if (str === 'all') {
            setConversationData(conversations.data)
        } else if (str === 'group') {
            setConversationData(conversations.data.filter((conversation => conversation.isGroup === true)))
        } else if (str === 'favorite') {
            setConversationData([])
        }
    }

    useEffect(() => {
        isFirstLoad && getConversation()
    }, [])


    if (conversation._id) {
        return (
            <Chat modifyConversations={modifyConversations}/>
        )
    }

    return (
        <div className='bg-[white] text-black text-sm md:space-y-5 space-y-3 sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] md:p-5 p-3 w-full h-full xs:rounded-xl'>
            <div className='bg-wrapper h-[36px] text-blue p-2 xs:text-xs text-[10px] flex items-center justify-between rounded-md'>
                <button className={`${openSearch && 'w-full'} rounded-sm flex items-center justify-around`}>
                    <input type='text' placeholder='Search' value={searchStr} onChange={changeHandler} onKeyUp={enterHandler}
                        className={`${openSearch ? 'block' : 'hidden'} w-[calc(100%-50px)] h-[30px] bg-wrapper outline-none text-lowBlack`} />
                    <div className='p-1' onClick={clickHandler}>
                        {
                            openSearch ? <RxCross2 size={17} /> : <IoSearchOutline size={18} />
                        }
                    </div>
                </button>
                <div onClick={() => modifyConversations('all')}
                    className={`${openSearch && 'hidden'} cursor-pointer rounded-sm ${tab === 'all' && 'bg-[white]'} md:px-5 xs:px-2 px-1 xs:py-1`} >
                    All
                </div>
                <div onClick={() => modifyConversations('group')}
                    className={`${openSearch && 'hidden'} cursor-pointer rounded-sm ${tab === 'group' && 'bg-[white]'} md:px-5 xs:px-2 px-1 xs:py-1`} >
                    Groups
                </div>
                <div onClick={() => modifyConversations('favorite')}
                    className={`${openSearch && 'hidden'} cursor-pointer rounded-sm ${tab === 'favorite' && 'bg-[white]'} md:px-5 xs:px-2 px-1 xs:py-1`}>
                    Favorites
                </div>
            </div>
            {
                conversationData.length === 0 && !loading ? (
                    <div className='text-center text-sm flex items-center justify-center w-full xs:h-[calc(100%-55px)] h-[calc(100%-40px)]'>
                        You don't have any Conversations yet!
                    </div>
                ) : (
                    <div className='w-full show-scrollbar2 md:h-[calc(100%-56px)] h-[calc(100%-48px)] overflow-y-auto'>
                        {
                            conversationData.map((item, index) => {
                                return (<ConversationCard key={index} data={item} />)
                            })
                        }
                        {
                            loading && <Skeleton color='wrapper' />
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Chats
