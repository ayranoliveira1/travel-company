import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const req = await request.json();

   const { startDate, endDate, userId, tripId, totalPaid, guests } = req;

   const trip = await db.trip.findUnique({
      where: {
         id: tripId,
      },
   });

   if (!trip) {
      return new NextResponse(
         JSON.stringify({
            error: {
               code: "TRIP_NOT_FOUND",
            },
         })
      );
   }

   // Create reservation
   await db.tripReservation.create({
      data: {
         startDate: new Date(startDate),
         endDate: new Date(endDate),
         userId,
         tripId,
         totalPaid,
         guests,
      },
   });

   return new NextResponse(
      JSON.stringify({
         success: true,
      }),
      {
         status: 201,
      }
   );
}
