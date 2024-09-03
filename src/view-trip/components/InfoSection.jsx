import React, { useEffect, useState } from "react";
import Placeholder from "../components/Placeholder.jpeg";
import { Button } from "@/components/ui/button";
import { FaShareAlt } from "react-icons/fa";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

//Getting Google Photo by Using Photo API START



function InfoSection({ trip }) {

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
    <div>
      <img
        src={photoUrl?photoUrl:Placeholder}
        alt=""
        className="h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex justify-between items-center flex-wrap">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl text-[#0077b6]">
            {trip?.userSelection?.Location?.label}
          </h2>
          <div className="flex gap-2 flex-wrap">
            <h2 className="p-1 px-2 sm:px-3 bg-black rounded-full text-gray-50 text-xs sm:text-sm md:text-md">
              🗓️ &nbsp;{trip?.userSelection?.NumberOfDays} Days
            </h2>
            <h2 className="p-1 px-2 sm:px-3 bg-black rounded-full text-gray-50 text-xs sm:text-sm md:text-md">
              💰 &nbsp;{trip?.userSelection?.Budget} Budget{" "}
            </h2>
            <h2 className="p-1 px-2 sm:px-3 bg-black rounded-full text-gray-50 text-xs sm:text-sm md:text-md">
              👩‍👩‍👦 &nbsp;No. Of Traveler: {trip?.userSelection?.TravelrType}{" "}
            </h2>
          </div>
        </div>
        <Button className="ml-auto sm:ml-0 mt-3 sm:mt-0">
          <FaShareAlt />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
