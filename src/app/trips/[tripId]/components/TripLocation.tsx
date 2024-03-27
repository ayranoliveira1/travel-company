import Button from "@/app/components/TripInput/components/Button";
import Image from "next/image";
import Link from "next/link";

interface TripLocationProps {
   location: string;
   locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
   return (
      <div className="flex flex-col px-5 gap-4 pb-5 lg:px-48">
         <h2 className="font-medium text-secondary lg:text-xl">Localização</h2>

         <div className="lg:hidden relative h-[280px] w-full">
            <Image
               src="/map-mobile.png"
               alt={location}
               fill
               style={{ objectFit: "cover" }}
               className="rounded-lg shadow-md"
            />
         </div>
         <div className="hidden relative h-[480px] w-full lg:block">
            <Image
               src="/map-desktop.png"
               alt={location}
               fill
               style={{ objectFit: "cover" }}
               className="rounded-lg shadow-md"
            />
         </div>

         <div className="flex flex-col gap-2 lg:gap-5 lg:pb-4">
            <h3 className="text-secondary font-medium text-sm lg:text-lg">
               {location}
            </h3>
            <p className="text-xs text-secondary leading-5 lg:text-sm">
               {locationDescription}
            </p>
         </div>

         <Link
            href={`https://www.google.com/maps/place/${location}`}
            className="w-full"
            target="_blank"
         >
            <Button className="w-full" variant="outlined">
               Ver no Google Maps
            </Button>
         </Link>
      </div>
   );
};

export default TripLocation;
