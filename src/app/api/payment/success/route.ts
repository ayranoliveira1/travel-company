import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { toast } from "react-toastify";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   apiVersion: "2023-10-16",
});

export async function POST(request: Request) {
   const sig = request.headers.get("Stripe-Signature");

   const text = await request.text();

   const event = stripe.webhooks.constructEvent(
      text,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
   );

   if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      await db.tripReservation.create({
         data: {
            startDate: new Date(session.metadata.startDate),
            endDate: new Date(session.metadata.endDate),
            userId: session.metadata.userId,
            tripId: session.metadata.tripId,
            totalPaid: session.metadata.totalPrice,
            guests: Number(session.metadata.guests),
         },
      });
   }

   return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
   });
}
