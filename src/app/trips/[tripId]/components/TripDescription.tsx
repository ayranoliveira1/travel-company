import { Trip } from "@prisma/client";

interface TripDescriptionProps {
   description: string;
}

const TripDescription = ({ description }: TripDescriptionProps) => {
   return (
      <div className="flex flex-col px-5 py-10">
         <h2 className="font-semibold text-secondary">Sobre a viagem</h2>
         <p className="text-xs text-secondary leading-5">{description}</p>
      </div>
   );
};

export default TripDescription;
