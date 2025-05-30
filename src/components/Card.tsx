interface iCard {
    title : String,
    price : number
    imageUrl : string,
    buttonText : string
}

export default function CardElement(props : iCard) {
    return <div className="w-100 rounded-lg overflow-clip cursor-pointer hover:-translate-y-1 duration-300 hover:scale-110">
        <div>
            <img src={props.imageUrl} className="w-100 h-50"/>
        </div>
        <div className="bg-primary-400 w-full text-center text-BackgroundColor-200 font-semibold text-lg py-2 rounded-b-lg">
            {props.buttonText}
        </div>
    </div>
}