import Clock from "../icons/clock"
import PlayIcon from "../icons/play"

interface LectureCardIf {
    title : string,
    duration : string,
    date : string
}

export default function LectureCard(props : LectureCardIf) {
    return <div className="bg-[#383B52] flex items-center mx-20 mt-5 rounded text-white">
        <div className=" px-10">
            <PlayIcon />
        </div>
        <div className="leading-7 py-2 text-xl font-semibold">
            Title : {props.title} <br />
            <div className="font-normal">
                Created On : {props.date} <br />
            </div>
            <div className="text-md font-light flex items-center gap-2">
                <Clock />{props.duration}
            </div>
        </div>
    </div>
}