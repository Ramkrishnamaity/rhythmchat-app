import React from 'react'
import { MembersResponseType } from '../../lib/types/Profile'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { FaPlus } from "react-icons/fa6"
import { FaCheck } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa"
import { setConversationId, setConversationProfile, setProfileChange } from '../../redux/slices/Conversation'

interface CardPropsType {
    sendRequest(data: { senderId: string; receiverId: string; }): void
    setMembers: React.Dispatch<React.SetStateAction<MembersResponseType[]>>
    setRight: React.Dispatch<React.SetStateAction<string>>
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    data: MembersResponseType,
    key: number
}

const MemberCard: React.FC<CardPropsType> = ({ data, sendRequest, setMembers, setRight, setOpenModal }) => {


    const dispatch = useAppDispatch()
    const { profile } = useAppSelector(state => state.user)
    const conversation = useAppSelector(state => state.conversation)
    const conversations = useAppSelector(state => state.conversations)

    async function clickHandler() {
        if (data.isFriend) {
            const conversationData = conversations.data.filter(ele => ele.user?._id === data._id)
            if (conversationData.length === 1) {
                dispatch(setConversationId(conversationData[0]._id))
                if (!conversation.profile || conversation.profile._id !== data._id) {
                    dispatch(setProfileChange(true))
                    const profileData = {
                        _id: data._id,
                        isGroup: false,
                        name: `${data.firstName} ${data.lastName}`,
                        image: data.image
                    }
                    dispatch(setConversationProfile(profileData))
                }
                setOpenModal(false)
                setRight('Chats')
            }
        } else {
            if (data.isInvited) {
                console.log('already invited')
            } else {
                const input = { senderId: profile?._id ?? '', receiverId: data._id }
                sendRequest(input)
                setMembers(prev =>
                    prev.reduce((accumulator: MembersResponseType[], member: MembersResponseType) => {
                        if (member._id === data._id) {
                            accumulator.push({
                                ...member, isInvited: true
                            })
                        } else {
                            accumulator.push(member)
                        }
                        return accumulator
                    }, [])
                )
            }
        }
    }

    return (
        <div className='border-b border-[white] xs:px-5 px-1 xs:py-4 py-3 space-y-2'>
            <div className='flex items-center justify-start xs:gap-4 gap-2'>
                <div>
                    <img src={data.image} className='xs:w-[50px] w-[35px] xs:h-[50px] h-[35px] object-cover rounded-full' />
                </div>
                <div className='xs:text-sm text-xs'>
                    <p className='text-black'>{data.firstName} {data.lastName}</p>
                    <p>{data.about.length > 15 ? `${data.about.substring(0, 13)}..` : data.about}</p>
                </div>
            </div>
            <button onClick={clickHandler}
                className={`${data.isFriend ? 'bg-[white] text-black' : data.isInvited ? 'bg-[white] text-black' : 'bg-blue'} xs:ml-16 ml-10 text-[white] flex items-center justify-between gap-2 text-xs xs:text-sm xs:py-2 py-1 xs:px-5 px-2 rounded-md`}>
                {
                    data.isFriend ? 'Continue to Chat' : data.isInvited ? 'already invited' : 'Invite'
                }
                {
                    data.isFriend ? <FaArrowRight /> : data.isInvited ? <FaCheck /> : <FaPlus />
                }
            </button>
        </div>
    )
}

export default MemberCard
