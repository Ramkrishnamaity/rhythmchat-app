import React from "react";

interface PropsType {
  color: string
}

const Skeleton: React.FC<PropsType> = ({ color }) => {
  return (
    <>
      <div className={"w-full xs:px-5 px-1 animate-pulse flex justify-start items-center gap-2 xs:h-[100px] h-[80px]"}>
        <div className='w-[calc(20%-5px)]'>
          <div className={`xs:w-[50px] w-[35px] xs:h-[50px] h-[35px] rounded-full bg-${color}`}>

          </div>
        </div>
        <div className='w-[calc(80%-5px)] space-y-2'>
          <div className={`xs:h-[15px] h-[10px] w-[100%] rounded-md bg-${color}`}></div>
          <div className={`xs:h-[15px] h-[10px] w-[40%] rounded-md bg-${color}`}></div>
        </div>
      </div>
      <div className={"w-full xs:px-5 px-1 animate-pulse flex justify-start items-center gap-2 xs:h-[100px] h-[80px]"}>
        <div className='w-[calc(20%-5px)]'>
          <div className={`xs:w-[50px] w-[35px] xs:h-[50px] h-[35px] rounded-full bg-${color}`}>

          </div>
        </div>
        <div className='w-[calc(80%-5px)] space-y-2'>
          <div className={`xs:h-[15px] h-[10px] w-[100%] rounded-md bg-${color}`}></div>
          <div className={`xs:h-[15px] h-[10px] w-[40%] rounded-md bg-${color}`}></div>
        </div>
      </div>
      <div className={"w-full xs:px-5 px-1 animate-pulse flex justify-start items-center gap-2 xs:h-[100px] h-[80px]"}>
        <div className='w-[calc(20%-5px)]'>
          <div className={`xs:w-[50px] w-[35px] xs:h-[50px] h-[35px] rounded-full bg-${color}`}>

          </div>
        </div>
        <div className='w-[calc(80%-5px)] space-y-2'>
          <div className={`xs:h-[15px] h-[10px] w-[100%] rounded-md bg-${color}`}></div>
          <div className={`xs:h-[15px] h-[10px] w-[40%] rounded-md bg-${color}`}></div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;
