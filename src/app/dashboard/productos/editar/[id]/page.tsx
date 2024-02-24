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
import { getProductById } from "@/fetch/product.fetch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/fetch/category.fetch";
import { editProductById } from "@/actions/product.action";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params: { id } }: Props) {
  const product = await getProductById({
    id,
  });

  const categories = await getCategories(product?.userId);

  return (
    <section className="min-h-[90vh] w-full py-8 flex flex-col items-center gap-7 mx-auto">
      <Card className="w-full max-w-[640px]">
        <form action={editProductById}>
          <Input type="hidden" name="productId" value={product?.id} />
          <Input type="hidden" name="listId" value={product?.listId} />

          <CardHeader>
            <CardTitle className="text-center uppercase text-3xl">
              Editar producto
            </CardTitle>
            <CardDescription className="text-center xl:text-lg">
              Aqui mismo puedes Editar el producto.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5">
            <div className="gap-y-2 flex flex-col">
              <Label className="text-base">Nombre</Label>
              <Input
                required
                type="text"
                name="name"
                defaultValue={product?.name}
              />
            </div>

            <div className="w-full">
              <Label>Categoria del producto</Label>
              <Select name="categoryId" defaultValue={product?.categoryId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Seleccionar</SelectLabel>
                    {categories.map((category) => (
                      <SelectItem value={category.id} key={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Link href={`/dashboard/listas/${product?.listId}`}>
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
