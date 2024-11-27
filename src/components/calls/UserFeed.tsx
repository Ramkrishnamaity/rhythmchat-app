import React, { useEffect, useRef } from 'react'

interface PropsType {
    stream: MediaStream | null
}
const UserFeed: React.FC<PropsType> = ({ stream }) => {

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = stream
    })
    return (
        <div className='border border-[white] w-full h-full'>
            {/* <video
                ref={videoRef}
                style={{ width: '100%', height: '100%' }}
                autoPlay={true}
            /> */}
        </div>
    )
}

export default UserFeed