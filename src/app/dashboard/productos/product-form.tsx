import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { createProduct } from "@/actions/product.action";
import { getCategories } from "@/fetch/category.fetch";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ButtonCreate from "@/components/button-create";
import ButtonCreateProductForm from "./button-create";

type Props = {
  listId: string;
};

export default async function ProductForm({ listId }: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const categories = await getCategories(user?.id);

  return (
    <Card className="border-none mt-2">
      <CardTitle className="text-md">Agregar Producto</CardTitle>
      <CardDescription>
        Crea el producto para agregarlo a la lista.
      </CardDescription>
      <CardContent className="px-0 mt-2">
        <form
          action={createProduct}
          className="grid grid-cols-2 gap-2 md:flex justify-between items-center"
        >
          <div className="w-full">
            <Label htmlFor="productName">Nombre del producto</Label>
            <Input name="name" />
          </div>

          <div className="w-full">
            <Label>Categoria del producto</Label>
            <Select name="category">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Seleccionar</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Input type="hidden" name="listId" value={listId} />

          <div className="col-span-2 mt-2 md:mt-5">
            <ButtonCreateProductForm />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
