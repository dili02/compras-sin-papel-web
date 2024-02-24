import React, { Suspense } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProductForm from "../../productos/product-form";
import ProductList from "../../productos/product-list";
import ProductSearch from "../../productos/product-search";
import { getProducts } from "@/fetch/product.fetch";
import { getCategories } from "@/fetch/category.fetch";
import SearchCategory from "../../categorias/category-search";
import InCartStatusSearch from "./incart-search";
import ProductSkeleton from "../../productos/product-skeleton";
import { Icons } from "@/components/icons";

type Props = {
  params: {
    id: string;
  };
  searchParams?: {
    producto?: string;
    categoria?: string;
    estado?: string;
  };
};

type Product = {
  id: string;
  name: string;
  inCart: boolean;
  listId: string;
  category: {
    id: string;
    name: string;
    userId: string;
  };
};

export default async function page({ params: { id }, searchParams }: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const product = searchParams?.producto || "";
  const category = searchParams?.categoria || "";
  const status = searchParams?.estado || "";
  let inCart;

  if (status === "dentro") {
    inCart = Boolean(!inCart);
  } else if (status === "afuera") {
    inCart = Boolean(inCart);
  } else {
    inCart = undefined;
  }

  const productsSearch = await getProducts(id, user?.id as string);
  const categories = await getCategories(user?.id as string);

  const products: Product[] = await getProducts(
    id,
    user?.id as string,
    product,
    category,
    inCart
  );

  return (
    <section className="min-h-[90vh] w-full flex flex-col gap-2 mx-auto">
      <ProductForm listId={id} />

      <div className="py-2">
        <h3>Filtrar:</h3>
        <div className="flex items-center justify-between gap-4">
          <ProductSearch products={productsSearch} />
          <SearchCategory categories={categories} />
          <InCartStatusSearch />
        </div>
      </div>

      <section className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Icons.cart className="h-6 w-6" />
          <p className="flex items-center gap-2">
            <span className="hidden md:block">Productos en lista:</span>
            <span>{products.length}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Icons.cartIn className="h-6 w-6" />
          <p className="flex items-center gap-2">
            <span className="hidden md:block">Productos dentro del carro:</span>
            <span>
              {products.filter((product) => product.inCart === true).length}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Icons.cartOut className="h-6 w-6" />
          <p className="flex items-center gap-2">
            <span className="hidden md:block">Productos fuera del carro:</span>
            <span>
              {products.filter((product) => product.inCart === false).length}
            </span>
          </p>
        </div>
      </section>

      <Suspense fallback={<ProductSkeleton />}>
        <ProductList id={id} products={products} />
      </Suspense>
    </section>
  );
}
