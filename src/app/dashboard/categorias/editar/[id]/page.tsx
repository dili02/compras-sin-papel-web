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
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { X } from "lucide-react";
import ButtonEdit from "@/components/button-edit";
import { getCategoryById } from "@/fetch/category.fetch";
import { editCategoryById } from "@/actions/category.action";
import { Category } from "@/app/types";

type Props = {
  params: {
    id: string;
  };
};

// type CategoryList = Omit<Category, "products" | "userId"> | null;

export default async function page({ params: { id } }: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const category = await getCategoryById({
    userId: user?.id as string,
    categoryId: id,
  });

  return (
    <section className="min-h-[90vh] w-full py-8 flex flex-col items-center gap-7 mx-auto">
      <Card className="w-full max-w-[640px]">
        <form action={editCategoryById}>
          <CardHeader>
            <CardTitle className="text-center uppercase text-3xl">
              Editar Categoria
            </CardTitle>
            <CardDescription className="text-center xl:text-lg">
              Aqui mismo puedes Editar el nombre de la categoria.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5 p-5">
            <div className="gap-y-2 flex flex-col">
              <Label className="text-base">Nombre</Label>
              <Input
                required
                type="text"
                name="name"
                placeholder={category?.name}
              />
              <Input type="hidden" name="categoryId" value={category?.id} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Link href="/dashboard/categorias">
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
