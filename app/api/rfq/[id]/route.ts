import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const rfq = await prisma.rFQ.findUnique({
    where: { id },
    include: { payment: true, user: { select: { name: true, email: true } } },
  });
  if (!rfq) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Customers can only view their own RFQs
  if (session.user.role !== "ADMIN" && rfq.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return NextResponse.json(rfq);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const { id } = await params;
  const body = await req.json();
  const rfq = await prisma.rFQ.update({
    where: { id },
    data: {
      status: body.status,
      quotedAmount: body.quotedAmount,
      quotedCurrency: body.quotedCurrency,
      adminNotes: body.adminNotes,
    },
  });
  return NextResponse.json(rfq);
}
