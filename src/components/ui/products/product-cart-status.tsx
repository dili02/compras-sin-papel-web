import { Product } from "@prisma/client";
import React from "react";
import { Icons } from "@/components/icons";

type Props = {
  status: Boolean;
};

// TODO mejorar componente cn()
export default function ProductCartStatus({ status }: Props) {
  return (
    <>
      {status && (
        <span className="w-14 h-14 bg-green-300 text-green-700 rounded-md flex items-center justify-center">
          <Icons.cartIn className="w-9 h-9" />
        </span>
      )}
      {!status && (
        <span className="w-14 h-14 bg-red-300 text-red-700 rounded-md flex items-center justify-center">
          <Icons.cartOut className="w-9 h-9" />
        </span>
      )}
    </>
  );
}
