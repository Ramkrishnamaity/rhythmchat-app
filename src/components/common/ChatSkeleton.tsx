import React from "react";

interface PropsType {
    color: string
}

const ChatSkeleton: React.FC<PropsType> = ({ color }) => {
    return (
        <>
            <div className={"w-full h-max py-5 px-1 animate-pulse flex justify-start items-end xs:gap-2 gap-1"}>
                <div className={`xs:w-[30px] w-[20px] xs:h-[30px] h-[20px] rounded-full bg-${color}`}></div>
                <div className={`xs:h-[45px] h-[35px] w-[40%] rounded-r-md rounded-t-md bg-${color}`}></div>
            </div>
            <div className={"w-full xs:px-5 px-3 animate-pulse flex justify-end items-end"}>
                <div className={`xs:h-[45px] h-[35px] w-[40%] rounded-l-md rounded-t-md bg-${color}`}></div>
            </div>
            <div className={"w-full h-max py-5 px-1 animate-pulse flex justify-start items-end xs:gap-2 gap-1"}>
                <div className={`xs:w-[30px] w-[20px] xs:h-[30px] h-[20px] rounded-full bg-${color}`}></div>
                <div className={`xs:h-[45px] h-[35px] w-[40%] rounded-r-md rounded-t-md bg-${color}`}></div>
            </div>
            <div className={"w-full xs:px-5 px-3 animate-pulse flex justify-end items-end"}>
                <div className={`xs:h-[45px] h-[35px] w-[40%] rounded-l-md rounded-t-md bg-${color}`}></div>
            </div>
            <div className={"w-full h-max py-5 px-1 animate-pulse flex justify-start items-end xs:gap-2 gap-1"}>
                <div className={`xs:w-[30px] w-[20px] xs:h-[30px] h-[20px] rounded-full bg-${color}`}></div>
                <div className={`xs:h-[45px] h-[35px] w-[40%] rounded-r-md rounded-t-md bg-${color}`}></div>
            </div>
        </>
    );
};

export default ChatSkeleton;
