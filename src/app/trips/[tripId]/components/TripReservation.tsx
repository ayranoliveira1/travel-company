"use client";

import Button from "@/app/components/TripInput/components/Button";
import DatePicker from "@/app/components/TripInput/components/DatePicker";
import Input from "@/app/components/TripInput/components/input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
   tripId: string;
   trip: Trip;
}

interface TripReservationForm {
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
      setError,
   } = useForm<TripReservationForm>();

   const router = useRouter();

   const onSubmit = async (data: TripReservationForm) => {
      const response = await fetch("/api/trip/check", {
         method: "POST",
         body: Buffer.from(
            JSON.stringify({
               endDate: data.endDate,
               startDate: data.startDate,
               tripId,
            })
         ),
      });

      const res = await response.json();

      if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
         setError("startDate", {
            type: "manual",
            message: "Esta data já está reservada!",
         });

         return setError("endDate", {
            type: "manual",
            message: "esta data já está reservada!",
         });
      }

      if (res?.error?.code === "INVALID_STARt_DATE") {
         return setError("startDate", {
            type: "manual",
            message: "Datá inválida",
         });
      }

      if (res?.error?.code === "INVALID_END_DATE") {
         return setError("endDate", {
            type: "manual",
            message: "Datá inválida",
         });
      }

      router.push(
         `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
            data.guests
         }`
      );
   };

   const starDate = watch("startDate");
   const endDate = watch("endDate");

   return (
      <div className="flex flex-col px-5 gap-3 lg:min-w-[380px] lg:py-8 lg:border lg:border-l-grayLighter lg:rounded-lg lg:shadow-md">
         <p className="hidden text-lg text-secondary font-semibold lg:block">
            ${Number(trip.pricePerDay)}{" "}
            <span className="text-sm font-medium">/ noite</span>
         </p>

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
               max: {
                  value: trip.maxGuests,
                  message: `Número de hóspedes não pode ser maior que ${trip.maxGuests}`,
               },
            })}
            placeholder={`Hóspedes (max: ${trip.maxGuests})`}
            error={!!errors?.guests}
            errorMessage={errors?.guests?.message}
            type="number"
         />
         <div className="flex justify-between mt-1">
            <p className="text-sm font-medium text-secondary">Total:</p>
            <p className="text-sm font-medium text-secondary">
               {starDate && endDate
                  ? `R$${
                       differenceInDays(endDate, starDate) *
                       Number(trip.pricePerDay)
                    }`
                  : "R$0"}
            </p>
         </div>
         <div className="w-full pb-10 lg:pb-0 border-b border-solid border-grayLighter lg:border-none">
            <Button onClick={() => handleSubmit(onSubmit)()} className="w-full">
               Reservar agora
            </Button>
         </div>
      </div>
   );
};

export default TripReservation;
