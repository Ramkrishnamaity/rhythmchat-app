import React from "react";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

const InternetStatusCard: React.FC = () => {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='bg-[white] text-[crimson] rounded-full sm:w-[200px] sm:h-[200px] w-[180px] h-[180px] flex flex-col justify-center items-center'>
                <MdSignalWifiStatusbarConnectedNoInternet className='text-5xl text-blue' />
                <p>No Internet</p>
            </div>
        </div>
    );
};

export default InternetStatusCard;
