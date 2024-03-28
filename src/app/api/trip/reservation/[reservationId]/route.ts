import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
   _request: Request,
   { params: { reservationId } }: { params: { reservationId: string } }
) {
   if (!reservationId) {
      return new NextResponse(
         JSON.stringify({
            message: "Missing reservationId",
         }),
         { status: 400 }
      );
   }

   const reservation = await db.tripReservation.delete({
      where: {
         id: reservationId,
      },
   });

   return new NextResponse(JSON.stringify(reservation), { status: 200 });
}
