import Image from "next/image";

const QuickSearch = () => {
   return (
      <div className="container mx-auto px-5 py-2">
         <div className="flex items-center">
            <div className="w-full h-[2px] bg-primaryLighter"></div>
            <h2 className="text-grayPrimary font-medium whitespace-nowrap px-5">
               Tente pesquisar por
            </h2>
            <div className="w-full h-[2px] bg-primaryLighter"></div>
         </div>
         <div className="flex justify-between mt-5">
            <div className="flex flex-col items-center gap-1">
               <Image
                  width={30}
                  height={30}
                  src="/hotel-icon.png"
                  alt="hotels"
               />
               <p className="text-sm text-grayPrimary">Hotel</p>
            </div>

            <div className="flex flex-col items-center gap-1">
               <Image
                  width={30}
                  height={30}
                  src="/farm-icon.png"
                  alt="Fazendas"
               />
               <p className="text-sm text-grayPrimary">Fazenda</p>
            </div>

            <div className="flex flex-col items-center gap-1">
               <Image
                  width={30}
                  height={30}
                  src="/cottage-icon.png"
                  alt="Chales"
               />
               <p className="text-sm text-grayPrimary">Chalé</p>
            </div>

            <div className="flex flex-col items-center gap-1">
               <Image
                  width={30}
                  height={30}
                  src="/inn-icon.png"
                  alt="pouzadas"
               />
               <p className="text-sm text-grayPrimary">Pousada</p>
            </div>
         </div>
      </div>
   );
};

export default QuickSearch;
