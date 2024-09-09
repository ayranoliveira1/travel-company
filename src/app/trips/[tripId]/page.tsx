import { db } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripDescription from "./components/TripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
   // Fetch trip data
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

         <div className="flex flex-col lg:mt-10 lg:flex-row lg:px-48 lg:gap-40">
            <div className="lg:order-2">
               <TripReservation tripId={trip.id} trip={trip} />
            </div>

            <div className="lg:order-1 lg:flex lg:flex-col lg:gap-10">
               {/* Description */}
               <TripDescription description={trip.description} />
               <TripHighlights highlights={trip.highlights} />
            </div>
         </div>

         <TripLocation
            location={trip.location}
            locationDescription={trip.locationDescription}
         />
      </div>
   );
};

export default TripDetails;
