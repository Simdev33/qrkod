import { NextResponse } from "next/server";
import { handleEvent, verifyWebhook } from "@/lib/server/billing";

// Stripe events: checkout.session.completed, customer.subscription.*, invoice.paid.
export async function POST(req: Request) {
  const payload = await req.text();
  const event = verifyWebhook(payload, req.headers.get("stripe-signature"));
  if (!event) return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  try {
    await handleEvent(event);
  } catch (err) {
    console.error("[stripe-webhook]", event.type, err);
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
