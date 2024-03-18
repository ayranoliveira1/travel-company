"use client";

import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserReservationItem from "./components/userReservationItem";
import Link from "next/link";
import Button from "../components/TripInput/components/Button";

const MyTrips = () => {
   const [reservations, setReservations] = useState<
      Prisma.TripReservationGetPayload<{
         include: { trip: true };
      }>[]
   >([]);

   const { status, data } = useSession();

   const router = useRouter();

   const fetchReservations = async () => {
      const response = await fetch(
         `/api/user/${(data?.user as any)?.id}/trips`
      );
      const json = await response.json();

      setReservations(json);
   };

   useEffect(() => {
      if (status === "unauthenticated") {
         return router.push("/");
      }

      fetchReservations();
   }, [status, router]);

   return (
      <div className="container mx-auto p-5">
         <h1 className="font-semibold text-xl text-secondary">
            Minhas viagens
         </h1>
         {reservations.length > 0 ? (
            reservations.map((reservation) => (
               <UserReservationItem
                  key={reservation.id}
                  reservation={reservation}
                  fetchReservations={fetchReservations}
               />
            ))
         ) : (
            <div className="flex flex-col">
               <p className="mt-2 font-medium text-grayPrimary">
                  Nenhuma viagem encontrada
               </p>

               <Link href="/trips">
                  <Button className="w-full mt-2">
                     Ver viagens disponíveis
                  </Button>
               </Link>
            </div>
         )}
      </div>
   );
};

export default MyTrips;
