export default function Hero() {
    return <div className="relative overflow-x-clip min-h-screen">
        <div>
            <div className="w-35 h-12 rounded-full bg-[#4C2795] rotate-35 -translate-x-10 translate-y-8"></div>
            <div className="w-35 h-12 rounded-full bg-[#00FFF2] rotate-35 -translate-x-10 translate-y-11"></div>
        </div>
        <div className="text-center">
            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#525252] mt-30">
                EduSphere
            </div>
            <div className="text-xl font-bold text-[#6F76FD]">
                Unlock Knowledge, Unlock Potentia
            </div>
        </div>
        <div className="absolute right-0 mt-20">
            <div className="w-35 h-12 rounded-full bg-[#4C2795] rotate-35 translate-x-10 translate-y-8"></div>
            <div className="w-35 h-12 rounded-full bg-[#00FFF2] rotate-35 translate-x-10 translate-y-11"></div>
        </div>
        <img src="src\photos\Hero_Image.avif" className="mx-auto mt-80" />
    </div>
}