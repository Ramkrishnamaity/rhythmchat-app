import React, { useCallback, useState } from "react";
import { ConversationsType } from "../../lib/types/Conversation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Image from "../common/Image";
import { setConversationProfile, setConversationId, setProfileChange } from "../../redux/slices/Conversation";
import DisplayModal from "../modal/DisplayModal";

interface CardPropsType {
    data: ConversationsType,
    key: number
}

const ConversationCard: React.FC<CardPropsType> = ({ data }) => {

    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.user);
    const conversation = useAppSelector(state => state.conversation);
    const [openModal, setOpenModal] = useState<boolean>(false);

    function formatDateString(dateString: string) {
        const inputDate = new Date(dateString).toLocaleString();
        const date = new Date(inputDate);
        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const weekStart = new Date(today.getTime() - (today.getDay() - 1) * 24 * 60 * 60 * 1000);

        if (isSameDay(date, today)) {
            return formatTime(inputDate);
        } else if (isSameDay(date, yesterday)) {
            return "Yesterday";
        } else if (isSameWeek(date, weekStart)) {
            return getWeekdayName(date);
        } else {
            return formatDate(inputDate);
        }
    }

    function isSameDay(date1: Date, date2: Date) {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    function isSameWeek(date: Date, weekStart: Date) {
        return date.getTime() >= weekStart.getTime() && date.getTime() < weekStart.getTime() + 7 * 24 * 60 * 60 * 1000;
    }

    function formatTime(date: string) {
        const str = date.split(",")[1].split(":");
        return `${str[0]}:${str[1]}`;
    }

    function getWeekdayName(date: Date) {
        const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekdayNames[date.getDay()];
    }

    function formatDate(date: string) {
        return date.split(",")[0];
    }

    const ImageClickHandler = useCallback(() => {
        setOpenModal(true);
    }, []);

    const clickHandler = useCallback(() => {

        dispatch(setConversationId(data._id));
        if (!conversation.profile || (data.isGroup ? (conversation.profile._id !== data._id) : (conversation.profile._id !== data.user?._id))) {
            dispatch(setProfileChange(true));
            let profile: any = {};
            if (data.isGroup) {
                profile = {
                    _id: data._id,
                    isGroup: data.isGroup,
                    name: data.name,
                    image: data.image
                };
            } else {
                profile = {
                    _id: data.user?._id,
                    isGroup: data.isGroup,
                    name: `${data.user?.firstName} ${data.user?.lastName}`,
                    image: data.user?.image
                };
            }
            dispatch(setConversationProfile(profile));
        }

    }, [data]);

    return (
        <div className='relative xs:py-3 xs:text-sm text-black text-xs py-2 rounded-md cursor-pointer flex items-center xs:gap-4 gap-2'>
            <div className='xs:w-[50px] w-[40px] xs:h-[50px] h-[40px] rounded-full'>
                <Image src={data.isGroup ? data?.image ?? "" : data.user?.image ?? ""} className='w-full h-full rounded-full object-cover' onClick={ImageClickHandler} />
            </div>
            <div className='xs:w-[calc(100%-71px)] w-[calc(100%-53px)]' onClick={clickHandler}>
                <div className='flex items-center justify-between xs:pr-2 pr-[2px] w-full text-md capitalize'>
                    {
                        data.isGroup ? (<p>{data.name}</p>) : (<p>{data.user?.firstName} {data.user?.lastName}</p>)
                    }
                    <p className='xs:text-xs text-[8px] opacity-40'>{formatDateString(data.messageData.createdOn)}</p>
                </div>
                <div className='flex items-center justify-between gap-1 xs:pr-5 pr-4 w-full xs:py-1 py-[2px]'>
                    <div className='flex items-center justify-start gap-1 w-[calc(100%-20px)]'>
                        {
                            data.messageData.user._id === profile?._id ? <p className='opacity-40 xs:text-xs text-[10px]'>You: </p> : (data.isGroup && <p className='opacity-40 xs:text-xs text-[10px] capitalize'>{data.messageData.user.firstName}: </p>)
                        }
                        <p className='opacity-40 xs:text-xs text-[10px] text-nowrap overflow-hidden'>
                            {
                                data.messageData.message.length <= 50 ? data.messageData.message : data.messageData.message.substring(0, 50)
                            }
                        </p>
                    </div>
                    {
                        data.messageData.user._id !== profile?._id && <div className='bg-blue rounded-full xs:w-2 w-[6px] xs:h-2 h-[6px]'></div>
                    }

                </div>
            </div>
            <div className='absolute bottom-0 right-0 xs:w-[calc(100%-66px)] w-[calc(100%-48px)] h-[1px] bg-wrapper'></div>
            {/* display modal */}
            {
                openModal && (<DisplayModal type='image' src={data.isGroup ? data?.image ?? "" : data.user?.image ?? ""} setOpenModal={setOpenModal} />)
            }
        </div>
    );
};

export default ConversationCard;
