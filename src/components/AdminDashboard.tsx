import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardElement from './Card';
import axios from 'axios';
import mongoose from 'mongoose';
import AdminNavBar from './AdminNavBar';

interface ICourse {
  _id : mongoose.Types.ObjectId,
  title : string,
  description : string,
  price : number,
  imageUrl : string,
}

const AdminDashboard = () => {
  const [courses , setCourses] = useState([]);
  const navigate = useNavigate();

  const getAdminCourses = async () => {
    const response = await axios.get('https://edusphere-backend-mww7.onrender.com/getAdminCourses',{
      headers : {
        Authorization : localStorage.getItem('token')
      }
    });
    setCourses(response.data.courses)
  }


  useEffect(()=> {
    getAdminCourses();
  },[])

  return (
    <div className="bg-BackgroundColor min-h-screen">
      <AdminNavBar />
      <div className="text-white px-10 pt-10 w-fit">
        <h2 className="text-4xl font-bold mb-8 font-display">My Courses</h2>

        <div className="flex flex-wrap gap-8 mx-auto w-fit items-center">
          {courses && <div className=' flex flex-wrap gap-8 w-fit not-sm:flex-col'>
            {courses.map((course : ICourse) => (
            <div onClick={() => {
              navigate(`/addLectures/${course._id}`)
            }} className='w-fit'>
              <CardElement title={course.title} imageUrl={course.imageUrl} price={course.price} buttonText='view' deleteOption={true} _id={course._id} />
            </div>
          ))}
          </div>}
          <div className="bg-gradient-to-b from-BackgroundColor-200 to-BackgroundColor-150 rounded-3xl flex items-center justify-center cursor-pointer hover:opacity-85 transition hover:-translate-y-1 h-52 duration-300 not-sm:w-full w-100"
            onClick={() => {navigate('/createCourse')}}>
             <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-13" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
             </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


