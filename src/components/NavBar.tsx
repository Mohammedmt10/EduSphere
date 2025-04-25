export default function NavBar() {
    return <div className="relative text-white bg-[#1D1E30] flex justify-between px-20 py-4 items-center font-[Jockey One] z-[999]">
        <div className="text-3xl font-semibold tracking-wider">
            Edusphere
        </div>
        <div className="flex items-center">
            <div className="font-semibold px-4">Home</div>
            <div className="font-semibold px-4">Courses</div>
            <div className="font-semibold px-4">Tests</div>
            <div className="font-semibold px-6 py-2 bg-[#383B52] shadow-md shadow-black rounded-full border-2 border-[#383B52] hover:bg-[#1D1E30] cursor-pointer">Login</div>
        </div>
    </div>
}