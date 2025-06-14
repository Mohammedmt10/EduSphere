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
        const result = await axios.post('https://edusphere-backend-mww7.onrender.com/payment',{
            title : title,
            price : price,
            courseId : course._id
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });

        if(result.data.message) {
            alert('something went wrong');
        }
        if(result.data.url) {
            window.location.href = result.data.url;
        }


    }

    const courseDetails = async () => {
        const response = await axios.get(`https://edusphere-backend-mww7.onrender.com/course/${id}`);
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
    return <div className="bg-BackgroundColor min-h-screen flex not-md:block">
        <div className="border-r-2 w-full pb-20 border-fontColor">
            <img src={course.imageUrl} className="pt-20 px-30 not-md:px-12 w-4xl" />
            <div className=" px-30 not-md:px-12">
                <h1 className="text-fontColor text-2xl font-bold tracking-wider py-10">Overview :</h1>
                <div className="text-fontColor">
                    {course.description}
                </div>
            </div>
        </div>
        <div className="text-fontColor text-center md:py-10 pb-10">
            <div className="text-2xl px-10 pb-9">
                Bill
            </div>
            <div className="justify-between py-3 flex px-10 w-80 mx-auto">
                <div>
                    Price
                </div>
                <div>
                    ${course.price}
                </div>
            </div>
            <div className="justify-between py-3 flex px-10 w-80 mx-auto">
                <div>
                    Tax
                </div>
                <div>
                    0%
                </div>
            </div>
            <div className="justify-between py-3 flex px-10 w-80 mx-auto">
                <div>
                    Total
                </div>
                <div>
                    ${course.price}
                </div>
            </div>
            <div className="mx-10 text-center bg-primary-200 py-2 text-xl font-medium text-BackgroundColor-200 cursor-pointer rounded mt-20" onClick={()=> {
                purchasedCourse();
            }}>
                Buy
            </div>
        </div>
    </div>
}