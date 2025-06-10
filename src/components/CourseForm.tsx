import { FormEvent, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CourseForm() {

    const navigate = useNavigate();
    const [message , setMessage] = useState('');

    const createCourse = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget
        const formData = new FormData(form);

        const title = formData.get('title');
        const desc = formData.get('desc');
        const price = Number(formData.get('price'));
        const imgUrl = formData.get('imgUrl');

        const response = await axios.post('https://edusphere-backend-api.onrender.com/createCourse',{
            title : title,
            description : desc,
            price : price,
            imageUrl : imgUrl
        },{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });

        if(response.data.message == "course created") {
            setMessage('Course has been created');
            navigate('/adminDashboard');
        } else if(response.data.message == "invalid input"){
            setMessage('Invalid input')
        } else {
            setMessage('something went wrong')
        }
    }

    return <div className="bg-[#141439] h-screen">
        <AdminNavBar />
        <form className="text-amber-50 text-lg p-10 w-145" onSubmit={createCourse}>
            Title : 
            <input type="text" className="bg-[#202051] outline-0 ml-18 rounded py-1.5 px-5 w-96 mb-5 font-normal" name="title" placeholder="Name of the Course" />
            <div className="flex mb-5">
                <div>
                    Description :
                </div>
                <textarea className="bg-[#202051] outline-0 ml-4 rounded p-1 py-1.5 px-5 w-96 resize-none" placeholder="Information about your course" name="desc" rows={5} />
            </div>
            Price : 
            <input type="text" className="bg-[#202051] outline-0 ml-17 rounded p-2 px-5 w-96 mb-5" name="price" placeholder="Price in INR" />
            <br />
            Image Url : 
            <input type="text" className="bg-[#202051] outline-0 ml-8 rounded p-2 px-5 w-95 mb-3" name="imgUrl" placeholder="Image which will be displayed on course" />
            <br />
            {message && <div className="text-red-500 text-center mb-3">
                    {message}
                </div>}
            <div>
                <button className="bg-[#3aa0ba] w-fit font-medium py-1 px-2.5 rounded-lg hover:cursor-pointer text-shadow-lg shadow-black float-right relative" type="submit">
                Create
            </button>
            </div>
        </form>
    </div>
}