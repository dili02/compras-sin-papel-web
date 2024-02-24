import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../label";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type Props = {};

async function getCategories(userID: string) {
  //   const data = (await prisma.category
  //     .findMany({
  //       where: { userId: userID },
  //       select: { name: true, id: true },
  //       distinct: ["name"],
  //     })
  //     .then((names) =>
  //       names.map(({ name }) => name).filter(Boolean)
  //     )) as string[];
  const data = await prisma.category.findMany({
    where: { userId: userID },
    select: { name: true, id: true },
  });

  return data;
}

export default async function CategorySelectForm({}: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const data = await getCategories(user?.id as string);

  return (
    <div className="space-y-1">
      <Label htmlFor="category">Categorias</Label>
      <Select name="category">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar categoria" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categoria</SelectLabel>
            {data.map((category) => (
              <SelectItem value={category.id} key={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
