import ButtonSubmit from "@/components/button-submit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import ButtonDeleteIcon from "@/components/button-delete-icon";
import { deleteListById } from "./list.action";
import { redirect } from "next/navigation";
import { getLists } from "./listas.fetch";

type Props = {};

export default async function page({}: Props) {
  const lists = await getLists();

  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const createList = async (formData: FormData) => {
    "use server";

    if (!user) throw new Error("No autorizado, por favor inicia sesión");

    const name = formData.get("name") as string;

    await prisma.list.create({
      data: {
        userId: user.id,
        name: name,
      },
    });

    revalidatePath("/dashboard/listas");
  };

  return (
    <section className="">
      <h1 className="text-center uppercase text-4xl font-extrabold mt-4 lg:text-5xl">
        listas
      </h1>

      <p className="text-sm text-muted-foreground text-center mb-5">
        Aquí puedes administar tus listas para poder agregar tus productos.
      </p>

      <div>
        <form
          className="flex justify-between items-center gap-4"
          action={createList}
        >
          <Label>Nombre</Label>
          <Input
            required
            type="text"
            name="name"
            placeholder="Escribe aqui el nombre de tu lista ..."
          />
          <ButtonSubmit />
        </form>
      </div>

      <ul className="px-0 py-6 flex flex-col items-start">
        {lists.map((list) => (
          <li
            key={list.id}
            className="flex justify-between items-center w-full py-4"
          >
            <Button variant={`link`} className="px-0">
              <Link href={`/dashboard/listas/${list.id}`}>{list.name}</Link>
            </Button>

            <div className="flex items-center gap-3">
              <Link href={`/dashboard/listas/editar/${list.id}`}>
                <Button
                  variant="default"
                  className="gap-3 bg-muted-foreground"
                  size={"sm"}
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden md:block">EDITAR</span>
                </Button>
              </Link>

              <form action={deleteListById}>
                <input type="hidden" name="listId" value={list.id} />
                <input type="hidden" name="userId" value={list.userId} />

                <ButtonDeleteIcon />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
