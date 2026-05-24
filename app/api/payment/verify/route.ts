import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, rfqId } = await req.json();

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !rfqId) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
  if (!isValid) {
    await prisma.payment.update({
      where: { rfqId },
      data: { status: "FAILED" },
    });
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  // Update payment + RFQ status
  await prisma.$transaction([
    prisma.payment.update({
      where: { rfqId },
      data: {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        status: "PAID",
      },
    }),
    prisma.rFQ.update({
      where: { id: rfqId },
      data: { status: "ACCEPTED" },
    }),
  ]);

  return NextResponse.json({ success: true, message: "Payment verified and recorded." });
}
