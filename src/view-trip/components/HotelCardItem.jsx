import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Placeholder from "../components/Placeholder.jpeg";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({hotel}) {


  //This is Phot URL reusable code , from InfoSection.jsx
  const [photoUrl, setPhotoUrl] = useState();


  useEffect(()=>{
    hotel&&GetPlacePhoto();
  },[hotel])

   
  const GetPlacePhoto = async()=>{
    const data = {
      textQuery:hotel?.hotelName//Customize it according to the desire url
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
      
      
    })
  }


  //This is Phot URL reusable code , from InfoSection.jsx

  return (
    <Link to={'https://google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel?.hotelAddress} target='_blank'>
                 <div className='hover:scale-110 transition-all cursor-pointer hover:shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:rounded-xl'>
                <img src={photoUrl?photoUrl:Placeholder} alt="" className='rounded-xl h-[180px] w-full object-cover ' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📌&nbsp;{hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰&nbsp;{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐&nbsp;{hotel?.rating}</h2>
                </div>
            </div>
            </Link>
  )
}

export default HotelCardItem
