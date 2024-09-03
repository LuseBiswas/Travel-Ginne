import React, { useEffect, useState } from 'react';
import Placeholder from "../components/Placeholder.jpeg";
import { Button } from '@/components/ui/button';
import { RiMapPinFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCradItem({place}) {

  //This is Phot URL reusable code , from InfoSection.jsx
  const [photoUrl, setPhotoUrl] = useState();


  useEffect(()=>{
    place&&GetPlacePhoto();
  },[place])

   
  const GetPlacePhoto = async()=>{
    const data = {
      textQuery:place.placeName//Customize it according to the desire url
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
      
      
    })
  }

  //This is Phot URL reusable code , from InfoSection.jsx


  return (
    <Link to={'https://google.com/maps/search/?api=1&query='+place.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]'>
        <img src={photoUrl?photoUrl:Placeholder} alt="" className='w-[130px] h-[130px] rounded-xl object-cover' />
        <div>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place?.placeDetails}</p>
            <h2 className='mt-2'>{place?.timeToTravel}</h2>
            {/*<Button size='sm'><RiMapPinFill /></Button>*/}
          </div>
      </div>

    </Link>
    
  )
}

export default PlaceCradItem
