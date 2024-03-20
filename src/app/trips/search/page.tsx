"use client";

import TripItem from "@/app/components/TripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Trips = () => {
   const [trips, setTrips] = useState<Trip[]>([]);

   const searchParams = useSearchParams();

   useEffect(() => {
      const fetchTrips = async () => {
         const response = await fetch(
            `/api/trip/search?text=${
               searchParams.get("text") ?? ""
            }&startDate=${searchParams.get(
               "startDate"
            )}&budget=${searchParams.get("budget")}`
         );

         const data = await response.json();

         setTrips(data);
      };

      fetchTrips();
   }, [searchParams]);

   return (
      <div className="container flex flex-col mx-auto items-center p-5">
         <h1 className="text-xl font-semibold text-secondary">
            Hospedagens encontradas
         </h1>
         <h2 className=" font-medium text-grayPrimary mb-5">
            {trips.length > 0
               ? "Listamos as melhores viagens para você"
               : "Não encontramos nenhuma viagem"}
         </h2>

         <div className="flex flex-col gap-4">
            {trips.map((trip) => (
               <TripItem key={trip.id} trip={trip} />
            ))}
         </div>
      </div>
   );
};

export default Trips;
