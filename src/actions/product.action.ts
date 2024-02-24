"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const name = formData.get("name") as string;
  const categoryId = formData.get("category") as string;
  const listId = formData.get("listId") as string;

  try {
    await prisma.product.create({
      data: {
        userId: user?.id as string,
        name,
        categoryId,
        listId,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo agregar el producto.",
    };
  }

  revalidatePath(`/dashboard/listas/${listId}`);

  return redirect(`/dashboard/listas/${listId}`);
}

export async function editProductById(formData: FormData) {
  const name = formData.get("name") as string;
  const categoryId = formData.get("categoryId") as string;
  const id = formData.get("productId") as string;
  const listId = formData.get("listId") as string;

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        categoryId,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo editar el producto.",
    };
  }

  revalidatePath(`/dashboard/listas/${listId}`);

  return redirect(`/dashboard/listas/${listId}`);
}

export async function deleteProductById(formData: FormData) {
  const id = formData.get("productId") as string;
  const listId = formData.get("listId") as string;

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo eliminar el producto.",
    };
  }

  revalidatePath(`/dashboard/listas/${listId}`);

  return redirect(`/dashboard/listas/${listId}`);
}

export async function toggleProductCart(formData: FormData) {
  const id = formData.get("productId") as string;
  const inCart = formData.get("inCart") as string;
  const listId = formData.get("listId") as string;
  let parsedInCart = false;

  if (inCart === "true") {
    parsedInCart = Boolean(!inCart);
  } else {
    parsedInCart = Boolean(inCart);
  }

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        inCart: parsedInCart,
      },
    });
  } catch (error) {
    return {
      message: "Error: No se pudo modificar el producto.",
    };
  }

  revalidatePath(`/dashboard/listas/${listId}`);

  return redirect(`/dashboard/listas/${listId}`);
}
