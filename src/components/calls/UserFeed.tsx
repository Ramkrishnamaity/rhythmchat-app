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
            style={{ width: '200px', height: '200px' }}
            autoPlay={true}
        />
    )
}

export default UserFeed