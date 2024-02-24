import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";

export async function getProducts(
  id: string,
  userId: string,
  product?: string,
  category?: string,
  inCart?: boolean
) {
  noStore();

  const products = await prisma.product.findMany({
    where: {
      userId,
      listId: id,
      AND: {
        name: { contains: product },
        inCart: { equals: inCart },
        category: { name: { contains: category } },
      },
    },
    orderBy: { name: "desc" },
    select: {
      category: true,
      name: true,
      id: true,
      listId: true,
      inCart: true,
    },
  });

  return products;
}

export async function getProductById({ id }: { id: string }) {
  noStore();

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        inCart: true,
        userId: true,
        categoryId: true,
        listId: true,
      },
    });

    return product;
  } catch (error) {
    throw new Error("Fallo al obtener la categoria por ID.");
  }
}
