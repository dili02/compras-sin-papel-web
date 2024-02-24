import ButtonSubmit from "@/components/button-submit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { X } from "lucide-react";
import ButtonCreate from "@/components/button-create";
import { createCategory } from "@/actions/category.action";

type Props = {};

export default async function page({}: Props) {
  return (
    <section className="min-h-[90vh] w-full py-8 flex flex-col items-center gap-7 mx-auto">
      <Card className="w-full max-w-[640px]">
        <form action={createCategory}>
          <CardHeader>
            <CardTitle className="text-center uppercase text-3xl">
              Nueva Categoria
            </CardTitle>
            <CardDescription className="text-center ">
              Aqui mismo puedes ya crear tus categorias.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-5 p-5">
            <div className="gap-y-2 flex flex-col">
              <Label className="text-base">Nombre</Label>
              <Input
                required
                type="text"
                name="name"
                placeholder="lacteos, carnes, bebidas, etc..."
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Link href="/dashboard/categorias">
              <Button variant="destructive" className="flex gap-3">
                <X className="h-5 w-5" />
                <span className="text-sm">CANCELAR</span>
              </Button>
            </Link>

            <ButtonCreate />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
