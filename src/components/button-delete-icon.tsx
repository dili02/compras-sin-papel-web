"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Trash } from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

export default function ButtonDeleteIcon({}: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="destructive"
          className="gap-2"
          size={"sm"}
          type="submit"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="hidden md:block">ELIMINAR</span>
        </Button>
      ) : (
        <Button
          variant="destructive"
          className="gap-2"
          size={"sm"}
          type="submit"
        >
          <Trash className="w-5 h-5" />
          <span className="hidden md:block">ELIMINAR</span>
        </Button>
      )}
    </>
  );
}
