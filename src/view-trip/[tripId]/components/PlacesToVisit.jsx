import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Check if itinerary exists and is an object
  const itinerary = trip?.tripData?.itinerary;

  if (!itinerary || typeof itinerary !== 'object') {
    return <p>No itinerary available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      {/* Iterate over each day dynamically */}
      {Object.entries(itinerary).map(([day, dayData], dayIndex) => {
        const plan = dayData.plan; // Access the plan array for the current day

        if (!Array.isArray(plan)) {
          return <p key={dayIndex}>No plan available for {day}.</p>;
        }

        return (
          <div key={dayIndex} className="mt-5">
            <h3 className="font-bold text-lg mt-5">{day.toUpperCase()}</h3>

            {/* Iterate over each place in the plan for the current day */}
            {plan.map((item, index) => (
              <div key={index}>
                <div className="grid grid-row-2">
                  <PlaceCardItem place={item} />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default PlacesToVisit;
