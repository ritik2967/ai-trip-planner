// import { DockDemo } from "@/components/custom/Nav";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { SelectBudgetOptions, SelectTravelesList } from "@/constants/Options";
// import React, { useEffect, useState } from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

// const CreateTrip = () => {
//   const [place, setPlace] = useState();

//   const [formData, setFormData] = useState([]);

//   const handleInputChange = (name, value) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     console.log(formData);
//   }, [formData]);

//   const OnGenerateTrip = () => {
//     if (formData?.noOfDays > 5) {
//       return;
//     }
//     console.log(formData);
//   };

//   return (
//     <>
//       <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//         <h2 className="font-bold text-3xl">Tell us your travel preferances</h2>
//         <p className="mt-3 text-gray-500 text-xl  ">
//           Just provide some basic information, and our trip planner will
//           generate a customize itinery based on your preferances
//         </p>

//         <div className="mt-20 flex flex-col gap-10">
//           <div>
//             <h2 className="text-xl my-3 font-medium">
//               What is your destination Choice ?
//             </h2>
//             <GooglePlacesAutocomplete
//               apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//               selectProps={{
//                 place,
//                 onChange: (v) => {
//                   setPlace(v);
//                   handleInputChange("location", v);
//                 },
//               }}
//             />
//           </div>
//           <div>
//             <h2 className="text-xl my-3 font-medium">
//               How many days are you planning for a trip ?
//             </h2>
//             <Input
//               placeholder={"Ex 3"}
//               type="number"
//               onChange={(e) => handleInputChange("noOfDays", e.target.value)}
//             />
//           </div>
//         </div>
//         <div>
//           <h2 className="text-xl my-3 mt-5 font-medium">
//             What is your budget ?
//           </h2>
//           <div className="grid grid-cols-3 mt-5 gap-5">
//             {SelectBudgetOptions.map((item, index) => {
//               return (
//                 <div
//                   key={index}
//                   onClick={() => handleInputChange("budget", item.title)}
//                   className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
//                     ${
//                       formData?.budget == item.title && "shadow-lg border-black"
//                     }
//                   `}
//                 >
//                   <h2 className="text-4xl">{item.icon}</h2>
//                   <h2 className="font-bold text-lg">{item.title}</h2>
//                   <h2 className="text-sm text-gray-500">{item.desc}</h2>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl my-3 mt-5 font-medium">
//             Who do you plan on travelling with on your nexr adventure ?
//           </h2>
//           <div className="grid grid-cols-3 mt-5 gap-5">
//             {SelectTravelesList.map((item, index) => {
//               return (
//                 <div
//                   key={index}
//                   onClick={() => handleInputChange("traveler", item.people)}
//                   className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg
//                     ${
//                       formData?.traveler == item.people &&
//                       "shadow-lg border-black"
//                     }
//                     `}
//                 >
//                   <h2 className="text-4xl">{item.icon}</h2>
//                   <h2 className="font-bold text-lg">{item.title}</h2>
//                   <h2 className="text-sm text-gray-500">{item.desc}</h2>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="flex justify-end my-10">
//           <Button onClick={OnGenerateTrip}>Generate Trip</Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateTrip;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/Options";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const GEOAPIFY_API_KEY = "da076a193ac34b9e9e0645b6bd381872";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]); // Keeps your original state name
  const [searchText, setSearchText] = useState(""); // New state for handling input text
  const [autocompleteResults, setAutocompleteResults] = useState([]); // For dropdown suggestions

  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchAutocompleteResults = async (text) => {
    if (text.length === 0) {
      setAutocompleteResults([]);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete`,
        {
          params: {
            text,
            apiKey: GEOAPIFY_API_KEY,
          },
        }
      );
      setAutocompleteResults(response.data.features);
    } catch (error) {
      console.error("Error fetching autocomplete results:", error);
    }
  };

  useEffect(() => {
    if (searchText) {
      const timeoutId = setTimeout(() => {
        fetchAutocompleteResults(searchText);
      }, 300); // Debounce API calls
      return () => clearTimeout(timeoutId);
    }
  }, [searchText]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrip", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Plaese fill the all details...");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  return (
    <>
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferances</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="mt-20 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your destination choice?
            </h2>
            <Input
              placeholder="Search for a destination..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {autocompleteResults.length > 0 && (
              <div className="border rounded-lg mt-2 max-h-48 overflow-y-auto bg-white shadow-md">
                {autocompleteResults.map((result) => (
                  <div
                    key={result.properties.place_id}
                    onClick={() => {
                      setPlace(result.properties.formatted);
                      handleInputChange(
                        "location",
                        result.properties.formatted
                      );
                      setSearchText(result.properties.formatted);
                      setAutocompleteResults([]);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {result.properties.formatted}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning for a trip?
            </h2>
            <Input
              placeholder="Ex 3"
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 mt-5 font-medium">
            What is your budget?
          </h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelectBudgetOptions.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
                    formData?.budget === item.title && "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 mt-5 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelectTravelesList.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.people)}
                  className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${
                    formData?.traveler === item.people &&
                    "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end my-10">
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              " Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="./logo.svg" alt="No Image" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>
                  Sign in to the App with the Google authentication securely
                </p>

                <Button
                  disabled={loading}
                  onClick={login}
                  className="mt-5 w-full flex items-center gap-4"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CreateTrip;
