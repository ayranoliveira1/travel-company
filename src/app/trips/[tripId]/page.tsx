import { db } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";

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
      </div>
   );
};

export default TripDetails;
