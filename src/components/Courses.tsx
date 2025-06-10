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
        const response = await axios.get('https://edusphere-backend-api.onrender.com/courses');
        setCourses(response.data.courses);
    }
    useEffect(()=>{
        Courses();
    },[]);
    const navigate = useNavigate();
    return <div className="h-full w-full">
        <div className="text-5xl font-semibold text-fontColor text-center border-b-4 w-fit mx-auto pb-5 border-accent">
            Courses
        </div>
        <div className="w-fit p-10 flex flex-wrap mx-auto gap-10 mb-10">
            {courses.map((course : course) => (
                <div className="mx-auto" onClick={()=>{
                    navigate(`/course/${course._id}`)
                }}>
                    <CardElement title={course.title} price={course.price} buttonText="Buy" imageUrl={course.imageUrl}  />
                </div>
            ))}
        </div>
    </div>
}