"use client";

import { useFormStatus } from "react-dom";
import { Edit, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {};

export default function ButtonEdit({}: Props) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          disabled
          variant="secondary"
          className="flex gap-3 text-white"
          size={"lg"}
        >
          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
          <span className="text-sm">EDITANDO</span>
        </Button>
      ) : (
        <Button
          type="submit"
          variant={"secondary"}
          className="flex gap-3 text-white"
          size="lg"
        >
          <Edit className="h-5 w-5" />
          <span className="text-sm">EDITAR</span>
        </Button>
      )}
    </>
  );
}
