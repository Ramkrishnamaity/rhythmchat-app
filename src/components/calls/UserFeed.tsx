import React, { useEffect, useRef } from 'react'

interface PropsType {
    stream: MediaStream
}
const UserFeed: React.FC<PropsType> = ({ stream }) => {

    const videoRef = useRef<HTMLVideoElement>(null)
 
    useEffect(() => {
        if (videoRef.current) videoRef.current.srcObject = stream
    })
    return (
        <video
            ref={videoRef}
            style={{ width: '100%', height: '100%' }}
            autoPlay={true}
        />
    )
}

export default UserFeed