import axios from "axios";

const BASE_URl = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

// export const GetPlaceDetails = (data) => {
//   axios.post(BASE_URl, data, config);
// };

export const GetPlaceDetails = async (data) => {
  try {
    const response = await axios.post(BASE_URl, data, config);
    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
