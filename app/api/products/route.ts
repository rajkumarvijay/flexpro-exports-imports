import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ProductSchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  image: z.string().optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featuredOnly = searchParams.get("featured") === "true";

  const where = {
    active: true,
    ...(category && category !== "All" ? { category } : {}),
    ...(featuredOnly ? { featured: true } : {}),
  };

  const products = await prisma.product.findMany({
    where,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const body = await req.json();
  const parsed = ProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const product = await prisma.product.create({ data: parsed.data });
  return NextResponse.json(product, { status: 201 });
}
