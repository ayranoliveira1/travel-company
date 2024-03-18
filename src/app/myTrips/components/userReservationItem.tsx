import Button from "@/app/components/TripInput/components/Button";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

interface UserReservationItemProps {
   reservation: Prisma.TripReservationGetPayload<{
      include: { trip: true };
   }>;

   fetchReservations: () => void;
}

const UserReservationItem = ({
   reservation,
   fetchReservations,
}: UserReservationItemProps) => {
   const { trip } = reservation;

   const router = useRouter();

   const handleDeleteClick = async () => {
      const res = await fetch(`/api/trip/reservation/${reservation.id}`, {
         method: "DELETE",
      });

      if (!res.ok) {
         return toast.error("Ocorreu um erro ao deletar reserva", {
            position: "bottom-center",
         });
      }

      toast.success("Reserva cancelada com sucesso", {
         position: "bottom-center",
      });

      fetchReservations();
   };

   return (
      <div>
         <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
            <div className="flex items-center gap-3 pb-5 border-b border-solid border-grayLighter">
               <div className="relative h-[106px] w-[124px]">
                  <Image
                     src={trip.coverImage}
                     alt={trip.name}
                     style={{ objectFit: "cover" }}
                     fill
                     className="rounded-lg"
                  />
               </div>
               <div className="flex flex-col">
                  <h2 className="text-xl text-secondary font-semibold">
                     {trip.name}
                  </h2>
                  <div className="flex items-center gap-2">
                     <ReactCountryFlag countryCode={trip.countryCode} svg />
                     <p className="text-xs text-grayPrimary underline">
                        {trip.location}
                     </p>
                  </div>
               </div>
            </div>

            <h3 className="font-semibold text-secondary mt-3">
               Sobre a viagem
            </h3>

            <div className="flex flex-col mt-5 text-secondary border-b border-solid  border-grayLighter">
               <h3 className="font-semibold text-sm">Data</h3>
               <div className="flex items-center gap-1 mt-1">
                  <p className="text-sm">
                     {format(reservation.startDate, "dd 'de' MMMM", {
                        locale: ptBR,
                     })}
                  </p>
                  {" - "}
                  <p className="text-sm">
                     {format(reservation.endDate, "dd 'de' MMMM", {
                        locale: ptBR,
                     })}
                  </p>
               </div>

               <h3 className="font-semibold mt-5 text-sm">Hóspedes</h3>
               <p className="mt-1 text-sm mb-5">
                  {reservation.guests} hóspedes
               </p>
            </div>

            <h3 className="font-semibold text-secondary mt-3">
               Informações sobre o preço
            </h3>

            <div className="flex justify-between mt-1">
               <p className="text-secondary">Total: </p>
               <p className="font-semibold text-sm">
                  R${Number(reservation.totalPaid)}
               </p>
            </div>

            <Button
               variant="danger"
               className="mt-5"
               onClick={handleDeleteClick}
            >
               Cancelar
            </Button>
         </div>
      </div>
   );
};

export default UserReservationItem;
