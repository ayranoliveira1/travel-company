import Image from "next/image";

interface TripHighlightsProps {
   highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
   return (
      <div className="flex flex-col px-5 gap-2 pb-10 lg:px-0">
         <h2 className="font-medium text-secondary lg:hidden">Destaques</h2>
         <div className="flex flex-wrap gap-y-3 lg:gap-y-6">
            {highlights.map((highlights) => (
               <div key={highlights} className="flex items-center gap-2 w-1/2">
                  <Image
                     src="/check-icon.png"
                     alt={highlights}
                     width={15}
                     height={15}
                  />
                  <p className="text-xs text-grayPrimary lg:text-sm">
                     {highlights}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default TripHighlights;
