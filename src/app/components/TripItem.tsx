import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface TripItemProps {
   trip: Trip;
}

const TripItem = ({ trip }: TripItemProps) => {
   return (
      <Link href={`/trips/${trip.id}`}>
         <div className="flex flex-col lg:hover:scale-110 lg:ease-in lg:duration-300">
            <div className="relative h-[280px] w-[280px] ">
               <Image
                  src={trip.coverImage}
                  fill
                  alt={trip.name}
                  className=" rounded-2xl"
                  style={{
                     objectFit: "cover",
                  }}
               />
            </div>

            <div className="flex flex-col gap-1">
               <h3 className=" text-dark font-medium text-sm mt-2">
                  {trip.name}
               </h3>
               <div className="flex items-center gap-2">
                  <ReactCountryFlag countryCode={trip.countryCode} svg />
                  <p className="text-xs text-grayPrimary">{trip.location}</p>
               </div>
               <p className="text-xs text-grayPrimary">
                  <span className=" text-primary font-medium">
                     R${trip.pricePerDay.toString()}
                  </span>{" "}
                  por noite
               </p>
            </div>
         </div>
      </Link>
   );
};

export default TripItem;
