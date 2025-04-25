import CardElement from "./Card";
import MohammedPhoto from "../photos/MohammedPhoto.png"

export default function Courses() {
    return <div className="h-full mt-10">
        <div className="text-6xl font-bold text-white text-center">
            Courses
        </div>
        <div className="w-fit mx-auto p-10 flex gap-10">
            <CardElement title={"Web Development"} price={999} imageAddress={MohammedPhoto} />
            <CardElement title={"Web Development"} price={999} imageAddress={MohammedPhoto} />
        </div>
    </div>
}