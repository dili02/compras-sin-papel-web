import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getProducts } from "@/fetch/product.fetch";
import { deleteProductById, toggleProductCart } from "@/actions/product.action";
import { getList } from "@/fetch/list.fetch";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, FileWarning, Trash2 } from "lucide-react";
import { Icons } from "@/components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ButtonDeleteIcon from "@/components/button-delete-icon";
// import { Product } from "@prisma/client";

type Product = {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    userId: string;
  };
  inCart: boolean;
  listId: string;
};

type Props = {
  id: string;
  products: Product[];
};

export default async function ProductList({ id, products }: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const list = await getList(user?.id as string, id);

  return (
    <section className="">
      {list?.products.length === 0 && (
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
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col flex-grow gap-3 border rounded-xl p-5 bg-muted overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <p className="uppercase font-semibold">{product.name}</p>

              <Link href={`/dashboard/productos/editar/${product.id}`}>
                <Button
                  variant="outline"
                  className="rounded-full border-none"
                  size={"icon"}
                >
                  <Edit className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-ellipsis overflow-hidden whitespace-nowrap rounded-full px-4 py-1 bg-primary text-primary-foreground w-fit">
                {product.category.name}
              </p>

              <form action={deleteProductById}>
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="listId" value={product?.listId} />

                <Button
                  variant="outline"
                  className="rounded-full border-none"
                  size={"icon"}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </form>
            </div>

            <div className="flex justify-between items-center">
              {product.inCart === true ? (
                <p className="text-ellipsis overflow-hidden whitespace-nowrap rounded-full px-4 py-1 bg-primary text-green-400 w-fit flex items-center gap-2">
                  <Icons.cartOut className="w-4 h-4" />
                  <span>producto dentro de carro</span>
                </p>
              ) : (
                <p className="text-ellipsis overflow-hidden whitespace-nowrap rounded-full px-4 py-1 bg-primary text-red-400 w-fit flex items-center gap-2">
                  <Icons.cartOut className="w-4 h-4" />
                  <span>producto fuera de carro</span>
                </p>
              )}

              <form action={toggleProductCart}>
                <input type="hidden" name="productId" value={product.id} />
                <input type="hidden" name="listId" value={product?.listId} />
                <input
                  type="hidden"
                  name="inCart"
                  value={String(product.inCart)}
                />

                <Button
                  variant="outline"
                  className="rounded-full border-none"
                  size={"icon"}
                >
                  {product.inCart ? (
                    <Icons.cartOutArrow className="w-5 h-5" />
                  ) : (
                    <Icons.cartInArrow className="w-5 h-5" />
                  )}
                </Button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
