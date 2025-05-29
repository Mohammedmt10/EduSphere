import ReactPlayer from 'react-player';
import NavBar from "./NavBar";
import Github from '../icons/GitHub';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface lec {
  title : string,
  videoUrl : string
}

export default function LecturePlayer() {
  const { id } = useParams();
  const [lecDetails , setLecDetails] = useState<Partial<lec>>({});
  const getData = async () => {
    const response = await axios.get(`http://localhost:3000/lecture/${id}`,{
      headers : {
        Authorization : localStorage.getItem('token')
      }
    });
    console.log(response.data.lecture)
    setLecDetails(response.data.lecture)
  }
  useEffect(()=> {
    getData();
  } , [])
  return (
    <div className="bg-[#16171B] h-full pb-10">
      <NavBar />
      <div className="relative aspect-video mx-30 mt-10 rounded-2xl overflow-clip">
        <iframe width="914" height="514" src={lecDetails.videoUrl} allowFullScreen></iframe>
        <div className='text-white text-3xl tracking-tight py-4 font-semibold'>
            {lecDetails.title}
        </div>
      </div>
      <div className='text-white bg-[#25263a] px-4 mx-30 rounded py-2 mr-40'>
        <div className='py-2'>Quik Links</div>
        <div className='flex items-center gap-1 py-2'><Github /> github</div>
      </div>
    </div>
  );
}