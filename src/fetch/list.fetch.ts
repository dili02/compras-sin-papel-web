import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/db";

export async function getList(userId: string, id: string) {
  noStore();

  const list = await prisma.list.findUnique({
    where: {
      userId,
      id,
    },
    select: { products: true },
  });

  return list;
}
