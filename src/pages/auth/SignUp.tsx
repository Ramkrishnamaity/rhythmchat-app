import React, { ChangeEvent, FormEvent, useState } from "react";
import { postRequest } from "../../lib/utils/HttpsClient";
import { endpoints } from "../../lib/utils/Endpoint";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { ImSpinner9 } from "react-icons/im";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { SignUpFormData } from "../../lib/types/auth";
import { toast } from "react-toastify";
import { FaLock, FaUser } from "react-icons/fa";
import { CommonResponseType } from "../../lib/types";
import { useAppSelector } from "../../redux/hooks";
import InternetStatusCard from "../../components/card/InternetStatusCard";

const SignUp: React.FC = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: "", lastName: "", email: "", password: "", otp: ""
    });
    const { online } = useAppSelector(state => state.internet);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(false);

    function clickHandler() {
        setShowPassword((prev) => !prev);
    }

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    async function signup(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            if (isOtpSent) {
                setDisable(true);

                const response: CommonResponseType = await postRequest(endpoints.signup, formData);
                if (response.status) {
                    toast.success(response.message);
                    navigate("/login");
                } else {
                    setDisable(false);
                    setIsOtpSent(false);
                    setFormData({ firstName: "", lastName: "", email: "", password: "", otp: "" });
                    toast.error(response.message);
                }
            } else {
                toast.error("Network Error..!");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function sendOtp() {
        try {
            if (formData.email === "") {
                toast.error("Email field is required..!");
            } else {
                const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!regex.test(formData.email)) {
                    toast.error("Enter an valid email..!");
                } else {
                    setDisable(true);
                    const response: CommonResponseType = await postRequest(endpoints.requestotp, { email: formData.email });
                    if (response.status) {
                        setIsOtpSent(true);
 setDisable(false);
                                               toast.success(response.message);
                    } else {
                        setDisable(false);
                        setFormData((prev) => {
                            return { ...prev, email: "" };
                        });
                        toast.error(response.message);
                    }
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className='text-lowBlack boxshadow w-full xs:my-5 xs:rounded-3xl rounded-none bg-wrapper xs:h-max xs:w-[400px] px-5 py-10 tracking-widest text-md space-y-8'>
            {
                online ? (
                    <>
                        <h1 className='text-center text-black font-extrabold text-3xl mb-10 cursor-pointer'><Link to="/" >RhythmChat</Link></h1>
                        <form className='space-y-10' onSubmit={signup}>
                            <div className='space-y-3'>
                                <div className='w-full relative h-[45px]'>
                                    <div className='absolute top-[14px] left-3'>
                                        <FaUser />
                                    </div>
                                    <input type='email' name='email' placeholder='Email' value={formData.email} readOnly={isOtpSent}
                                        onChange={changeHandler}
                                        className='text-[black] btnInnershadow w-full h-full rounded-md pl-10 pr-5 outline-none text-sm tracking-wider'
                                        required={true} />
                                </div>
                                <div className='w-full h-[45px] relative'>
                                    <div className='absolute top-[14px] left-3'>
                                        <FaLock />
                                    </div>
                                    <input type={showPassword ? "text" : "password"} placeholder="Password" readOnly={disable} name='password' value={formData.password}
                                        onChange={changeHandler}
                                        className='text-[black] btnInnershadow w-full h-full rounded-md px-10 outline-none text-sm tracking-wider'
                                        required={true} />
                                    <span className='absolute right-3 bottom-3' onClick={clickHandler}>
                                        {
                                            showPassword ? <GoEyeClosed size={20} /> : <GoEye size={20} />
                                        }
                                    </span>
                                </div>
                                <div className='xs:flex-row flex flex-col xs:gap-2 gap-3'>
                                    <div className='w-full h-[45px]'>
                                        <input type='text' name='firstName' placeholder='First Name' readOnly={disable} value={formData.firstName}
                                            onChange={changeHandler}
                                            className='text-[black] btnInnershadow w-full h-full rounded-md px-5 outline-none text-sm tracking-wider'
                                            required={true} />
                                    </div>
                                    <div className='w-full h-[45px]'>
                                        <input type='text' name='lastName' placeholder='Last Name' readOnly={disable} value={formData.lastName}
                                            onChange={changeHandler}
                                            className='text-[black] btnInnershadow w-full h-full rounded-md px-5 outline-none text-sm tracking-wider'
                                            required={true} />
                                    </div>
                                </div>
                                <div className='flex gap-1'>
                                    <div className='w-full space-y-2'>
                                        <div className='flex gap-1 h-[45px]'>
                                            <input type='text' name='otp' placeholder='OTP' readOnly={disable} value={formData.otp} onChange={changeHandler}
                                                className='text-black btnInnershadow w-full h-full rounded-md px-5 outline-none text-sm tracking-wider'
                                                required={true} />
                                            <div className='w-full flex gap-2 justify-center items-center'>
                                                {
                                                    isOtpSent && <span className='text-[#00FF00]'><IoIosCheckmarkCircle size={25} /></span>
                                                }
                                                <button className='text-center text-blue text-sm cursor-pointer'
                                                    disabled={disable}
                                                    onClick={sendOtp}
                                                >
                                                    {
                                                        isOtpSent ? "Sent" : disable ? "Sending.." : "Send Otp"
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <button type='submit' disabled={disable} className='btnInnershado bg-black text-[white] font-medium text-md w-full h-[50px] rounded-2xl py-3 flex gap-4 justify-center items-center'>
                                <span>
                                    {
                                        disable && <ImSpinner9 size={18} className='animate-spin' />
                                    }
                                </span>
                                Register
                            </button>
                        </form>
                        <div className='space-y-5'>
                            <p className='text-center text-sm opacity-70'>Or Sign up with</p>
                            <button
                                disabled={disable}
                                className='bg-black btnInnershado text-[white] font-medium text-md h-[50px] w-full cursor-pointer rounded-2xl flex justify-center items-center p-3'
                            >
                                <span className='mr-[16px]'><FcGoogle size={20} /></span><span className='mr-[4px] xs:flex hidden'>Sign up with</span>Google
                            </button>
                            <p className='text-center text-sm opacity-70'>Already registerd? <Link to="/login" className='text-blue hover:underline'>Log in</Link></p>
                        </div>
                    </>
                ) : (
                    <InternetStatusCard />
                )
            }
        </div>
    );
};

export default SignUp;

