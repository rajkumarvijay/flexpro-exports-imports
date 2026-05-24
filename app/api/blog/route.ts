import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const BlogSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  category: z.string(),
  readTime: z.string(),
  image: z.string().optional(),
  slug: z.string().min(3),
  published: z.boolean().optional(),
  date: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const includeUnpublished = searchParams.get("all") === "true";
  const session = await auth();

  const where = includeUnpublished && session?.user.role === "ADMIN"
    ? {}
    : { published: true };

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { date: "desc" },
    take: limit,
    select: {
      id: true, title: true, excerpt: true, date: true,
      category: true, readTime: true, image: true, slug: true, published: true,
    },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const body = await req.json();
  const parsed = BlogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const post = await prisma.blogPost.create({
    data: { ...parsed.data, date: parsed.data.date ? new Date(parsed.data.date) : new Date() },
  });
  return NextResponse.json(post, { status: 201 });
}
