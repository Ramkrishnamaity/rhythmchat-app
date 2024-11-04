import React from "react";
import { useAppSelector } from "../../redux/hooks";

const Main: React.FC = () => {

    const { data } = useAppSelector(state => state.conversation);

    return (
        <>
            {
                data?.map((item, index) => {
                    return (<p key={index} className='p-5'>{item.message}</p>);
                })
            }
        </>
    );
};

export default Main;