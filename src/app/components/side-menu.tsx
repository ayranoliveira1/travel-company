import Link from "next/link";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { signOut } from "next-auth/react";
import { CalendarCheck, Home, LogOut } from "lucide-react";

const SideMenu = () => {
   const handlelogoutClick = () => {
      signOut();
   };

   return (
      <>
         <SheetHeader className="text-left border-b border-solid border-secondary py-5">
            <SheetTitle className="text-xl">Menu</SheetTitle>
         </SheetHeader>
         <div className="flex flex-col text-left mt-5 gap-3">
            <div className="border border-solid rounded-md py-1 px-3 border-grayLighter">
               <Link href="/">
                  <button className="text-secondary items-center text-medium font-semibold flex gap-2">
                     <Home className="w-5 h-5" />
                     Inicio
                  </button>
               </Link>
            </div>

            <div className="border border-solid rounded-md py-1 px-3 border-grayLighter">
               <Link href="/myTrips">
                  <button className="text-secondary text-medium font-semibold flex gap-2">
                     <CalendarCheck className="w-5 h-5" />
                     Minhas Viagens
                  </button>
               </Link>
            </div>

            <div className="border border-solid rounded-md py-1 px-3 border-grayLighter">
               <button
                  className="text-secondary gap-2 flex items-center text-medium font-semibold"
                  onClick={handlelogoutClick}
               >
                  <LogOut className="w-5 h-5" />
                  Logout
               </button>
            </div>
         </div>
      </>
   );
};

export default SideMenu;
