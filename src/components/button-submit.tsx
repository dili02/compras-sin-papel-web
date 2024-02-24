"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Plus } from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

export default function ButtonSubmit({}: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          CREANDO
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          <Plus className="h-5 w-5" />
          CREAR
        </Button>
      )}
    </>
  );
}
