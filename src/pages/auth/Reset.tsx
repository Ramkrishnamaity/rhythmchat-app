import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommonResponseType } from "../../lib/types";
import { getRequest, postRequest } from "../../lib/utils/HttpsClient";
import { endpoints } from "../../lib/utils/Endpoint";
import { toast } from "react-toastify";
import { ImSpinner9 } from "react-icons/im";
import { GoEye, GoEyeClosed } from "react-icons/go";

const Reset: React.FC = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [showPassword1, setShowPassword1] = useState<boolean>(true);
    const [disable, setDisable] = useState<boolean>(false);
    const [userData, setUserData] = useState<{ name: string } | null>(null);
    const [formData, setFormData] = useState<{
        password: string, confirmPassword: string
    }>({
        password: "", confirmPassword: ""
    });

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    const checkToken = async () => {
        try {
            const response: CommonResponseType = await getRequest(`${endpoints.CheckReset}/${token}`);
            if (response.status) {
                if (response.data) {
                    setUserData(response.data);
                    setLoading(false);
                } else {
                    navigate("/");
                }
            } else {
                toast.error(response.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            if (formData.confirmPassword !== formData.password) {
                toast.error("Password Does't match!");
                return;
            }
            setDisable(true);
            const response: CommonResponseType = await postRequest(endpoints.reset, {token, ...formData});
            if (response.status) {
                setDisable(false);
                toast.success(response.message);
                navigate("/");
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            setDisable(false);
            setFormData({
                password: "", confirmPassword: ""
            });
            console.log(error);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <div className='boxshadow bg-wrapper w-full xs:my-5 mx-auto xs:rounded-3xl rounded-none text-lowBlack xs:h-max h-[100vh] xs:w-[400px] px-5 py-10 tracking-widest text-md space-y-8'>
            <h1 className='text-center text-black font-extrabold text-3xl mb-10 cursor-pointer'>RhythmChat</h1>
            {
                loading ?
                    (
                        <div className='flex items-center justify-center'>
                            <ImSpinner9 size={25} className='animate-spin' />
                        </div>
                    ) :
                    (
                        <div>

                            <h2>Hello {userData?.name}, change your password.</h2>

                            <form onSubmit={submitHandler}>
                                <div className='w-full h-[45px] mt-3 relative'>
                                    <input type={showPassword ? "password" : "text"} placeholder='Password' name='password' readOnly={disable} onChange={changeHandler} value={formData.password}
                                        className='text-[black] btnInnershadow w-full h-full rounded-md px-5 shadow-md outline-none text-sm tracking-wider'
                                        required={true} />
                                    <span className='absolute right-3 bottom-3' onClick={() => setShowPassword((prev) => !prev)}>
                                        {
                                            showPassword ? <GoEyeClosed size={19} /> : <GoEye size={19} />
                                        }
                                    </span>
                                </div>
                                <div className='w-full h-[45px] mt-5 mb-10 relative'>
                                    <input type={showPassword1 ? "password" : "text"} placeholder='Confirm Password' name='confirmPassword' readOnly={disable} onChange={changeHandler} value={formData.confirmPassword}
                                        className='text-[black] btnInnershadow w-full h-full rounded-md px-5 shadow-md outline-none text-sm tracking-wider'
                                        required={true} />
                                    <span className='absolute right-3 bottom-3' onClick={() => setShowPassword1((prev) => !prev)}>
                                        {
                                            showPassword1 ? <GoEyeClosed size={19} /> : <GoEye size={19} />
                                        }
                                    </span>
                                </div>
                                <button type='submit' disabled={disable} className='btnInnershado bg-black text-[white] font-medium text-lg w-full h-[50px] rounded-2xl flex gap-4 justify-center items-center'>
                                    {
                                        disable ? <ImSpinner9 size={18} className='animate-spin' /> : "Reset"
                                    }
                                </button>
                            </form>

                        </div>
                    )
            }
        </div>
    );
};

export default Reset;