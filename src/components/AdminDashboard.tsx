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
    const response = await axios.get('http://localhost:3000/getAdminCourses',{
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
    <div className="bg-[#141439] min-h-screen">
      <AdminNavBar />
      <div className="text-white px-10 pt-10">
        <h2 className="text-4xl font-bold mb-8 font-[Jockey One]">My Courses</h2>

        <div className="grid grid-cols-3 gap-6">
          {courses.map((course : ICourse) => (
            <div onClick={() => {
              navigate(`/addLectures/${course._id}`)
            }}>
              <CardElement title={course.title} imageUrl={course.imageUrl} price={course.price} buttonText='view' />
            </div>
          ))}
          <div className="bg-gradient-to-b from-[#240046] to-[#10002B] rounded-3xl flex items-center justify-center cursor-pointer hover:opacity-85 transition hover:-translate-y-1 h-52 duration-300 drop-shadow-lg drop-shadow-[#0000006a]"
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


