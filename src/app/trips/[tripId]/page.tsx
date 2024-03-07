import { db } from "@/lib/prisma";
import TripHeader from "./components/TripHeader";

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
      </div>
   );
};

export default TripDetails;
