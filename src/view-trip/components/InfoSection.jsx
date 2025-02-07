import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  // useEffect(() => {
  //   trip && GetPlacePhoto();
  // }, [trip]);

  // const GetPlacePhoto = async () => {
  //   const data = {
  //     textQuery: trip?.userSelection?.location,
  //   };
  //   const result = await GetPlaceDetails(data).then((resp) => {
  //     console.log(resp.data);
  //   });
  // };

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    if (!trip?.userSelection?.location) return;

    const data = { textQuery: trip.userSelection.location };

    try {
      const result = await GetPlaceDetails(data);
      console.log(result.data);
    } catch (error) {
      console.error("Failed to get place photo:", error);
    }
  };

  return (
    <>
      <div>
        <img
          src="../placeholder.jpg"
          alt="No Image Found"
          className="h-[300px] w-full object-cover rounded-xl"
        />

        <div className="flex justify-between items-center flex-col md:flex-row lg:flex-row xl:flex-row">
          <div className="my-5 flex flex-col md:flex-col gap-2">
            <h2 className="text-bold text-2xl">
              {trip?.userSelection?.location}
            </h2>
            <div className="flex gap-5 flex-col md:flex-row lg:flex-row xl:flex-row">
              <h2 className="p-1 px-3 bg-gray-200 text-gray-500 text-xs md:text-md rounded-full">
                🗓️ {trip?.userSelection.noOfDays} Days
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-xs md:text-md">
                💰 {trip?.userSelection.budget} Budget
              </h2>
              <h2 className="p-1 px-3 bg-gray-200 text-gray-500 rounded-full text-xs md:text-md">
                🍻 No. Of Traveler:
                {trip?.userSelection.traveler} People
              </h2>
            </div>
          </div>
          <Button>
            <IoIosSend />
          </Button>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
