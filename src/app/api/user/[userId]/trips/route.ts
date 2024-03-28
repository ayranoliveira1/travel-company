import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
   request: Request,
   { params: { userId } }: { params: { userId: string } }
) {
   const { searchParams } = new URL(request.url);

   console.log({ userId });

   if (!userId) {
      return new NextResponse(JSON.stringify({ message: "Missing userId" }), {
         status: 400,
      });
   }

   const reservations = await db.tripReservation.findMany({
      where: {
         userId: userId,
      },
      include: {
         trip: true,
      },
   });

   console.log({ reservations });

   return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
