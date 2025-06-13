import axios from "axios"
import DeleteIcon from "../icons/delete"
import CourseDetails from "./CourseDetails"
import mongoose from "mongoose"
import { useNavigate } from "react-router-dom"

interface iCard {
    title : String,
    price : number
    imageUrl : string,
    buttonText : string,
    deleteOption ?: boolean,
    _id ?: mongoose.Types.ObjectId
}

export default function CardElement(props : iCard) {

    const navigate = useNavigate();

    const onclickHandler = async () => {
        const result = await axios.post('https://edusphere-backend-mww7.onrender.com/deleteCourse',{
            courseId : props._id
        });
        if(result.data.message == "course has been deleted") {
            alert('course was deleted');
            navigate('/adminDashboard');
        } else {
            alert('course was not deleted');
        }
    }

    return <div className="w-100 rounded-lg overflow-clip cursor-pointer duration-300 hover:scale-101">
        <div>
        {props.deleteOption && <div onClick={onclickHandler} className="bg-primary-200 absolute p-1 rounded m-2 float-end text-BackgroundColor ml-89">
            <DeleteIcon />
        </div>}
            <img src={props.imageUrl} className="w-100 h-48 object-cover"/>
        </div>
        <div className="bg-primary-400 w-full text-center text-BackgroundColor-200 font-semibold text-lg py-2 rounded-b-lg">
            {props.buttonText}
        </div>
    </div>
}