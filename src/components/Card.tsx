interface iCard {
    title : String,
    price : number
}

export default function CardElement(props : iCard) {
    return <div className="border-2 p-4 leading-5">
        {props.title} <br />
        {props.price}
    </div>
}