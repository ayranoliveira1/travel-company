import { db } from "@/lib/prisma";
import TripItem from "./TripItem";

const RecommendeTrips = async () => {
   const data = await db.trip.findMany();

   return (
      <div className="container mx-auto px-5 py-3">
         <div className="flex items-center">
            <div className="w-full h-[2px] bg-primaryLighter"></div>
            <h2 className="text-grayPrimary font-medium whitespace-nowrap px-5">
               Destinos Recomendados
            </h2>
            <div className="w-full h-[2px] bg-primaryLighter"></div>
         </div>

         <div className="flex flex-col items-center mt-5 gap-5">
            {data.map((trip) => (
               <TripItem key={trip.id} trip={trip} />
            ))}
         </div>
      </div>
   );
};

export default RecommendeTrips;
