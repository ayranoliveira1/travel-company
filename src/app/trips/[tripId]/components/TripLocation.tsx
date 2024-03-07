import Button from "@/app/components/TripInput/components/Button";
import Image from "next/image";

interface TripLocationProps {
   location: string;
   locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
   return (
      <div className="flex flex-col px-5 gap-4 pb-5">
         <h2 className="font-medium text-secondary">Localização</h2>

         <div className="relative h-[280px] w-full">
            <Image
               src="/map-mobile.png"
               alt={location}
               fill
               style={{ objectFit: "cover" }}
               className="rounded-lg shadow-md"
            />
         </div>

         <div className="flex flex-col gap-2">
            <h3 className="text-secondary font-medium text-sm">{location}</h3>
            <p className="text-xs text-secondary leading-5">
               {locationDescription}
            </p>
         </div>

         <Button variant="outlined">Ver no Google Maps</Button>
      </div>
   );
};

export default TripLocation;
