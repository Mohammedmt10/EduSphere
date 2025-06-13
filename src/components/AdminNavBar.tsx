import { useEffect, useState } from "react";
import CloseIcon from "../icons/Close";
import Profile from "../icons/profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminNavBar() {

    const [adminDetails , setAdminDetails] = useState(false);
    const [loggedIn , setLoggedIn] = useState(false);
    const [username , setUsername] = useState('');
    const navigate = useNavigate();

    const getAdminInfo = async () => {
        const response = await axios.get('https://edusphere-backend-mww7.onrender.com/adminMe',{
          headers : {
            Authorization : localStorage.getItem('token')
          }
        });
        if(response.data.message == 'no token provided') {
            setLoggedIn(false)
        } else {
            setUsername(response.data.user.username);
            setLoggedIn(true)
        }
      }

      useEffect(()=> {
        getAdminInfo();
      },[])

    return <div className="relative text-fontColor bg-BackgroundColor flex justify-between px-20 py-4 items-center font-[Jockey One] z-[99] border-b-1 border-fontColor">
        <div className="text-3xl font-semibold tracking-wider">Edushpere</div>
        {!loggedIn && <div className="font font-semibold px-2 py-1 bg-primary-200 rounded text-BackgroundColor cursor-pointer"
          onClick={() => navigate('/adminLogin')}>
          Login
        </div>}
        {loggedIn && <div onClick={() => {
          setAdminDetails(c => !c);
        }} className='cursor-pointer'>
            <Profile />
          </div>}
          {adminDetails && loggedIn && <div className='absolute right-0 mr-10 mt-40 bg-BackgroundColor-200 p-5 text-center rounded-xl'>
              <div>
                <div className='right-2 top-2 absolute cursor-pointer' onClick={()=> {
                  setAdminDetails(false);
                }}>
                  <CloseIcon />
                </div>
                <div className='pt-5'>
                  Admin : {username}
                </div>
                <div onClick={() => {
                  localStorage.removeItem('token');
                  getAdminInfo();
                }} className='w-full bg-primary-200 text-BackgroundColor mt-3 py-1 rounded border-2 cursor-pointer'>
                  Logout
                </div>
              </div>
            </div>}
      </div>
}