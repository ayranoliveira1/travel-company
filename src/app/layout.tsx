import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth";
import Header from "./components/header";

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
   title: "Travel Company",
   description: "Sistema de reserva de viagens",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-br">
         <body className={poppins.className}>
            <AuthProvider>
               <Header />
               {children}
            </AuthProvider>
         </body>
      </html>
   );
}
