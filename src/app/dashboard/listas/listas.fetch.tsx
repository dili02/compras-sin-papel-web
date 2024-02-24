import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/lib/db";

export async function getListById({ id }: { id: string }) {
  noStore();

  try {
    const list = await prisma.list.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return list;
  } catch (error) {
    throw new Error("Fallo al obtener la categoria por ID.");
  }
}

export async function getLists() {
  noStore();

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  try {
    const lists = prisma.list.findMany({
      where: { userId: user?.id },
      orderBy: { name: "asc" },
    });

    return lists;
  } catch (error) {
    throw new Error("Fallo al obtener la categoria por ID.");
  }
}
