import { useNavigate } from "react-router-dom";
import CloseIcon from "../icons/Close";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function AdminLogIn() {

    const [success , setSuccess] = useState(true)

    const submitHandler = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);

        const username = formData.get('username');
        const password = formData.get('password');

        const response = await axios.post('https://edusphere-backend-api.onrender.com/adminsignin', {
            username : username,
            password : password
        });
        const token = response.data.token;
        if(token) {
            localStorage.setItem('token' , token);
            navigate('/adminDashboard')
        } else {
            setSuccess(false);
        }
    }

    const navigate = useNavigate();
    
    return <div>
            <div className="bg-[#1D1E30] h-screen w-screen text-center pt-35">
            <div onClick={()=> {
                navigate('/adminDashboard');
            }} className="text-white float-end pr-5 -translate-y-30 cursor-pointer">
                <CloseIcon />
            </div>
            <div className="w-fit mx-auto">
                <div className="text-white text-4xl font-semibold relative">
                    Log in
                </div>
                <form method="post" onSubmit={submitHandler}>
                    <div className="text-white text-xl text-start mt-15">
                        <div>
                            Username: <br />
                            <input type="text" className="bg-white text-black outline-none px-2 py-1 rounded mt-1" name="username" />
                        </div>
                        <div className="mt-3">
                            Password: <br />
                            <input type="password" className="bg-white text-black outline-none px-2 py-1 rounded mt-1" name="password" />
                        </div>
                        {!success && <div className="text-red-600 text-base text-center mt-2">
                                incorrect credentails
                            </div>}
                        <button className="text-white bg-[#383B52] w-full mt-3 rounded py-1 cursor-pointer" type="submit">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
            <div className="text-white mt-2 items-center">
                Don't have an account? <a className="text-gray-500 border-b-1 cursor-pointer ml-1" onClick={() => navigate("/adminSignup")}>SignUp</a>
            </div>
        </div>
    </div>
}