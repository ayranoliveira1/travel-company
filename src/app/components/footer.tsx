import Image from "next/image";

const Footer = () => {
   return (
      <footer className="bg-walterWhite p-5 flex flex-col items-center gap-1">
         <Image src="/logo.png" alt="Travel Company" width={133} height={33} />
         <p className="text-sm font-medium text-secondary">
            Todos os direitos reservados.
         </p>
      </footer>
   );
};

export default Footer;
