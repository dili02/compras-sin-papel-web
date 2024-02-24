"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

export default function ButtonCreateProductForm({}: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="flex gap-3 w-full" size="sm">
          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
          <span className="text-sm">CREANDO</span>
        </Button>
      ) : (
        <Button type="submit" className="flex gap-3 w-full" size="sm">
          <Plus className="h-5 w-5" />
          <span className="text-sm">CREAR</span>
        </Button>
      )}
    </>
  );
}
