import { useNavigate } from "react-router-dom";
import CloseIcon from "../icons/Close";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function AdminSignIn() {

    const [success , setSuccess] = useState(true)

    const submitHandler = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const formData = new FormData(form);

        const username = formData.get('username');
        const password = formData.get('password');

        const response = await axios.post('https://edusphere-backend-mww7.onrender.com/adminsignup', {
            username : username,
            password : password
        });

        if(response.data.message == 'new admin created' || response.data.message == 'admin already exist') {
            navigate('/adminLogin')
        } else if(response.data.error == 'password') {
            alert('Password must contain : \n 1:Min one character \n 2: minimum one number \n 3: minimum one Capital alphabet');
            setSuccess(false);
        } else {
            setSuccess(false);
        }
    }

    const navigate = useNavigate();
    
    return <div>
            <div className="bg-BackgroundColor h-screen w-screen text-center pt-35">
            <div onClick={()=> {
                navigate('/adminDashboard');
            }} className="text-fontColor float-end pr-5 -translate-y-30 cursor-pointer">
                <CloseIcon />
            </div>
            <div className="w-fit mx-auto">
                <div className="text-fontColor text-4xl font-semibold relative">
                    Sign Up
                </div>
                <form method="post" onSubmit={submitHandler}>
                    <div className="text-fontColor text-xl text-start mt-15">
                        <div>
                            Username: <br />
                            <input type="text" className="bg-BackgroundColor-200 text-fontColor outline-none px-3.5 py-1.5 rounded mt-1" name="username" autoComplete="false" />
                        </div>
                        <div className="mt-2">
                            Password: <br />
                            <input type="password" className="bg-BackgroundColor-200 text-fontColor outline-none px-3.5 py-1 rounded mt-1" name="password" />
                        </div>
                        {!success && <div className="text-red-600 text-base text-center mt-2">
                                incorrect credentails
                            </div>}
                        <button className="text-BackgroundColor bg-primary-200 w-full mt-3 rounded py-1 cursor-pointer" type="submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            <div className="text-fontColor mt-2 items-center">
                Already have an account? <a className="text-accent border-b-1 cursor-pointer ml-1" onClick={() => navigate("/adminLogin")}>Login</a>
            </div>
        </div>
    </div>
}