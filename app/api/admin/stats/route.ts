import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const [totalRFQs, pendingRFQs, products, messages, recentRFQs, totalRevenue] = await Promise.all([
    prisma.rFQ.count(),
    prisma.rFQ.count({ where: { status: "PENDING" } }),
    prisma.product.count({ where: { active: true } }),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    prisma.rFQ.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, fullName: true, companyName: true, country: true, productRequired: true, status: true, createdAt: true, quotedAmount: true },
    }),
    prisma.payment.aggregate({
      where: { status: "PAID" },
      _sum: { amount: true },
    }),
  ]);

  return NextResponse.json({
    totalRFQs,
    pendingRFQs,
    products,
    unreadMessages: messages,
    recentRFQs,
    totalRevenue: totalRevenue._sum.amount ?? 0,
  });
}
