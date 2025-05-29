import { ChangeEvent, useRef, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";


export default function TestPage() {
    const [code , setCode] = useState();
    const [output , setOutput] = useState('');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const getCode = (e : ChangeEvent) => {
        //@ts-ignore
        setCode(e.currentTarget.value);
    }

    const compileCode = async () => {
        const response = await axios.post('http://localhost:3000/test',{
            code : code
        });
        const token = response.data.token;
        console.log(response.data);
        console.log(token);
        const result = await axios.get('http://localhost:3000/getOutput',{
            headers : {
                Authorization : token
            }
        });
        
        if(result.data.result.status.description == "Accepted"){
            setOutput(atob(result.data.result.stdout))
        } else if(result.data.result.status.description == "Runtime Error (NZEC)") {
            setOutput(atob(result.data.result.stderr))
        } else {
            setOutput('something went wrong');
        }
        // if(result.data)

    }
    return <div className="bg-[#16171B] h-screen w-screen">
        <NavBar />
        <div className="flex">
            <div className="text-white ml-20 mt-10">
                <div className="text-3xl">
                    Code
                </div>
                <div>
                    <textarea name="" id="" rows={20} cols={120} className="bg-[#23253C] mt-3 outline-0 pl-7" onChange={getCode}></textarea>
                </div>
                <button onClick={compileCode} className="p-2 bg-[#262a56] rounded cursor-pointer">compile</button>
            </div>
            <div className="text-white mt-10 ml-10 text-3xl">
                <div>Output</div>
                <div ref={iframeRef} className="text-white text-xl bg-[#23253C] h-120 p-3 w-md mt-3 rounded overflow-auto">{output}</div>
            </div>
        </div>
    </div>
}