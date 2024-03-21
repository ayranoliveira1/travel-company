import { Castle, Hotel } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const QuickSearch = () => {
   return (
      <div className="container mx-auto px-5 mt-5 py-2 lg:w-[70%]">
         <div className="flex items-center">
            <div className="w-full h-[2px] bg-primaryLighter"></div>
            <h2 className="text-grayPrimary font-medium whitespace-nowrap px-5">
               Tente pesquisar por
            </h2>
            <div className="w-full h-[2px] bg-primaryLighter"></div>
         </div>
         <div className="flex justify-between mt-10">
            <Link href="/trips/search?text=hotel">
               <div className="flex flex-col items-center gap-1">
                  <Image
                     width={30}
                     height={30}
                     src="/hotel-icon.png"
                     alt="hotels"
                  />
                  <p className="text-sm text-grayPrimary">Hotel</p>
               </div>
            </Link>

            <Link href="/trips/search?text=resorts">
               <div className="hidden lg:flex lg:flex-col gap-1 lg:items-center">
                  <Hotel className="text-grayPrimary h-[30px] w-[30px]" />
                  <p className="text-sm text-grayPrimary">Resorts</p>
               </div>
            </Link>

            <Link href={"/trips/search?text=fazenda"}>
               <div className="flex flex-col items-center gap-1">
                  <Image
                     width={30}
                     height={30}
                     src="/farm-icon.png"
                     alt="Fazendas"
                  />
                  <p className="text-sm text-grayPrimary">Fazenda</p>
               </div>
            </Link>

            <Link href={"/trips/search?text=Chalé"}>
               <div className="flex flex-col items-center gap-1">
                  <Image
                     width={30}
                     height={30}
                     src="/cottage-icon.png"
                     alt="Chales"
                  />
                  <p className="text-sm text-grayPrimary">Chalé</p>
               </div>
            </Link>

            <Link href={"/trips/search?text=Pousada"}>
               <div className="flex flex-col items-center gap-1">
                  <Image
                     width={30}
                     height={30}
                     src="/inn-icon.png"
                     alt="pouzadas"
                  />
                  <p className="text-sm text-grayPrimary">Pousada</p>
               </div>
            </Link>

            <Link href="/trips/search?text=turísticos">
               <div className="hidden lg:flex lg:flex-col lg:items-center mb-5 gap-1">
                  <Castle className="text-grayPrimary h-[30px] w-[30px]" />
                  <p className="text-sm text-grayPrimary">Pontos turísticos</p>
               </div>
            </Link>
         </div>
      </div>
   );
};

export default QuickSearch;
