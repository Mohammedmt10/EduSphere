import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function PaymentSuccessfull() {

    const { id , courseId } = useParams();

    const Success = async () => {
        const checkPayment = await axios.get(`http://localhost:3000/verifyPayment?session_id=${id}`);
        if(checkPayment.data.paymentStatus == 'paid') {
            const buy = await axios.post('http://localhost:3000/buy',{
                courseId : courseId
            },{
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            });
            if(buy.data.message == "purchased") {
                
            }
        }
    }

    useEffect(()=> {
        Success();
    },[])

    const navigate = useNavigate();
    return <div className="bg-[#181818] min-h-screen min-w-screen">
        <div className="text-4xl text-amber-50 text-center py-40 font-bold tracking-wider">
            Your payment was Successfull <br />
            <button className="bg-blue-500 font-medium text-2xl px-4 py-1 rounded-lg cursor-pointer mt-10" onClick={() => {
                navigate('/');
            }}>Home</button>
        </div>
    </div>
}