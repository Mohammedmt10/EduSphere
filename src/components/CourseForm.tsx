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

        const response = await axios.post('https://edusphere-backend-mww7.onrender.com/createCourse',{
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
            const result = await axios.post('https://edusphere-backend-mww7.onrender.com/buy',{
                courseId :response.data._id
            }, {
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            });
            if(result.data.message == 'purchased') {
                setMessage('Course has been created');
                navigate('/adminDashboard');
            }
        } else if(response.data.message == "invalid input"){
            setMessage('Invalid input')
        } else {
            setMessage('something went wrong')
        }
    }

    return <div className="bg-BackgroundColor min-h-screen not-lg:overflow-auto overflow-clip max-h-screen">
        <AdminNavBar />
        <div className=" h-screen w-full flex">
        <form className="text-fontColor text-lg not-sm:px-4 p-10 w-fit not-sm:w-fit not-lg:border-0 border-r-2 h-full not-lg:pr-0 pr-60 not-sm:mx-auto" onSubmit={createCourse}>
            <div className="not-sm:block">
                <div className="py-2">Title :</div> 
                    <input type="text" className="bg-BackgroundColor-200 outline-0 rounded py-1.5 px-5 w-96 mb-2 font-normal not-sm:ml-0 not-sm:w-78" name="title" placeholder="Name of the Course" />
            </div>
            <div className=" mb-2 not-sm:block">
                <div className="py-2">
                    Description :
                </div>
                <textarea className="bg-BackgroundColor-200 outline-0 rounded p-1 py-1.5 px-5 w-96 resize-none not-sm:w-78" placeholder="Information about your course" name="desc" rows={5} />
            </div>
            <div className=" not-sm:block">
                <div className="py-2">Price :</div>
                    <input type="text" className="bg-BackgroundColor-200 outline-0 rounded p-2 px-5 w-96 mb-2 not-sm:w-78" name="price" placeholder="Price in Dollar" />
                </div>
                <div className=" not-md:block">
                    <div className="py-2">Image Url : </div>
                    <input type="text" className="bg-BackgroundColor-200 outline-0 rounded p-2 px-5 w-95 mb-4 not-md:w-78" name="imgUrl" placeholder="Image which will be displayed on course" />
                </div>
                {message && <div className="text-red-500 text-center mb-3">
                        {message}
                    </div>}
                <div>
                    <button className="bg-primary-200 text-BackgroundColor w-fit font-medium py-1 px-2.5 rounded hover:cursor-pointer float-right relative" type="submit">
                    Create
                </button>
                </div>
            </form>
            <div className="text-fontColor px-8 not-lg:hidden">
                <div className="text-4xl py-8 tracking-tight">Create Your Course</div>
                <div className="w-full tracking-wider">
                    You can create your course here. Fill all the fields all of them are required. The price is going to be in dollar. 
                </div>
            </div>
        </div>
    </div>
}