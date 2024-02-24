import { deleteCategoryById } from "@/actions/category.action";
import ButtonDeleteIcon from "@/components/button-delete-icon";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/fetch/category.fetch";
import { Category } from "@prisma/client";
import { Edit, FileWarning } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  query: string;
  userId: string;
};

export default async function CategoryList({ query, userId }: Props) {
  const categories: Category[] = await getCategories(userId, query);

  return (
    <section className="mt-5">
      {categories.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 gap-y-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 lg:w-28 lg:h-28">
            <FileWarning className="w-10 h-10 text-primary lg:w-14 lg:h-14" />
          </div>

          <p className="text-center text-md leading-6 text-muted-foreground  md:text-2xl">
            No se han encontrado resultados.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 transition-all xl:grid-cols-3">
        {categories.map((category: any) => (
          <article
            key={category.id}
            className="flex justify-between flex-grow gap-3 border rounded-xl p-5 bg-muted overflow-hidden md:flex-col"
          >
            <div className="flex justify-between items-center">
              <p>{category.name}</p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <Link href={`/dashboard/categorias/editar/${category.id}`}>
                <Button
                  variant="default"
                  className="gap-3 bg-muted-foreground"
                  size={"sm"}
                >
                  <Edit className="w-5 h-5" />
                  <span className="hidden md:block">EDITAR</span>
                </Button>
              </Link>

              <form action={deleteCategoryById}>
                <input type="hidden" name="categoryId" value={category.id} />
                <ButtonDeleteIcon />
              </form>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
