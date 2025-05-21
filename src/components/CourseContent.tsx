import LectureCard from "./LectureCard";
import NavBar from "./NavBar";

export default function CourseContent() {
    return <div className="min-h-screen bg-[#16171B]">
        <NavBar />
        <LectureCard title="1.1 something" date="11/2/23" duration="1hrs 30mins" />
        <LectureCard title="1.1 something" date="11/2/23" duration="1hrs 30mins" />
        <LectureCard title="1.1 something" date="11/2/23" duration="1hrs 30mins" />
        <LectureCard title="1.1 something" date="11/2/23" duration="1hrs 30mins" />
    </div>
}