import React from 'react'
import { NotificationType } from '../../lib/types/Notification'
import { FaCheck } from "react-icons/fa"
import { Socket } from 'socket.io-client'

interface CardPropsType {
    setNotification: React.Dispatch<React.SetStateAction<NotificationType[]>>
    data: NotificationType,
    key: number
    socket: Socket | null
}

const NotificationCard: React.FC<CardPropsType> = ({ data , socket, setNotification}) => {


    function timeAgo(dateStr: string): string {
        const date = new Date(dateStr)
        const now = new Date()
        const diff = now.getTime() - date.getTime()

        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const years = Math.floor(days / 365)

        if (years > 0) {
            return years === 1 ? "1 year ago" : `${years} years ago`
        } else if (days > 0) {
            return days === 1 ? "1 day ago" : `${days} days ago`
        } else if (hours > 0) {
            return hours === 1 ? "1 hour ago" : `${hours} hours ago`
        } else if (minutes > 0) {
            return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`
        } else {
            return "Just now";
        }
    }

    function requestAccept() {
        socket?.emit('request-accept', data._id)
        setNotification(prev =>
            prev.reduce((accumulator: NotificationType[], notification: NotificationType) => {
                if (notification._id === data._id) {
                    accumulator.push({
                        ...notification, isAccepted: true
                    })
                } else {
                    accumulator.push(notification)
                }
                return accumulator
            }, [])
        )
    }

    function requestReject() {
        socket?.emit('request-reject', data._id)
        setNotification(prev =>
            prev.reduce((accumulator: NotificationType[], notification: NotificationType) => {
                if (notification._id === data._id) {
                    // remove
                } else {
                    accumulator.push(notification)
                }
                return accumulator
            }, [])
        )
    }


    return (
        <div className='border-b border-[white] xs:px-5 px-1 xs:py-4 py-3 space-y-2'>
            <div className='flex items-center justify-start xs:gap-4 gap-2'>
                <div>
                    <img src={data.sender.image} className='xs:w-[50px] w-[35px] xs:h-[50px] h-[35px] object-cover rounded-full' />
                </div>
                <div className='xs:text-sm text-xs'>
                    <p><span className='text-black'>{data.sender.firstName}</span> wanna talk to you.</p>
                    <p>{timeAgo(data.createdOn)}</p>
                </div>
            </div>

            {
                data.isAccepted ? (
                    <button disabled={true}
                        className='bg-[white] flex items-center justify-center gap-1 xs:text-sm text-xs xs:ml-16 ml-10 text-black xs:py-2 py-1 xs:px-3 px-2 rounded-md'>
                        <span>Accepted</span> <FaCheck />
                    </button>
                ) : (
                    <div className='xs:text-sm text-xs space-x-1 xs:ml-16 ml-10'>
                        <button onClick={requestAccept}
                            className='bg-blue border border-blue text-[white] xs:py-2 py-1 xs:px-3 px-2 rounded-md'>
                            Accept
                        </button>
                        <button onClick={requestReject}
                            className='bg-[white] xs:py-2 py-1 xs:px-3 px-2 rounded-md border'>
                            Deny
                        </button>
                    </div>
                )
            }
        </div >
    )
}

export default NotificationCard
