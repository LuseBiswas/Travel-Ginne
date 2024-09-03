import React, { useEffect, useState } from 'react'
import Placeholder from "../components/Placeholder.jpeg";
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripsCardItem({trip}) {

    const [photoUrl, setPhotoUrl] = useState();


  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

   
  const GetPlacePhoto = async()=>{
    const data = {
      textQuery:trip?.userSelection?.Location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
      
      
    })
  }

  //Getting Google Photo by Using Photo API END



  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-110 transition-all cursor-pointer  hover:rounded-xl'>
      <img src={photoUrl?photoUrl:Placeholder} alt="" className='h-[200px] w-full object-cover rounded-xl ' />
      <div>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.Location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.NumberOfDays} days with {trip?.userSelection?.Budget} Budget</h2>
      </div>
    </div>
    </Link>
    
  )
}

export default UserTripsCardItem
