import { Trip } from "@prisma/client";
import TripItem from "../components/TripItem";
import { db } from "@/lib/prisma";

const AllTrips = async () => {
   const trips = await db.trip.findMany({});

   return (
      <div className="container mx-auto p-5 flex flex-col items-center gap-6 lg:px-28 lg:gap-12">
         <h1 className="text-xl font-semibold text-secondary lg:text-3xl">
            Todas as viagens
         </h1>

         <div className="flex flex-col gap-5 lg:flex-row lg:gap-12 lg:flex-wrap ">
            {trips.map((trip: any) => (
               <TripItem key={trip.id} trip={trip} />
            ))}
         </div>
      </div>
   );
};

export default AllTrips;
