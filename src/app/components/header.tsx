"use client";

import { Menu } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {
   const [menuIsOpen, setMenuIsOpen] = useState(false);
   const { status, data } = useSession();

   const handleLoginClick = () => {
      return signIn("google");
   };

   const handleOpenMenuClick = () => {
      return setMenuIsOpen(!menuIsOpen);
   };

   return (
      <header className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
         <div className="relative w-[183px] h-[32px]">
            <Link href="/#">
               <Image src="/logo.png" alt="Logo" fill />
            </Link>
         </div>

         {status === "unauthenticated" && (
            <button
               className="text-primary text-sm font-bold"
               onClick={handleLoginClick}
            >
               Login
            </button>
         )}

         {status === "authenticated" && data.user?.name && data.user.image && (
            <Sheet>
               <SheetTrigger asChild>
                  <div
                     className="flex items-center justify-between gap-4 border-solid border-grayLighter border p-2.5 px-3 rounded-3xl relative"
                     onClick={handleOpenMenuClick}
                  >
                     <Menu size={22} className="cursor-pointer" />
                     <Image
                        src={data.user?.image}
                        alt={data.user?.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                     />
                  </div>
               </SheetTrigger>
               <SheetContent>
                  <SideMenu />
               </SheetContent>
            </Sheet>
         )}
      </header>
   );
};

export default Header;
