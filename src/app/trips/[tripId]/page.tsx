import { db } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripDescription from "./components/TripDescription";
import { tr } from "date-fns/locale";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
   const trip = await db.trip.findUnique({
      where: {
         id: params.tripId,
      },
   });

   if (!trip) return null;

   return (
      <div className="container mx-auto">
         <TripHeader trip={trip} />

         {/* Reserva */}

         <TripReservation trip={trip} />

         {/* Description */}

         <TripDescription description={trip.description} />

         <TripHighlights highlights={trip.highlights} />

         <TripLocation
            location={trip.location}
            locationDescription={trip.locationDescription}
         />
      </div>
   );
};

export default TripDetails;
