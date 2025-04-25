interface iCard {
    title : String,
    price : number
    imageAddress : Object | String | ImageData
}

export default function CardElement(props : iCard) {
    return <div className="w-100 rounded-lg overflow-clip cursor-pointer">
        <div className="flex bg-blend-multiply bg-radial from-[#4C2795] to-[#180C2F] w-full">
        <img src={`${props.imageAddress}`} className="w-30 h-40" />
        <div className="text-center mx-auto">
            <div className="text-lg font-bold text-white py-2 pt-6 px-10">
                Complete Course
            </div>
            <div className="bg-[#00FFF2] px-4 w-fit rounded font-extrabold mx-auto text-2xl">
                {props.title}
            </div>
            <div className="mt-4 font-bold text-white text-lg">
                Price : &#8377;{props.price}
            </div>
        </div>
    </div>
        <div className="bg-[#383B52] w-full text-center text-white font-bold text-lg py-2">
            Buy
        </div>
    </div>
}