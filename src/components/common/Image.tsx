import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.png'

interface ImagePropsType {
    src: string,
    onClick?: () => void
    className: string
}

const Image: React.FC<ImagePropsType> = ({ src, onClick, className }) => {

    const [imageError, setImageError] = useState<boolean>(false)

    function ErrorHandler() {
        setImageError(true)
    }


    if (imageError) {
        return (
            <img src={profile} className={className} />
        )
    }

    return (
        <img src={src} onClick={onClick} className={className} onError={ErrorHandler}/>
    )
}

export default Image