import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type Props = {};

export default async function page({}: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between py-4">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Hola, {user?.given_name}.</h1>

          <p className="text-lg text-muted-foreground py-4">
            1. Crea las categorias para los productos.
          </p>

          <p className="text-lg text-muted-foreground py-4">
            2. Crea una lista.
          </p>

          <p className="text-lg text-muted-foreground py-4">
            3. Crea productos dentro de la lista y añade la categoria.
          </p>

          <p className="text-lg text-muted-foreground py-4">
            4. Ya tienes la lista.
          </p>
        </div>
      </div>
    </div>
  );
}
