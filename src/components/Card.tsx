interface iCard {
    title : String,
    price : number
    imageUrl : Object | String | ImageData,
    buttonText : string
}

export default function CardElement(props : iCard) {
    return <div className="w-100 rounded-lg overflow-clip cursor-pointer hover:-translate-y-1 duration-300 drop-shadow-lg drop-shadow-[#0000006a]">
        <div className="flex bg-blend-multiply bg-radial from-[#4C2795] to-[#180C2F] w-full">
        <img src={`${props.imageUrl}`} className="min-w-30 min-h-40" />
        <div className="text-center mx-auto">
            <div className="text-lg font-bold text-white py-2 pt-6 px-10">
                Complete Course
            </div>
            <div className="bg-[#44cec7] px-4 w-60 rounded font-extrabold mx-5 text-2xl">
                {props.title}
            </div>
            <div className="mt-4 font-bold text-amber-50 text-lg">
                Price : &#8377;{props.price}
            </div>
        </div>
    </div>
        <div className="bg-[#383B52] w-full text-center text-white font-bold text-lg py-2 rounded-b-lg">
            {props.buttonText}
        </div>
    </div>
}