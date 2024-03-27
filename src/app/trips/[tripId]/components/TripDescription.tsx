import { Trip } from "@prisma/client";

interface TripDescriptionProps {
   description: string;
}

const TripDescription = ({ description }: TripDescriptionProps) => {
   return (
      <div className="flex flex-col px-5 py-10 gap-1 lg:px-0 lg:py-0 lg:gap-7">
         <h2 className="font-semibold text-secondary lg:text-xl">
            Sobre a viagem
         </h2>
         <p className="text-xs text-secondary leading-5 lg:text-sm">
            {description}
         </p>
      </div>
   );
};

export default TripDescription;
