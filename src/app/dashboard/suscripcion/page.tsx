import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2Icon } from "lucide-react";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

type Props = {};

export default function page({}: Props) {
  noStore();

  return (
    <div className="max-w-md mx-auto space-y-8">
      <Card className="flex flex-col mt-10">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Mensual
            </h3>
          </div>

          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            U$S 1.5{" "}
            <span className="ml-1 text-2xl text-muted-foreground">/mes</span>
          </div>

          <p className="mt-5 text-lg text-muted-foreground">
            Organiza tus compras por solo 1.5 dolares al mes.
          </p>
        </CardContent>

        <div className="flex-1 flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0">
                <CheckCircle2Icon className="h-6 w-6 text-green-500" />
              </span>
              <p className="text-base">Lorem, ipsum dolor.</p>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0">
                <CheckCircle2Icon className="h-6 w-6 text-green-500" />
              </span>
              <p className="text-base">Lorem, ipsum dolor.</p>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0">
                <CheckCircle2Icon className="h-6 w-6 text-green-500" />
              </span>
              <p className="text-base">Lorem, ipsum dolor.</p>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0">
                <CheckCircle2Icon className="h-6 w-6 text-green-500" />
              </span>
              <p className="text-base">Lorem, ipsum dolor.</p>
            </li>
          </ul>

          <form className="w-full">
            <Button className="w-full">Suscribirse</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
