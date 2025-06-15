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
    const response = await axios.get(`https://edusphere-backend-mww7.onrender.com/lecture/${id}`,{
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
      <div className="relative aspect-video mx-30 mt-10 not-lg:mx-4 h-auto w-auto rounded-2xl overflow-clip">
        <iframe className="aspect-video w-4xl not-sm:w-full" src={lecDetails.videoUrl} allowFullScreen></iframe>
        <div className='text-fontColor text-3xl not-lg:text-2xl tracking-tight py-4 font-semibold not-lg:font-medium'>
            {lecDetails.title}
        </div>
      </div>
      <div className='text-fontColor bg-BackgroundColor-200 w-fit absolute right-8  bottom-8 px-4 pr-16 py-2 rounded-2xl not-lg:w-fit not-lg:right-2 text-center not-lg:mx-4'>
        <div className='py-2'>Quik Links</div>
        <a className='flex items-center gap-1' href="https://github.com/Mohammedmt10"><Github /> github</a>
      </div>
    </div>
  );
}