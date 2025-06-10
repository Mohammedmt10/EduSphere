import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../icons/profile";
import CloseIcon from "../icons/Close";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion';
import Menu from "../icons/menu";

export default function NavBar() {
    const [loggedIn , setloggedIn] = useState(false);
    const [profileOpen , setprofileOpen] = useState(false);
    const [username , setUsername] = useState('');
    const [hover , setHover] = useState('');
    const navigate = useNavigate();
    const [open , setOpen] = useState(false);
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
    return <div className="text-fontColor bg-BackgroundColor flex justify-between not-md:px-10 px-20 py-4 items-center font- z-[999] border-b-1 border-fontColor sticky min-w-full">
        <div className="text-3xl font-semibold tracking-wider">
            Edusphere
        </div>
        <div className={`cursor-pointer md:hidden ${open ? "hidden": ""}`} onClick={()=> {
            setOpen(c => !c);
        }}>
            <Menu />
        </div>
        <div className={`flex items-center md:flex  ${!open ? "hidden not-md:hidden": "absolute not-md:block not-md:mt-150 not-md:text-center not-md:p-10 rounded-2xl not-md:mx-auto not-md:bg-BackgroundColor-100 not-md:h-fit not-md:w-100"}`}>
            <div className="top-5 right-5 absolute cursor-pointer md:hidden" onClick={()=>{
                setOpen(c=> !c);
            }}>
                <CloseIcon />
            </div>
            <motion.div className="px-4 cursor-pointer not-md:my-3 not-md:w-fit not-md:mx-auto" onClick={() => {
                navigate('/')
            }} onHoverStart={()=> {
                setHover('Home');
            }} onHoverEnd={()=>{
                setHover('');
            }}>Home
            <div className={`border-t-2 border-accent ${hover == 'Home' ? "w-full" : "w-0"} transition-all duration-200`}></div>
            </motion.div>
            <motion.div className="px-4 cursor-pointer not-md:my-3 not-md:w-fit not-md:mx-auto" onClick={() => {
                navigate('/purchasedCourses')
            }} onHoverStart={()=> {
                setHover('Courses');
            }} onHoverEnd={()=>{
                setHover('');
            }}>Courses
            <div className={`border-t-2 border-accent ${hover == 'Courses' ? "w-full" : "w-0"} transition-all duration-200`}></div>
            </motion.div>

            <motion.div className="px-4 cursor-pointer not-md:my-3 not-md:w-fit not-md:mx-auto" onClick={() => {
                navigate('/codeEditor')
            }} onHoverStart={()=> {
                setHover('Code Editor');
            }} onHoverEnd={()=>{
                setHover('');
            }}>Code Editor
            <div className={`border-t-2 border-accent ${hover == 'Code Editor' ? "w-full" : "w-0"} transition-all duration-200`}></div>
            </motion.div>
            
            {!loggedIn && <div className="font-inter p-1 px-3 text-BackgroundColor rounded cursor-pointer bg-primary-200" onClick={() => navigate('/login')}>Login</div>}
            {loggedIn && <div className="mx-3 ml-2 cursor-pointer not-md:hidden" onClick={() => setprofileOpen(true)}>
                <Profile />
                </div>}
            {loggedIn && profileOpen && <div className="absolute font-medium px- py-3 bg-BackgroundColor-200  ml-20 mt-40 text-center w-70 rounded-lg mx-auto">
                <div className="top-3 right-3 absolute -translate-y-1 cursor-pointer" onClick={()=>{
                    setprofileOpen(false)
                }}>
                    <CloseIcon />
                </div><br />
                <div className="text-center mx-auto translate-x-2">
                    Username : {username}
                </div>
                <div onClick={() => logoutCall()} className="duration-300 cursor-pointer py-2 mt-2 bg-primary-400 mx-4 rounded-xl">
                    Logout
                </div>
                </div>}
            
        </div>
    </div>
}