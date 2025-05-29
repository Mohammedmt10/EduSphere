import axios from "axios";
import mongoose from "mongoose";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

interface course {
    _id : mongoose.Types.ObjectId,
    title : string,
    price : number,
    imageUrl : string,
    description : string,
    userId : mongoose.Types.ObjectId
}

export default function CourseDetails() {
    const { id } = useParams();
    const [course , setCourse] = useState<Partial<course>>({});

    const purchasedCourse = async () => {
        
        const title = course.title;
        let price = course.price || 1;

        price = price * 100;
        const result = await axios.post('http://localhost:3000/payment',{
            title : title,
            price : price,
            courseId : course._id
        });

        window.location.href = result.data.url;

    }

    const courseDetails = async () => {
        const response = await axios.get(`http://localhost:3000/course/${id}`);
        const data = response.data.response ;
        if(data) {
            setCourse(data);
        } else {
            alert('incorrrect course id');
        }
    
    }
    useEffect(()=>{   
        courseDetails();
    },[]);
    return <div className="bg-[#1D1E30] min-h-screen flex">
        <div className="border-r-2 w-full min-h-screen border-[#383B52]">
            <img src={course.imageUrl} className="pt-20 px-30 w-4xl" />
            <div className=" px-30 pb-10">
                <h1 className="text-white text-2xl font-bold tracking-wider py-10">Overview :</h1>
                <div className="text-white">
                    {course.description}
                </div>
            </div>
        </div>
        <div className="text-white">
            <div className="text-2xl px-10 py-9">
                Bill
            </div>
            <div className="justify-between py-3 flex px-10 w-80">
                <div>
                    Price
                </div>
                <div>
                    {course.price}
                </div>
            </div>
            <div className="justify-between py-3 flex px-10 w-80">
                <div>
                    Tax
                </div>
                <div>
                    0%
                </div>
            </div>
            <div className="justify-between py-3 flex px-10 w-80">
                <div>
                    Total
                </div>
                <div>
                    {course.price}
                </div>
            </div>
            <div className="mx-10 text-center bg-[#383B52] py-2 text-2xl font-bold cursor-pointer rounded mt-20" onClick={()=> {
                purchasedCourse();
            }}>
                Buy
            </div>
        </div>
    </div>
}