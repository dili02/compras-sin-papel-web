"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const name = formData.get("name") as string;

  try {
    await prisma.category.create({
      data: {
        userId: user?.id as string,
        name,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo crear una categoria.",
    };
  }

  revalidatePath(`/dashboard/categorias`);

  return redirect("/dashboard/categorias");
}

export async function editCategoryById(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) throw new Error("No autorizado, por favor inicia sesión");

  const name = formData.get("name") as string;
  const id = formData.get("categoryId") as string;

  try {
    await prisma.category.update({
      where: {
        id,
        userId: user?.id as string,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo editar la categoria.",
    };
  }

  revalidatePath(`/dashboard/categorias`);

  return redirect("/dashboard/categorias");
}

export async function deleteCategoryById(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) throw new Error("No autorizado, por favor inicia sesión");

  // const name = formData.get("name") as string;
  const id = formData.get("categoryId") as string;

  try {
    await prisma.category.delete({
      where: {
        id,
        userId: user?.id as string,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo eliminar la categoria.",
    };
  }

  revalidatePath(`/dashboard/categorias`);

  return redirect("/dashboard/categorias");
}
