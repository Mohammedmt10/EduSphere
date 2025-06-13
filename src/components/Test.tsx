import { ChangeEvent , useRef, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Loader from "./loader";


export default function TestPage() {
    const [code , setCode] = useState();
    const [output , setOutput] = useState('');
    const [loader , setLoader] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const getCode = (e : ChangeEvent) => {
        //@ts-ignore
        setCode(e.currentTarget.value);
    }

    const compileCode = async () => {
        if(code == null) {
            return;
        }
        const response = await axios.post('https://edusphere-backend-mww7.onrender.com/test',{
            code : code
        });
        const token = response.data.token;
        
        setLoader(c => !c)

        const result = await axios.get('https://edusphere-backend-mww7.onrender.com/getOutput',{
            headers : {
                Authorization : token
            }
        });
        
        setLoader(c=> !c)
        
        console.log(result.data.result.stdout)
        
        if(result.data.result.status.description == "Accepted" && result.data.result.stdout != null){
            setOutput(atob(result.data.result.stdout))
        } else if(result.data.result.status.description == "Runtime Error (NZEC)") {
            setOutput(atob(result.data.result.stderr))
        } else if(result.data.result.stdout == null) {
            setOutput('');
        } else {
            setOutput('something went wrong');
        }
        // if(result.data)

    }
    return <div className="bg-BackgroundColor min-h-screen">
        <NavBar />
        {loader && <Loader />}
        <div className="flex not-xl:block pb-10">
            <div className="text-fontColor ml-20 mt-10 not-lg:mx-5">
                <div className="text-3xl">
                    Code
                </div>
                <div className="max-w-200 lg:w-200 md:min-w-80 not-md:w-full">
                    <textarea name="" id="" rows={20} className="bg-BackgroundColor-200 mt-3 outline-0 px-7 w-full text-xl font-code not-lg:w-full" onChange={getCode}></textarea>
                </div>
                <button onClick={compileCode} className="p-2 bg-primary-200 text-BackgroundColor-200 rounded cursor-pointer">compile</button>
            </div>
            <div className="text-fontColor mt-10 mx-10 not-md:mx-5 text-3xl">
                <div>Output</div>
                <div ref={iframeRef} className="text-fontColor text-xl bg-BackgroundColor-200 h-140 p-3 w-md not-md:w-full mt-3 rounded overflow-auto">{output}</div>
            </div>
        </div>
    </div>
}