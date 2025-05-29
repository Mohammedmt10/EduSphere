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
        const response = await axios.get(`http://localhost:3000/getLectures/${id}`,{
            headers : {
                Authorization : localStorage.getItem('token')
            }
        });
        if(response.data.lecture) {
            setLectures(response.data.lecture);
        }
    }

    const createLecture = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const title = formData.get('title');
        const videoUrl = formData.get('videoUrl');

        const response = await axios.post(`http://localhost:3000/addLecture/${id}`,{
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

    return <div className="bg-[#141439] min-h-screen">
            {open && <div className=" absolute h-screen w-screen bg-[#141439] z-[999] text-amber-50 flex">
                <div className="absolute right-0 p-3 cursor-pointer" onClick={() => {
                    setOpen(c => !c);
                }}>
                    <CloseIcon />
                </div>
                <form onSubmit={createLecture} className="mx-auto my-auto">
                    <div className="my-2">Title : </div>
                    <input type="text" className="bg-[#202051] rounded p-2 px-5 outline-0" name="title" />
                    <br />
                    <div className="my-2 mt-4">Video Url : </div>
                    <input type="text" name="videoUrl" className="bg-[#202051] rounded p-2 px-5 outline-0" />
                    <br />
                    <button className="my-4 py-1 rounded cursor-pointer w-full text-center bg-[#3aa0ba]" type="submit">
                        Upload
                    </button>
                </form>
            </div>}
        <AdminNavBar />
        <div className="text-amber-50 p-5 text-3xl font-medium tracking-tighter flex justify-between">
            Your Lectures :
            <div>
                <button className="text-lg font-normal cursor-pointer tracking-normal bg-[#3aa0ba] px-3 rounded-md flex items-center gap-1 py-1" onClick={()=>{
                    setOpen(c => !c);
                }}>
                <PlusIcon />
                Add Lecture
                </button>
            </div>
        </div>
        <div>
            {lectures.map((lecture : Ilecture) => (
                <LectureCard title={lecture.title} date={lecture.createdAt} lectureId={lecture._id} />
            ))}
        </div>
    </div>
}