import React from 'react'
import PlaceCradItem from './PlaceCradItem'

function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5 text-[#0077b6]'>Your Travel Diary</h2>

      <div>
        {trip?.TipData?.itinerary.map((item,index)=>(
            <div className='mt-5' >
                <h2 className='font-medium text-lg'>Day&nbsp;{item.day}</h2>
                <div className='grid md:grid-cols-2 gap-5'>
                {item.plan.map((place,index)=>(
                    <div className=''>
                        <h2 className='font-medium text-sm text-orange-600'>⌚&nbsp;{place?.time}</h2>
                       <PlaceCradItem place={place}/>
                        
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default PlacesToVisit
