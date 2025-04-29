import CardElement from "./Card";
import MohammedPhoto from "../photos/MohammedPhoto.png"
import { useNavigate } from "react-router-dom";

export default function Courses() {
    const navigate = useNavigate();
    return <div className="h-full mt-10">
        <div className="text-6xl font-bold text-white text-center">
            Courses
        </div>
        <div className="w-fit mx-auto p-10 flex gap-10">
            <div onClick={() => navigate('/webdevcourse')}>
                <CardElement title={"Web Development"} price={999} imageAddress={MohammedPhoto} />
            </div>
            <div onClick={() => navigate('/devopscourse')}>
                <CardElement title={"Devops"} price={999} imageAddress={MohammedPhoto} />
            </div>
        </div>
    </div>
}