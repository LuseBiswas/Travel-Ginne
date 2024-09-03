import { db } from '@/service/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripsCardItem from './components/UserTripsCardItem';

function MyTrips() {
    const navigation = useNavigation();

    const [userTrips, setUserTrips] = useState([]);

    //First we need to fetch all the trips belong to the user
    useEffect(()=>{
        GetUserTrips();
    },[])
    const GetUserTrips = async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigation('/');
            return ;
        }
       
        //Making quesry using Firbase Document to fetch the user trips only
        const q = query(collection(db, 'AiTrips'),where('userEmail', '==', user?.email));//You query is ready

        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevVal=>[...prevVal,doc.data()]);//Here we store it with previouse value
});
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>My Trips</h1>

      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {userTrips?.length>0?userTrips.map((trip, index)=>(
            <UserTripsCardItem trip={trip} key={index} />
        ))
      :[1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='h-[200px] w-full bg-slate-400 animate-pulse rounded-xl'>

        </div>
      ))
      }
      </div>
    </div>
  )
}

export default MyTrips
