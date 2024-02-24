import { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCategories } from "@/fetch/category.fetch";
import SearchCategory from "./category-search";
import CategoryList from "./category-list";
import CategorySkeleton from "./category-skeleton";
import { Category } from "@/app/types";

type Props = {
  searchParams?: {
    categoria?: string;
  };
};

export type CategoryList = Omit<Category, "products">;

export default async function page({ searchParams }: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const query = searchParams?.categoria || "";

  const allcategories: CategoryList[] = await getCategories(user?.id as string);

  return (
    <div className="grid items-start pt-6">
      <h1 className="text-center uppercase text-4xl font-extrabold lg:text-5xl">
        categorias
      </h1>

      <p className="text-sm text-muted-foreground text-center md:text-xl lg:text-lg">
        Administa tus categorias para poder agregar en tus productos.
      </p>

      <div className="flex justify-between w-full mt-4 gap-2">
        <SearchCategory categories={allcategories} />

        <Link href={`/dashboard/categorias/nueva`}>
          <Button className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <span className="text-sm">CREAR</span>
          </Button>
        </Link>
      </div>

      <Suspense key={query} fallback={<CategorySkeleton />}>
        <CategoryList query={query} userId={user?.id as string} />
      </Suspense>
    </div>
  );
}
