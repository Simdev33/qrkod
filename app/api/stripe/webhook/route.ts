import { NextResponse } from "next/server";
import { handleEvent, verifyWebhook } from "@/lib/server/billing";

// Stripe-események: checkout.session.completed, customer.subscription.*, invoice.paid.
export async function POST(req: Request) {
  const payload = await req.text();
  const event = verifyWebhook(payload, req.headers.get("stripe-signature"));
  if (!event) return NextResponse.json({ error: "Érvénytelen aláírás." }, { status: 400 });
  try {
    await handleEvent(event);
  } catch (err) {
    console.error("[stripe-webhook]", event.type, err);
    return NextResponse.json({ error: "Feldolgozási hiba." }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
