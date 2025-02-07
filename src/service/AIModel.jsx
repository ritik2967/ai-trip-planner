import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `{
              "travelPlan": {
                "location": "Las Vegas, Nevada",
                "duration": "3 Days",
                "budget": "Cheap",
                "travelers": "Couple",
                "hotels": [
                  {
                    "HotelName": "Circus Circus Hotel, Casino & Theme Park",
                    "HotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
                    "Price": "$40 - $80 per night",
                    "hotelImageURL": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/29/f7/3f/circus-circus-hotel-casino.jpg?w=700&h=-1&s=1",
                    "geoCoordinates": {
                      "latitude": 36.1459,
                      "longitude": -115.169
                    },
                    "ratings": 3.5,
                    "description": "A classic Vegas experience with an indoor theme park, budget-friendly rooms, and a range of dining options. Good for families and those looking for a more whimsical stay."
                  },
                  {
                    "HotelName": "Excalibur Hotel & Casino",
                    "HotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
                    "Price": "$40 - $90 per night",
                    "hotelImageURL": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/b8/10/97/excalibur-hotel-casino.jpg?w=700&h=-1&s=1",
                    "geoCoordinates": {
                      "latitude": 36.0988,
                      "longitude": -115.1742
                    },
                    "ratings": 4,
                    "description": "A medieval-themed hotel with affordable rooms, multiple pools, and a variety of entertainment. It's located on the southern end of the Strip and is great for those who want a themed experience on a budget."
                  },
                  {
                    "HotelName": "OYO Hotel & Casino Las Vegas",
                    "HotelAddress": "115 E Tropicana Ave, Las Vegas, NV 89109",
                    "Price": "$30 - $70 per night",
                    "hotelImageURL": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/b0/11/a0/oyo-hotel-casino-las-vegas.jpg?w=700&h=-1&s=1",
                    "geoCoordinates": {
                      "latitude": 36.1016,
                      "longitude": -115.1688
                    },
                    "ratings": 3,
                    "description": "A budget-friendly option near the Strip with basic amenities and a casino. It's a good choice for those who prioritize location and affordability."
                  }
                ],
                "itinerary": {
                  "day1": {
                    "theme": "Exploring the Strip",
                    "bestTimeToVisit": "Evening for sights and shows",
                    "places": [
                      {
                        "placeName": "Bellagio Conservatory & Botanical Gardens",
                        "placeDetails": "A stunning indoor botanical garden that changes seasonally. Free to enter.",
                        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Bellagio_Conservatory_01_2017.jpg",
                        "geoCoordinates": {
                          "latitude": 36.1126,
                          "longitude": -115.1742
                        },
                        "ticketPricing": "Free",
                        "rating": 4.8,
                        "travelTime": "Walking distance from most Strip hotels"
                      }
                    ]
                  }
                }
              }
            }`,
        },
      ],
    },
  ],
});
