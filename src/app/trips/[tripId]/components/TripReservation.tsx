"use client";

import Button from "@/app/components/TripInput/components/Button";
import DatePicker from "@/app/components/TripInput/components/DatePicker";
import Input from "@/app/components/TripInput/components/input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
   trip: Trip;
}

const TripReservation = ({ trip }: TripReservationProps) => {
   return (
      <div className="flex flex-col px-5 gap-3">
         <div className="flex gap-4">
            <DatePicker
               placeholderText="Data de início"
               onChange={() => {}}
               className="w-full"
            />
            <DatePicker
               placeholderText="Data final"
               onChange={() => {}}
               className="w-full"
            />
         </div>
         <Input placeholder={`Hóspedes (max: ${trip.maxGuests})`} />
         <div className="flex justify-between mt-1">
            <p className="text-sm font-medium text-secondary">
               Total (7 noites)
            </p>
            <p className="text-sm font-medium text-secondary">R$2.660</p>
         </div>
         <div className="w-full pb-10 border-b border-solid border-grayLighter">
            <Button className="w-full">Reservar agora</Button>
         </div>
      </div>
   );
};

export default TripReservation;
