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
    const response = await axios.get(`https://edusphere-backend-api.onrender.com/lecture/${id}`,{
      headers : {
        Authorization : localStorage.getItem('token')
      }
    });
    setLecDetails(response.data.lecture)
  }
  useEffect(()=> {
    getData();
  } , [])
  return (
    <div className="bg-BackgroundColor min-h-screen relative">
      <NavBar />
      <div className="relative aspect-video mx-30 mt-10 rounded-2xl overflow-clip">
        <iframe width="914" height="514" src={lecDetails.videoUrl} allowFullScreen></iframe>
        <div className='text-fontColor text-3xl tracking-tight py-4 font-semibold'>
            {lecDetails.title}
        </div>
      </div>
      <div className='text-fontColor bg-BackgroundColor-200 w-fit absolute right-8  bottom-8 px-4 pr-16 py-2 rounded-2xl'>
        <div className='py-2'>Quik Links</div>
        <a className='flex items-center gap-1' href="https://github.com/Mohammedmt10"><Github /> github</a>
      </div>
    </div>
  );
}