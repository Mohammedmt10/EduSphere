import { useNavigate } from "react-router-dom"
import CloseIcon from "../icons/Close";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function LogInPage() {
    
    const [success , setSuccess] = useState(false)

    const onclickHandler = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        
        const formData = new FormData(form);
        const username = formData.get('username');
        const password = formData.get('password');

        const response = await axios.post('https://edusphere-backend-mww7.onrender.com/signin', {
                username : username,
                password : password
        });
        const token = response.data.token;
        if(token) {
            localStorage.setItem('token' , token);
            navigate('/')
        } else {
            setSuccess(true);
        }
    }
    const navigate = useNavigate();
    return <div className="bg-BackgroundColor text-fontColor absolute h-screen max-w-screen w-full text-center pt-35 z-[9999]">
        <div onClick={()=> {
                        navigate('/')
                    }} className="float-end pr-5 -translate-y-30 cursor-pointer">
                        <CloseIcon />
                    </div>
        <div className="w-fit mx-auto">
            <div className="text-4xl font-semibold">
                Login
            </div>
            <form method="post" onSubmit={onclickHandler}>
                <div className="text-xl text-start mt-10">
                    <div>
                        Username: <br />
                        <input type="text" className="bg-BackgroundColor-200 outline-none px-2 py-1 rounded mt-1" name="username" spellCheck={false} autoComplete="off" />
                    </div>
                    <div className="mt-3">
                        Password: <br />
                        <input type="password" className="bg-BackgroundColor-200 text-fontColor outline-none px-2 py-1 rounded mt-1" name="password" />
                    </div>
                    {success && <div className="text-accent font-normal text-base mt-2 text-center">
                        Incorrect credentails
                        </div>}
                    <button className="text-BackgroundColor bg-primary-200 w-full mt-3 rounded py-1 cursor-pointer font-medium" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
        <div className="text-fontColor mt-2 items-center">
            Don't have an account? <a className="text-secondary-100 border-b-1 cursor-pointer ml-1" onClick={() => navigate("/signup")}>SignUp</a>
        </div>
    </div>
}