import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.travelPlan?.itinerary;

  if (!itinerary || typeof itinerary !== "object") {
    return <p>No itinerary data available.</p>;
  }

  return (
    <>
      {/* <div>
        <h2 className="font-bold text-lg">Places To Visit</h2>
        <div>
          {itinerary?.map((item, index) => {
            return (
              <div key={index}>
                <h2>{item.day1}</h2>
              </div>
            );
          })}
        </div>
      </div> */}
      <div>
        <h2 className="font-bold text-lg mt-5">Places To Visit</h2>
        <div className="mt-5">
          {Object.entries(itinerary).map(([day, details], index) => (
            <div
              key={index}
              className="border p-2 mb-2 grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <h3 className="font-semibold">{day.toUpperCase()}</h3>
              <p className="italic">{details.theme}</p>
              <p>
                <strong>Best Time to Visit:</strong> {details.bestTimeToVisit}
              </p>
              {/* ✅ Map through places array */}
              {details.places?.map((place, idx) => (
                <PlaceCardItem key={idx} details={place} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlacesToVisit;
