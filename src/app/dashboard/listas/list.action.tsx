"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editListById(formData: FormData) {
  const name = formData.get("name") as string;
  const id = formData.get("listId") as string;

  try {
    await prisma.list.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo editar la lista.",
    };
  }

  revalidatePath(`/dashboard/listas`);

  return redirect("/dashboard/listas");
}

export async function deleteListById(formData: FormData) {
  const id = formData.get("listId") as string;

  try {
    await prisma.list.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo eliminar la lista.",
    };
  }

  revalidatePath(`/dashboard/listas`);

  return redirect("/dashboard/listas");
}
