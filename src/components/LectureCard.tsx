import { useNavigate } from "react-router-dom"
import PlayIcon from "../icons/play"
import mongoose from "mongoose";
import DeleteIcon from "../icons/delete";
import axios from "axios";

interface LectureCardIf {
    title : string,
    date : string,
    lectureId : mongoose.Types.ObjectId,
    deleteOption ?: boolean
}

export default function LectureCard(props : LectureCardIf) {
    const navigate = useNavigate();
    const deleteLecture = async () => {
        const result = await axios.post(`https://edusphere-backend-mww7.onrender.com/deleteLecture`,{
            lectureId : props.lectureId
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
        if(result.data.message == "course has been deleted") {
            alert("lecture has been deleted");
            navigate('/adminDashboard')
        }
    }
    return <div className="bg-BackgroundColor-200 flex justify-between mx-20 mt-5 rounded-xl text-fontColor hover:cursor-pointer not-sm:mx-8 not-sm:px-4" onClick={() => {
        navigate(`/lecture/${props.lectureId}`)
    }}>
        <div className="flex items-center">
            <div className=" px-10 not-sm:hidden">
                <PlayIcon />
            </div>
            <div className="leading-7 py-3 text-xl not-sm:text-lg font-medium">
                <div>Title : {props.title}</div>
                <div className="font-extralight py-1 not-sm:py-0 not-sm:hidden">
                    Created On : {props.date}
                </div>
            </div>
        </div>

        {props.deleteOption && <div className="mx-8 my-8 not-sm:mx-2 not-sm:my-4 bg-primary-400 text-BackgroundColor p-1 rounded h-fit" onClick={deleteLecture}>
            <DeleteIcon />
        </div>}
    </div>
}