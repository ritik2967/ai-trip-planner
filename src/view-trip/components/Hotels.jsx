import React from "react";
import { Link } from "react-router-dom";

const Hotels = ({ trip }) => {
  return (
    <>
      <div>
        <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
          {trip?.tripData?.travelPlan?.hotels?.map((item, index) => {
            return (
              <Link
                to={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  item.HotelName +
                  "," +
                  item?.HotelAddress
                }
                target="_blank"
              >
                <div
                  className="hover:scale-105 transition-all cursor-pointer"
                  key={index}
                >
                  <img
                    src="../placeholder.jpg"
                    className="rounded-xl"
                    alt="No Image Found"
                  />
                  <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{item?.HotelName}</h2>
                    <h2 className="text-xs text-gray-500">
                      📍 {item?.HotelAddress}
                    </h2>
                    <h2 className="text-sm">💰 {item?.Price}</h2>
                    <h2 className="text-sm">⭐ {item.ratings}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Hotels;
