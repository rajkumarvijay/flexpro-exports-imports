import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { razorpay } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { rfqId } = await req.json();
  if (!rfqId) return NextResponse.json({ error: "rfqId is required" }, { status: 400 });

  const rfq = await prisma.rFQ.findUnique({
    where: { id: rfqId },
    include: { payment: true },
  });

  if (!rfq) return NextResponse.json({ error: "RFQ not found" }, { status: 404 });
  if (rfq.userId !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (rfq.status !== "QUOTED") {
    return NextResponse.json({ error: "RFQ is not in QUOTED status" }, { status: 400 });
  }
  if (rfq.payment?.status === "PAID") {
    return NextResponse.json({ error: "Already paid" }, { status: 400 });
  }

  const amount = Math.round((rfq.quotedAmount ?? 0) * 100); // Razorpay expects paise
  const currency = rfq.quotedCurrency ?? "INR";

  const order = await razorpay.orders.create({
    amount,
    currency,
    receipt: `rfq_${rfqId.slice(0, 16)}`,
    notes: { rfqId, customerEmail: rfq.email },
  });

  // Upsert payment record
  await prisma.payment.upsert({
    where: { rfqId },
    update: { razorpayOrderId: order.id as string, amount: rfq.quotedAmount!, currency },
    create: { rfqId, razorpayOrderId: order.id as string, amount: rfq.quotedAmount!, currency },
  });

  return NextResponse.json({
    orderId: order.id,
    amount,
    currency,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    rfqId,
    customerName: rfq.fullName,
    customerEmail: rfq.email,
    description: `Quote payment for ${rfq.productRequired}`,
  });
}
