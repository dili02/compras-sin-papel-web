import React from "react";
import { Label } from "../label";
import { Input } from "../input";
import CategorySelectForm from "../category/category-select-form";
import { Checkbox } from "../checkbox";
import ButtonSubmitFilter from "./button-submit-filter";
import { productFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

type Props = {};

async function filterProducts(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, category, inCart, outCart } = productFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(category && { category: category }),
    // ...(inCart && { inCart: "true" }),
    // ...(outCart && { outCart: "true" }),
  });

  redirect(`/dashboard/productos?${searchParams.toString()}`);
}

export default function ProductSidebarFilter({}: Props) {
  return (
    <aside className="md:w-[300px] sticky top-0 h-fit border p-4 rounded-lg">
      <form action={filterProducts}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Buscar</Label>
            <Input id="q" name="q" placeholder="Has tu busqueda aqui ..." />
          </div>

          <CategorySelectForm />

          <div className="items-top flex justify-between space-x-2">
            <div className="flex items-center gap-1.5 leading-none my-2">
              <Checkbox id="inCart" name="inCart" value="true" />
              <label
                htmlFor="inCart"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Dentro de carro
              </label>
            </div>

            <div className="flex items-center gap-1.5 leading-none">
              <Checkbox id="outCart" name="outCart" value="false" />
              <label
                htmlFor="outCart"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Fuera de carro
              </label>
            </div>
          </div>

          <ButtonSubmitFilter />
        </div>
      </form>
    </aside>
  );
}
