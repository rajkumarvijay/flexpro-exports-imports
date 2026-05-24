import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const RFQSchema = z.object({
  fullName: z.string().min(2),
  companyName: z.string().min(2),
  country: z.string().min(2),
  productRequired: z.string().min(2),
  quantity: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  message: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const rfqs = await prisma.rFQ.findMany({
    include: { user: { select: { name: true, email: true } }, payment: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(rfqs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const body = await req.json();
  const parsed = RFQSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const rfq = await prisma.rFQ.create({
    data: {
      ...parsed.data,
      userId: session?.user?.id ?? null,
    },
  });
  return NextResponse.json({ success: true, id: rfq.id }, { status: 201 });
}
