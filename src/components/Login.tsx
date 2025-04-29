import { useNavigate } from "react-router-dom"
import CloseIcon from "../icons/Close";

export default function LogInPage() {
    const navigate = useNavigate();
    return <div className="bg-[#1D1E30] h-screen w-screen text-center pt-35">
        <div onClick={()=> {
                        navigate('/');
                    }}>
                        <CloseIcon />
                    </div>
        <div className="w-fit mx-auto">
            <div className="text-white text-4xl font-semibold">
                Login
            </div>
            <div className="text-white text-xl text-start mt-15">
                <div>
                    Username: <br />
                    <input type="text" className="bg-white text-black outline-none px-2 py-1 rounded mt-1" />
                </div>
                <div className="mt-3">
                    Password: <br />
                    <input type="password" className="bg-white text-black outline-none px-2 py-1 rounded mt-1" />
                </div>
                <button className="text-white bg-[#383B52] w-full mt-3 rounded py-1 cursor-pointer">
                    Login
                </button>
            </div>
        </div>
        <div className="text-white mt-2 items-center">
            Don't have an account? <a className="text-gray-500 border-b-1 cursor-pointer ml-1" onClick={() => navigate("/signin")}>SignIn</a>
        </div>
    </div>
}