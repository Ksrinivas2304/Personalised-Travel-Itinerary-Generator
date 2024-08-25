import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GolabalApi';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import axios from 'axios';

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_APY_KEY
function InfoSection({ trip }) {
  // State to store the image URL
  
  const [imageUrl, setImageUrl] = useState('/placeholder.jpeg'); // Default image

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);



 
  {/*
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    try {
      const result = await GetPlaceDetails(data);
      console.log(result.data.places[0].photos[3].name);
      
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',result.data.places[0].photos[3].name);// Display fetched data in console

      // Assuming the image URL is returned in `result.data.photoUrl`
      // Update the state with the fetched image URL
      if (result.data && result.data.photoUrl) {
        setImageUrl(result.data.photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };*/}
  const GetPlacePhoto = async () => {
    const textQuery = trip?.userSelection?.location?.label;
  
    try {
      const response = await axios.get(`http://localhost:5000/api/places?textQuery=${textQuery}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };
  

  return (
    <div>
      <img 
        src={imageUrl} 
        alt={trip?.userSelection?.location?.label || 'Placeholder'} 
        className='h-[400px] w-full object-cover rounded-xl' 
      />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📆{trip.userSelection?.noOfDays} Day</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰{trip.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🍻{trip.userSelection?.traveler} Traveler</h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>    
      </div>
    </div>
  );
}

export default InfoSection;
