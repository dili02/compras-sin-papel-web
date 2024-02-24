import React from "react";
import { Category, Product } from "@prisma/client";
import ProductCartStatus from "./product-cart-status";
import { Clock, Store } from "lucide-react";
import { Badge } from "../badge";

type Props = {
  product: {
    name: Product["name"];
    inCart: Product["inCart"];
    market: Product["market"];
    createdAt: Product["createdAt"];
    category: Category;
  };
};

export default function ProductListItem({ product }: Props) {
  return (
    <article className="flex flex-col flex-grow gap-3 border rounded-lg p-5 hover:bg-muted overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">{product.name}</h2>
        <Badge>{product.category.name}</Badge>
      </div>

      <div className="flex items-center gap-4">
        <ProductCartStatus status={product.inCart} />

        <div className="flex flex-col justify-center">
          <p className="text-muted-foreground flex gap-2 my-2">
            <Store className="h-5 w-5" />
            {product.market ?? "Cualquier Lugar"}
          </p>

          <p className="text-muted-foreground flex gap-2">
            <Clock className="h-5 w-5" />
            {new Date(product.createdAt).toLocaleDateString("es-es", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex-grow space-y-3">
        <div>
          {/* <div className="flex gap-4">
            <p className="text-muted-foreground flex gap-2">
              <Store className="h-5 w-5" />
              {product.market ?? "Cualquier Lugar"}
            </p>

          </div> */}
        </div>
      </div>
    </article>
  );
}
