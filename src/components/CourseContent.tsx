import axios from "axios";
import LectureCard from "./LectureCard";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import mongoose from "mongoose";

interface Ilec {
    _id : mongoose.Types.ObjectId,
    title : string,
    videoUrl : string,
    createdAt : string
}

export default function CourseContent() {

    const { id } = useParams();
    const [lectures , setLectures] = useState([]);

    const getLec = async () => {
        const response = await axios.get(`http://localhost:3000/getLectures/${id}`, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
        setLectures(response.data.lecture);
    }

    useEffect(()=> {
        getLec();
    },[])

    return <div className="min-h-screen bg-[#16171B]">
        <NavBar />
        {lectures.map((lecture : Ilec) => (
            <LectureCard title={lecture.title} date={lecture.createdAt} lectureId={lecture._id} />
        ))}
    </div>
}