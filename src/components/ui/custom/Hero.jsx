import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-8'>
      
      <h1 className='font-extrabold text-[40px] text-center mt-14'> 
        <span className='text-[#da4444]'> 
        Embark on Your Next Journey</span><br /> Personalised AI Travel Itinerary Generator</h1>
        <p className='text-xl text-gray-500 text-center'> Your personal trip planner, creating custom itineraries that match your interests and budget.</p>

        <Link to={'/create-trip'}>
        <Button> Get Started, It's Free</Button>
        </Link>

        <img src="/landing.png" alt="" className='-mt-25'/>
      
        
    </div>
  )
}

export default Hero