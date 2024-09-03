import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';


function ViewTrip() {

    const {tripId} = useParams();//Object Destructuring is happening here
    const [trip, setTrip] = useState([]);
    useEffect(()=>{
        tripId&&GetTripData();

    },[tripId])
    const GetTripData = async () =>{
        const docRef = doc(db,'AiTrips',tripId);//Fetching trip details via trip id from firebase
        const docSnap = await getDoc(docRef);
        //All the above code you'll find in FireBase documentation

        if(docSnap.exists()){
            console.log('Dcument: ' , docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No Such Dcumenst");
            toast('No Trip Found')
            
        }
    }
  return (
    <>
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/*Information Section */}
        <InfoSection trip={trip}/>

        {/*Recommended Hotels */}
        <Hotels trip={trip}/>

        {/*Dails Plans */}
        <PlacesToVisit trip={trip}/>

        {/*Footer */}
        <Footer trip={trip}/>
    </div>
    </>
  )
}

export default ViewTrip
