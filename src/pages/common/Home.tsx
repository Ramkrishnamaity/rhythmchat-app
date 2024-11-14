import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {

  const navigate = useNavigate();
  const { token } = useAppSelector(state => state.user);

  if (token) {
    navigate("/dashboard");
  }

  return (
    <div className='boxshadow bg-wrapper w-full mx-auto xs:rounded-3xl rounded-none text-lowBlack xs:h-max h-[100vh] xs:w-[400px] px-5 py-10 tracking-widest text-md space-y-20'>
      <h1 className='text-center text-black font-extrabold text-3xl mb-10 cursor-pointer'>RhythmChat</h1>
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold'>
          Let's Connect with Your Customer in Real Time.
        </h2>
        <p className='text-xs text-justify'>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
        </p>
      </div>
      <div>
        <Link to='/login'
        className='btnInnershado bg-black text-[white] font-medium text-md h-[50px] w-full rounded-2xl flex gap-4 justify-center items-center p-3'>
          Start Chatting Now
        </Link>
      </div>
    </div>
  );
};

export default Home;
