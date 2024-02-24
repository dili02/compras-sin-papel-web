import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";

export async function getCategories(userId?: string, query?: string) {
  noStore();

  const categories = await prisma.category.findMany({
    where: { userId, name: { contains: query } },
    orderBy: { name: "asc" },
  });

  return categories;
}

export async function getCategoryById({
  userId,
  categoryId,
}: {
  userId: string;
  categoryId: string;
}) {
  noStore();

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  } catch (error) {
    throw new Error("Fallo al obtener la categoria por ID.");
  }
}
