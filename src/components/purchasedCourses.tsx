import axios from "axios";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import CardElement from "./Card";
import mongoose from "mongoose";
import { useNavigate } from "react-router-dom";

interface course {
    courseId: {
        _id : mongoose.Types.ObjectId,
        title : string,
        price : number,
        imageUrl : string,
        description : string,
        userId : mongoose.Types.ObjectId
    }
}

export default function PurchasedCourses() {

    const [courses , setCourses] = useState([]);
    const navigate = useNavigate();

    const purchasedCourses = async () => {
        const response = await axios.get('https://edusphere-backend-api.onrender.com/purchasedCourses', {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });

        const data =  response.data.message;
        if(data[0]) {
            setCourses(data);
        }
    }

    useEffect(() => {
        purchasedCourses();
    } , [])

    return <div className="min-h-screen min-w-screen bg-BackgroundColor text-fontColor">
        <NavBar />
        <div>
            <div className="font-bold text-2xl p-8 ml-12">
                Purchased Courses
            </div>
            {courses[0] && <div className="flex flex-wrap md:mx-12 gap-10">
                {courses.map((course : course)=> (
                    <div className="my-4 mx-auto" onClick={()=> {
                        navigate(`/content/${course.courseId._id}`);
                    }}>
                    <CardElement title={course.courseId.title} price={course.courseId.price} imageUrl={course.courseId.imageUrl}  buttonText="View Course" /></div>
                ))}
            </div>}
        </div>
    </div>
}