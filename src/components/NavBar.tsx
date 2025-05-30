import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../icons/profile";
import CloseIcon from "../icons/Close";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';

export default function NavBar() {
    const [loggedIn , setloggedIn] = useState(false);
    const [profileOpen , setprofileOpen] = useState(false);
    const [username , setUsername] = useState('');
    const [hover , setHover] = useState('');
    const navigate = useNavigate();
    const logoutCall = async () => {
        localStorage.removeItem('token')
        setloggedIn(false);
    }
    const userInfo = async () => {
            const response = await axios.get('http://localhost:3000/me',{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
    if(response.data.message == 'no token provided') {
        setloggedIn(false)
    } else {
        setUsername(response.data.user.username)
        setloggedIn(true)
    }
    
    }
    useEffect(() => {
        userInfo();
    },[])
    return <div className="relative text-fontColor bg-BackgroundColor flex justify-between px-20 py-4 items-center font- z-[999]">
        <div className="text-3xl font-semibold tracking-wider">
            Edusphere
        </div>
        <div className="flex items-center">
            <motion.div className="px-4 cursor-pointer" onClick={() => {
                navigate('/')
            }} onHoverStart={()=> {
                setHover('Home');
            }} onHoverEnd={()=>{
                setHover('');
            }}>Home
            <div className={`border-t-2 border-accent ${hover == 'Home' ? "w-full" : "w-0"} transition-all duration-200`}></div>
            </motion.div>
            <motion.div className="px-4 cursor-pointer" onClick={() => {
                navigate('/purchasedCourses')
            }} onHoverStart={()=> {
                setHover('Courses');
            }} onHoverEnd={()=>{
                setHover('');
            }}>Courses
            <div className={`border-t-2 border-accent ${hover == 'Courses' ? "w-full" : "w-0"} transition-all duration-200`}></div>
            </motion.div>

            <motion.div className="px-4 cursor-pointer" onClick={() => {
                navigate('/codeEditor')
            }} onHoverStart={()=> {
                setHover('Code Editor');
            }} onHoverEnd={()=>{
                setHover('');
            }}>Code Editor
            <div className={`border-t-2 border-accent ${hover == 'Code Editor' ? "w-full" : "w-0"} transition-all duration-200`}></div>
            </motion.div>
            
            {!loggedIn && <div className="font-inter p-1 px-3 text-BackgroundColor rounded cursor-pointer bg-primary-200" onClick={() => navigate('/login')}>Login</div>}
            {loggedIn && <div className="mx-3 ml-2 cursor-pointer" onClick={() => setprofileOpen(true)}>
                <Profile />
                </div>}
            {loggedIn && profileOpen && <div className="absolute font-semibold px- py-3 bg-[#383B52]  ml-20 mt-40 text-center w-60 rounded-lg">
                <div className="float-end mr-3 -translate-y-1 cursor-pointer" onClick={()=>{
                    setprofileOpen(false)
                }}>
                    <CloseIcon />
                </div><br />
                <div className="text-center pl-6 translate-x-2">
                    Username : {username}
                </div>
                <div onClick={() => logoutCall()} className="duration-300 cursor-pointer py-2 mt-2 bg-[#1D1E30] mx-4 rounded-full border-[#1D1E30] border-1 hover:bg-[#383B52]">
                    Logout
                </div>
                </div>}
            
        </div>
    </div>
}