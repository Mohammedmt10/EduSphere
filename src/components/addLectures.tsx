import { useParams } from "react-router-dom"
import AdminNavBar from "./AdminNavBar";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import LectureCard from "./LectureCard";
import mongoose from "mongoose";
import PlusIcon from "../icons/plusIcon";
import CloseIcon from "../icons/Close";

interface Ilecture {
    title : string,
    _id : mongoose.Types.ObjectId,
    createdAt : string
}

export default function AddLectures() {
    const { id } = useParams();
    const [lectures , setLectures] = useState([]);
    const [open , setOpen] = useState(false);

    const getLectures = async ()=> {
        const response = await axios.get(`https://edusphere-backend-mww7.onrender.com/getLectures/${id}`,{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });
        if(response.data.lectures) {
            setLectures(response.data.lectures);
        }
    }

    const createLecture = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const title = formData.get('title');
        const videoUrl = formData.get('videoUrl');

        const response = await axios.post(`https://edusphere-backend-mww7.onrender.com/addLecture/${id}`,{
            title : title,
            videoUrl : videoUrl
        } , {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });

        if(response.data.message == "lecture has been created") {
            alert('lecture has been created');
            setOpen(c => !c);
        } else {
            alert('something went wrong');
        }
    }

    useEffect(() => {
        getLectures();
    },[])

    return <div className="bg-BackgroundColor min-h-screen">
            {open && <div className=" absolute h-screen w-screen bg-BackgroundColor z-[999] text-fontColor flex">
                <div className="absolute right-0 p-3 cursor-pointer" onClick={() => {
                    setOpen(c => !c);
                }}>
                    <CloseIcon />
                </div>
                <form onSubmit={createLecture} className="mx-auto mt-[14%]">
                    <div className="my-2">Title : </div>
                    <input type="text" className="bg-BackgroundColor-200 rounded p-2 px-5 outline-0" name="title" />
                    <br />
                    <div className="my-2 mt-4">Video Url : </div>
                    <input type="text" name="videoUrl" className="bg-BackgroundColor-200 rounded p-2 px-5 outline-0" />
                    <br />
                    <button className="my-4 py-1 rounded cursor-pointer w-full text-center bg-primary-200 text-BackgroundColor" type="submit">
                        Upload
                    </button>
                </form>
            </div>}
        <AdminNavBar />
        <div className="text-fontColor p-5 text-3xl font-medium tracking-tighter flex justify-between mx-16 not-sm:mx-4 not-sm:items-center not-sm:text-xl">
            Your Lectures :
            <div>
                <button className="text-lg not-sm:px-1 text-BackgroundColor font-normal cursor-pointer tracking-normal bg-primary-200 px-3 rounded-md flex items-center gap-1 py-1" onClick={()=>{
                    setOpen(c => !c);
                }}>
                <div className=""><PlusIcon /></div>
                <div className="not-sm:hidden">Add Lecture</div>
                </button>
            </div>
        </div>
        {lectures[0] && <div className="w-full">
            {lectures.map((lecture : Ilecture) => (
                <LectureCard title={lecture.title} date={lecture.createdAt} lectureId={lecture._id} deleteOption={true} />
            ))}
        </div>}
    </div>
}