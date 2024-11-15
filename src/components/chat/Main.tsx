import React from "react";
import { useAppSelector } from "../../redux/hooks";

const Main: React.FC = () => {

    const { data } = useAppSelector(state => state.conversation);
    const { profile } = useAppSelector(state => state.user);

    return (
        <div className="space-y-5 py-2 text-xs leading-1">
            {
                data?.map((item, index) => {
                    if (item.user._id === profile?._id) {
                        return (
                            <div key={index} className='xs:px-4 px-2 flex justify-end items-end' >
                                <p className="bg-[white] border border-blue break-words p-3 w-max max-w-[80%] rounded-l-lg rounded-t-lg">{item.message}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className='xs:px-4 px-2 flex justify-start items-end gap-1' >
                                <div className="w-[25px] h-[25px]">
                                    <img src={item.user.image} className='w-full h-full object-contain rounded-full' />
                                </div>
                                <p className="bg-[white] border border-blue break-words p-3 w-max rounded-r-lg rounded-t-lg">{item.message}</p>
                            </div>
                        );
                    }
                })
            }
        </div>
    );
};

export default Main;