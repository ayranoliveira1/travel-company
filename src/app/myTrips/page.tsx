"use client";

import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyTrips = () => {
   const [reservations, setReservations] = useState<TripReservation[]>([]);

   const { status, data } = useSession();

   const router = useRouter();

   useEffect(() => {
      if (status === "unauthenticated" || !data?.user) {
         return router.push("/");
      }

      const fetchReservations = async () => {
         const response = await fetch(
            `/api/user/${(!data?.user as any).id}/trips`
         );
         const json = await response.json();

         setReservations(json);
      };

      fetchReservations();
   }, [status, router]);

   return <div>My trips</div>;
};

export default MyTrips;
