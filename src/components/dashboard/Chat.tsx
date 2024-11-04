import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { CommonResponseType } from '../../lib/types'
import { ConversationType } from '../../lib/types/Conversation'
import { getRequest } from '../../lib/utils/HttpsClient'
import { endpoints } from '../../lib/utils/Endpoint'
import { toast } from 'react-toastify'
import Skeleton from '../common/Skeleton'
import Main from '../chat/Main'
import ChatHeader from '../chat/ChatHeader'
import ChatFooter from '../chat/ChatFooter'
import { setConversationData, setProfileChange } from '../../redux/slices/Conversation'

interface PropsType {
    modifyConversations: (str: string) => void
}

const Chat: React.FC<PropsType> = ({modifyConversations}) => {


    const dispatch = useAppDispatch()
    const { _id, data, isProfileChange } = useAppSelector(state => state.conversation)
    const [loading, setLoading] = useState<boolean>(false)
    const { token } = useAppSelector(state => state.user)

    async function getConversation() {
        try {
            setLoading(true)
            const response: CommonResponseType<ConversationType> = await getRequest(`${endpoints.getConversations}/${_id}`, { headers: { authorization: token } })
            if (response.status) {
                response.data && dispatch(setConversationData(response.data))
                setLoading(false)
            } else {
                setLoading(false)
                toast.error(response.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        if (isProfileChange || !data) getConversation()
        dispatch(setProfileChange(false))
    }, [])


    return (
        <div className='bg-[white] text-black text-sm sm:w-[calc(70%-6px)] md:w-[calc(70%-10px)] w-full h-full xs:rounded-xl'>
            <ChatHeader modifyConversations={modifyConversations}/>
            <div className='xs:px-3 xs:pb-2 pb-1 show-scrollbar2 h-[calc(100%-95px)] overflow-y-auto'>
                <div className='bg-wrapper xs:rounded-t-xl xs:rounded-b-md w-full h-full'>
                    {
                        loading ? <Skeleton color='[white]' /> : <Main />
                    }
                </div>
            </div>
            <ChatFooter />
        </div>
    )
}

export default Chat
