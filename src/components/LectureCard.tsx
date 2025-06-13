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
    return <div className="bg-BackgroundColor-200 flex justify-between mx-20 mt-5 rounded-xl text-fontColor hover:cursor-pointer" onClick={() => {
        navigate(`/lecture/${props.lectureId}`)
    }}>
        <div className="flex items-center">
            <div className=" px-10">
                <PlayIcon />
            </div>
            <div className="leading-7 py-3 text-xl font-medium">
                Title : {props.title} <br />
                <div className="font-extralight py-1">
                    Created On : {props.date} <br />
                </div>
            </div>
        </div>

        {props.deleteOption && <div className="mx-8 my-8 bg-primary-400 text-BackgroundColor p-1 rounded " onClick={deleteLecture}>
            <DeleteIcon />
        </div>}
    </div>
}