import { Button } from '@/components/ui/button'
import React from 'react'
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


function  PlaceCardItem({place}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ place?.placeName } target='_blank'>
    <div className='border rounded-xl p-3 flex gap-5 mb-3 hover:scale-105 transition-all cursor-pointer hover:shadow-md'>
      <img src="/placeholder.jpeg" alt="" className='w-[100px] h-[100px] rounded-xl' />
      <div className=''>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p>{place.placeDetails}</p>
        <h3 className='font-bold mt-2'> 🕔{place.timeToTravel}</h3>
        
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem