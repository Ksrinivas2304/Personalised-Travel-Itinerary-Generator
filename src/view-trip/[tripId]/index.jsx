import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, getDoc } from 'firebase/firestore'; // Import getDoc and doc from firestore
import { db } from '@/service/firebaseConfig'; // Ensure correct import for db
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({}); // Initialize as an empty object

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data()); // Fix console log
      setTrip(docSnap.data()); // Use setTrip instead of setTripData
    } else {
      console.log("No such Document");
      toast('No Trip Found!'); // Fixed typo 'No Strip Found!'
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection trip={trip} />
      <Hotels trip={trip}/>
      <PlacesToVisit trip={trip}/>
      <Footer trip={trip}/>
    </div>
  );
}

export default Viewtrip;
