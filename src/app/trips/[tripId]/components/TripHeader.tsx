import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { Trip } from "@prisma/client";

interface TripHeaderProps {
   trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
   return (
      <div className="flex flex-col lg:px-48 lg:pt-10">
         <div className="relative h-[280px] w-full lg:hidden">
            <Image
               src={trip?.coverImage}
               alt=""
               fill
               style={{ objectFit: "cover" }}
            />
         </div>

         <div className="hidden lg:grid lg:grid-cols-[2fr,1fr,1fr] lg:gap-2 lg:grid-rows-2 lg:order-2">
            <div className="relative row-span-2">
               <Image
                  src={trip?.coverImage}
                  alt={trip.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className=" rounded-tl-lg rounded-bl-lg shadow-md"
               />
            </div>

            <div className="relative h-1800px] w-full">
               <Image
                  src={trip?.imagesUrl[0]}
                  alt={trip.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="shadow-md"
               />
            </div>

            <div className="relative h-[180px] w-full">
               <Image
                  src={trip?.imagesUrl[1]}
                  alt={trip.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="shadow-md rounded-tr-lg"
               />
            </div>

            <div className="relative h-[180px] w-full">
               <Image
                  src={trip?.imagesUrl[2]}
                  alt={trip.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="shadow-md"
               />
            </div>

            <div className="relative h-[180px] w-full">
               <Image
                  src={trip?.coverImage}
                  alt={trip.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-br-lg shadow-md"
               />
            </div>
         </div>

         {/* titulo e informações */}
         <div className="flex flex-col p-5 gap-1 lg:order-1 lg:p-0 lg:mb-10">
            <h1 className="text-xl font-semibold text-secondary lg:text-3xl">
               {trip.name}
            </h1>
            <div className="flex items-center gap-2">
               <ReactCountryFlag countryCode={trip.countryCode} svg />
               <p className="text-xs text-grayPrimary underline lg:text-base">
                  {trip.location}
               </p>
            </div>
            <p className="text-xs text-grayPrimary lg:hidden">
               <span className="text-primary font-medium">
                  R${trip.pricePerDay.toString()}
               </span>{" "}
               por noite
            </p>
         </div>
      </div>
   );
};

export default TripHeader;
