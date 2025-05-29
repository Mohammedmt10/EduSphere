import { useNavigate } from "react-router-dom"
import PlayIcon from "../icons/play"
import mongoose from "mongoose";

interface LectureCardIf {
    title : string,
    date : string,
    lectureId : mongoose.Types.ObjectId
}

export default function LectureCard(props : LectureCardIf) {
    const navigate = useNavigate();
    return <div className="bg-[#383B52] flex items-center mx-20 mt-5 rounded text-white hover:cursor-pointer" onClick={() => {
        navigate(`/lecture/${props.lectureId}`)
    }}>
        <div className=" px-10">
            <PlayIcon />
        </div>
        <div className="leading-7 py-2 text-xl font-semibold">
            Title : {props.title} <br />
            <div className="font-normal">
                Created On : {props.date} <br />
            </div>
        </div>
    </div>
}