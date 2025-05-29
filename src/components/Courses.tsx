import CardElement from "./Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import mongoose from "mongoose";


interface course {
    _id : mongoose.Types.ObjectId,
    title : string,
    price : number,
    imageUrl : string,
    description : string,
    userId : mongoose.Types.ObjectId
}

export default function Courses() {
    const [courses , setCourses] = useState([])
    const Courses = async () => {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data.courses);
    }
    useEffect(()=>{
        Courses();
    },[]);
    const navigate = useNavigate();
    return <div className="h-full mt-10">
        <div className="text-6xl font-bold text-white text-center">
            Courses
        </div>
        <div className="w-fit mx-auto p-10 flex gap-10">
            {courses.map((course : course) => (
                <div onClick={()=>{
                    navigate(`/course/${course._id}`)
                }}>
                    <CardElement title={course.title} price={course.price} buttonText="Buy" imageUrl={course.imageUrl}  />
                </div>
            ))}
        </div>
    </div>
}