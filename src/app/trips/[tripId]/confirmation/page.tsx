"use client";

import Button from "@/app/components/TripInput/components/Button";
import { Trip } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
   const [trip, setTrip] = useState<Trip | null>();
   const [totalPrice, setTotalPrice] = useState<Number>(0);

   const router = useRouter();

   const { status, data } = useSession();

   const searchParams = useSearchParams();

   useEffect(() => {
      const fetchTrip = async () => {
         const response = await fetch(`/api/trip/check`, {
            method: "POST",
            body: JSON.stringify({
               tripId: params.tripId,
               endDate: searchParams.get("endDate"),
               startDate: searchParams.get("startDate"),
            }),
         });

         const res = await response.json();

         if (res?.error) {
            return router.push("/");
         }

         setTrip(res.trip);
         setTotalPrice(res.totalPrice);
      };

      if (status === "unauthenticated") {
         router.push("/");
      }

      fetchTrip();
   }, [, searchParams, params, status, router]);

   if (!trip) return null;

   const handleBuyClick = async () => {
      const response = await fetch("/api/trip/reservation", {
         method: "POST",
         body: Buffer.from(
            JSON.stringify({
               tripId: params.tripId,
               totalPaid: totalPrice,
               startDate: searchParams.get("startDate"),
               endDate: searchParams.get("endDate"),
               guests: Number(searchParams.get("guests")),
               userId: (data?.user as any)?.id,
            })
         ),
      });

      if (!response.ok) {
         return toast.error("Erro ao efetuar reserva", {
            position: "bottom-center",
         });
      }

      toast.success("Reserva efetuada com sucesso", {
         position: "bottom-center",
      });

      router.push("/");
   };

   const startDate = new Date(searchParams.get("startDate") as string);
   const endDate = new Date(searchParams.get("endDate") as string);
   const guests = searchParams.get("guests");

   return (
      <div className="container mx-auto p-5">
         <h1 className="text-xl font-semibold text-secondary">Sua Viagem</h1>

         {/* Card */}
         <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
            <div className="flex items-center gap-3 pb-5 border-b border-solid border-grayLighter">
               <div className="relative h-[106px] w-[124px]">
                  <Image
                     src={trip.coverImage}
                     alt={trip.name}
                     style={{ objectFit: "cover" }}
                     fill
                     className="rounded-lg"
                  />
               </div>
               <div className="flex flex-col">
                  <h2 className="text-xl text-secondary font-semibold">
                     {trip.name}
                  </h2>
                  <div className="flex items-center gap-2">
                     <ReactCountryFlag countryCode={trip.countryCode} svg />
                     <p className="text-xs text-grayPrimary underline">
                        {trip.location}
                     </p>
                  </div>
               </div>
            </div>

            <h3 className="font-semibold text-lg text-secondary mt-3">
               Informações sobre o preço
            </h3>

            <div className="flex justify-between">
               <p className="text-secondary">Total: </p>
               <p className="font-semibold text-sm">R${Number(totalPrice)}</p>
            </div>
         </div>

         <div className="flex flex-col p-5 mt-2 text-secondary">
            <h3 className="font-semibold">Data</h3>
            <div className="flex items-center gap-1 mt-1">
               <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
               {" - "}
               <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}</p>
            </div>

            <h3 className="font-semibold mt-5">Hóspedes</h3>
            <p>{guests} hóspedes</p>

            <Button className="mt-5" onClick={handleBuyClick}>
               Finalizar compra
            </Button>
         </div>
      </div>
   );
};

export default TripConfirmation;
