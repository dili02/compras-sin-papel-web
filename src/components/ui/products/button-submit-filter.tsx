"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { Button } from "../button";

type Props = {};

export default function ButtonSubmitFilter({}: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Filtrando
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Filtrar
        </Button>
      )}
    </>
  );
}
