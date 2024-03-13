"use client";

import Button from "@/app/components/TripInput/components/Button";
import DatePicker from "@/app/components/TripInput/components/DatePicker";
import Input from "@/app/components/TripInput/components/input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
   tripId: string;
   trip: Trip;
}

interface TripreservationForm {
   guests: number;
   startDate: Date | null;
   endDate: Date | null;
}

const TripReservation = ({ trip, tripId }: TripReservationProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch,
   } = useForm<TripreservationForm>();

   const starDate = watch("startDate");
   const endDate = watch("endDate");

   return (
      <div className="flex flex-col px-5 gap-3">
         <div className="flex gap-4">
            <Controller
               name="startDate"
               rules={{
                  required: {
                     value: true,
                     message: "Data inicial é obrigatória",
                  },
               }}
               render={({ field }) => (
                  <DatePicker
                     placeholderText="Data de início"
                     onChange={field.onChange}
                     selected={field.value}
                     className="w-full"
                     error={!!errors?.startDate}
                     errorMessage={errors?.guests?.message}
                     minDate={trip.startDate}
                  />
               )}
               control={control}
            />

            <Controller
               name="endDate"
               rules={{
                  required: {
                     value: true,
                     message: "Data final é obrigatória",
                  },
               }}
               render={({ field }) => (
                  <DatePicker
                     placeholderText="Data de Final"
                     onChange={field.onChange}
                     selected={field.value}
                     className="w-full"
                     error={!!errors?.endDate}
                     errorMessage={errors?.endDate?.message}
                     maxDate={trip.endDate}
                     minDate={starDate ?? trip.startDate}
                  />
               )}
               control={control}
            />
         </div>
         <Input
            {...register("guests", {
               required: {
                  value: true,
                  message: "Número de hóspedes é obrigatório ",
               },
            })}
            placeholder={`Hóspedes (max: ${trip.maxGuests})`}
            error={!!errors?.guests}
            errorMessage={errors?.guests?.message}
         />
         <div className="flex justify-between mt-1">
            <p className="text-sm font-medium text-secondary">
               Total (7 noites)
            </p>
            <p className="text-sm font-medium text-secondary">
               {starDate && endDate
                  ? `R$${
                       differenceInDays(endDate, starDate) *
                       Number(trip.pricePerDay)
                    }`
                  : "R$0"}
            </p>
         </div>
         <div className="w-full pb-10 border-b border-solid border-grayLighter">
            <Button onClick={() => handleSubmit(onSubmit)()} className="w-full">
               Reservar agora
            </Button>
         </div>
      </div>
   );
};

export default TripReservation;
