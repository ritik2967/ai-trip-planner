// import { db } from "@/service/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// import InfoSection from "../components/InfoSection";

// const ViewTrip = () => {
//   const { tripId } = useParams();
//   const [trip, setTrip] = useState([]);

//   const GetTripData = async () => {
//     const docRef = doc(db, "AiTrip", tripId);
//     const docSnap = await getDoc(docRef);

//     useEffect(() => {
//       tripId && GetTripData();
//     }, [tripId]);

//     if (docRef.exists()) {
//       console.log("Document:", docSnap.data());
//       setTrip(docSnap.data());
//     } else {
//       console.log("No such document!");
//       toast("No Trip Found !");
//     }
//   };

//   return (
//     <>
//       <div className="p-10 md:px-20 lg:px-44 xl:px-56">
//         {/* Information Section */}
//         <InfoSection trip={trip} />

//         {/* Recomended Hotels */}

//         {/*Daily Plans  */}

//         {/* Footer */}
//       </div>
//     </>
//   );
// };

// export default ViewTrip;

import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  const GetTripData = async () => {
    if (!tripId) return;

    try {
      const docRef = doc(db, "AiTrip", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
        toast("No Trip Found!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      toast("Failed to load trip data.");
    }
  };

  useEffect(() => {
    GetTripData();
  }, [tripId]);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}

      {trip ? <InfoSection trip={trip} /> : <p>Loading trip data...</p>}

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily Plans */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
};

export default ViewTrip;
