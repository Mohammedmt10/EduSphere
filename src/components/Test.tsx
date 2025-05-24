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
        const result = await axios.get('http://localhost:3000/getOutput',{
            headers : {
                Authorization : token
            }
        });
        console.log(result.data.output);
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
                <button onClick={compileCode}>compile</button>
            </div>
            <div className="text-white mt-10 ml-10 text-3xl">
                <div>Output</div>
                <iframe ref={iframeRef}>{output}</iframe>
            </div>
        </div>
    </div>
}