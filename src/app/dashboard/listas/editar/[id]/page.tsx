import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { X } from "lucide-react";
import ButtonEdit from "@/components/button-edit";
import { getListById } from "../../listas.fetch";
import { editListById } from "../../list.action";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params: { id } }: Props) {
  const list = await getListById({ id });

  return (
    <section className="min-h-[90vh] w-full py-8 flex flex-col items-center gap-7 mx-auto">
      <Card className="w-full max-w-[640px]">
        <form action={editListById}>
          <CardHeader>
            <CardTitle className="text-center uppercase text-3xl">
              Editar Lista
            </CardTitle>
            <CardDescription className="text-center xl:text-lg">
              Aqui mismo puedes Editar el nombre de la lista.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5 p-5">
            <div className="gap-y-2 flex flex-col">
              <Label className="text-base">Nombre</Label>
              <Input
                required
                type="text"
                name="name"
                // placeholder={list?.name}
                defaultValue={list?.name}
              />
              <Input type="hidden" name="listId" value={list?.id} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Link href="/dashboard/listas">
              <Button variant="destructive" className="flex gap-3">
                <X className="h-5 w-5" />
                <span className="text-sm">CANCELAR</span>
              </Button>
            </Link>

            <ButtonEdit />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
