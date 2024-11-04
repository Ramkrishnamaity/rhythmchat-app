import React, { ChangeEvent, FormEvent, useState } from 'react'
import { postRequest } from '../../lib/utils/HttpsClient'
import { endpoints } from '../../lib/utils/Endpoint'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { GoEyeClosed, GoEye } from 'react-icons/go';
import { ImSpinner9 } from "react-icons/im";
import { LoginFormData, UserLoginResponse } from '../../lib/types/auth';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setProfile, setToken } from '../../redux/slices/user';
import ConfirmationModal from '../../components/modal/ConfirmationModal';
import { FaUser, FaLock } from "react-icons/fa";
import { CommonResponseType } from '../../lib/types';
import InternetStatusCard from '../../components/card/InternetStatusCard';

const Login: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { online } = useAppSelector(state => state.internet)
  const [disable, setDisable] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<LoginFormData>({
    email: '', password: ''
  })

  function clickHandler() {
    setShowPassword((prev) => !prev)
  }

  async function forgetPassword() {
    const output: CommonResponseType = await postRequest(endpoints.resetPassword, { email: formData.email })
    const response = output.data
    if (response.status) toast.success(response.message)
    else toast.error(response.message)
    setFormData({ email: '', password: '' })
  }

  function openUIModal() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email === '' || !regex.test(formData.email)) {
      toast.error("Enter an valid email..!")
      return
    }
    setOpenModal(true)
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()

      setDisable(true)
      const response: CommonResponseType<UserLoginResponse> = await postRequest(endpoints.login, formData)
      if (response.status) {
        //store in browser
        localStorage.setItem('token', response.data?.token ?? '')
        localStorage.setItem('profile', JSON.stringify(response.data?.profile ?? ''))
        //store in redux
        dispatch(setToken(response.data?.token ?? ''))
        dispatch(setProfile(response.data?.profile ?? null))

        toast.success(response.message)
        navigate('/dashboard')
      } else {
        setDisable(false)
        setFormData({ email: '', password: '' })
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='boxshadow bg-wrapper w-full xs:my-5 mx-auto xs:rounded-3xl rounded-none text-lowBlack xs:h-max h-[100vh] xs:w-[400px] px-5 py-10 tracking-widest text-md space-y-8'>
      {
        online ? (
          <>
            <h1 className='text-center text-black font-extrabold text-3xl mb-10 cursor-pointer'><Link to="/" >RhythmChat</Link></h1>
            <form className='space-y-10' onSubmit={login}>
              <div className='space-y-8'>
                <div className='relative w-full h-[45px] space-y-2'>
                  <div className='absolute top-[22px] left-3'>
                    <FaUser />
                  </div>
                  <input type='email' name='email' placeholder='Email' readOnly={disable} onChange={changeHandler} value={formData.email}
                    className='text-[black] btnInnershadow w-full h-full rounded-md pl-10 pr-2 shadow-md outline-none text-sm tracking-wider'
                    required={true} />
                  <div onClick={openUIModal}
                    className='text-xs hover:underline z-10 cursor-pointer text-blue absolute top-[50px] right-0'>
                    forgot password?</div>
                </div>
                <div className='w-full h-[45px] space-y-2 relative'>
                  <div className='absolute top-[22px] left-3'>
                    <FaLock />
                  </div>
                  <input type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' readOnly={disable} onChange={changeHandler} value={formData.password}
                    className='text-[black] btnInnershadow w-full h-full rounded-md px-10 shadow-md outline-none text-sm tracking-wider'
                    required={true} />
                  <span className='absolute right-3 bottom-1' onClick={clickHandler}>
                    {
                      showPassword ? <GoEyeClosed size={19} /> : <GoEye size={19} />
                    }
                  </span>
                </div>
              </div>
              <button type='submit' disabled={disable} className='btnInnershado bg-black text-[white] font-medium text-lg w-full h-[50px] rounded-2xl flex gap-4 justify-center items-center'>
                {
                  disable && <ImSpinner9 size={18} className='animate-spin' />
                }
                Login
              </button>
            </form>
            <div className='space-y-5'>
              <p className='text-center text-sm opacity-70'>Or Login with</p>
              <button
                disabled={disable}
                className='bg-black text-[white] w-full rounded-2xl flex justify-center items-center p-3'
              >
                <span className='mr-[16px]'><FcGoogle size={20} /></span><span className='mr-[4px] xs:flex hidden'>Sign up with</span>Google
              </button>
              <p className='text-center text-sm opacity-70'>Don't have an account? <Link to="/signup" className='hover:underline text-blue'>Sign Up</Link></p>
            </div>
            {/* modal */}
            {
              openModal && (<ConfirmationModal desc={`forget this Account`} btnText='Confirm' triggerFunction={forgetPassword} setOpenModal={setOpenModal} />)
            }
          </>
        ) : (
          <InternetStatusCard />
        )
      }
    </div>
  )
}

export default Login
