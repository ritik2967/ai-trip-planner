// import React from "react";

// const PlaceCardItem = ({ details }) => {
//   return (
//     <>
//       <div className="border rounded-xl p-3 mt-2 flex gap-5">
//         <img
//           className="h-[150px] w-[150px] rounded-xl"
//           src="../placeholder.jpg"
//           alt="No Image"
//         />
//         <div>
//           <h2 className="font-bold text-lg">{details?.placeName}</h2>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PlaceCardItem;

import React from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ details }) => {
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        details.placeName +
        "," +
        details?.placeDetails
      }
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 cursor-pointer transition-all hover:shadow-md scale-105">
        <img
          className="h-[150px] w-[150px] rounded-xl"
          src="../placeholder.jpg"
          alt="No Image"
        />
        <div>
          <h2 className="font-bold text-lg">
            {details?.placeName || "Unknown Place"}
          </h2>
          <p className="text-sm text-gray-500">{details.placeDetails}</p>
          <h2 className="text-sm mt-2"> ⏱️{details.travelTime}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
