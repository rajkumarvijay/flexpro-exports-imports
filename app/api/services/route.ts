import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ServiceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string(),
  features: z.array(z.string()),
  active: z.boolean().optional(),
  order: z.number().optional(),
});

export async function GET() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const body = await req.json();
  const parsed = ServiceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const service = await prisma.service.create({ data: parsed.data });
  return NextResponse.json(service, { status: 201 });
}
