"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
   const { data } = useSession();

   const handlerLoginClick = () => {
      return signIn("google");
   };

   const handlerLogoutClick = () => {
      return signOut();
   };

   return <div className=""></div>;
}
