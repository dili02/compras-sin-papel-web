"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category, Product } from "@prisma/client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type ProductSearch = {
  category: {
    id: string;
    name: string;
    userId: string;
  };
  name: string;
  id: string;
  listId: string;
  inCart: boolean;
};

type Props = {
  products: ProductSearch[];
};

export default function ProductSearch({ products }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    searchParams.get("producto")?.toString()
  );

  const params = new URLSearchParams(searchParams);

  if (value) {
    params.set("producto", value);
  } else {
    params.delete("producto");
  }

  replace(`${pathname}?${params.toString()}`);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
          // className="w-[200px] justify-between"
        >
          {value
            ? products.find((product) => product.name === value)?.name
            : "productos"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        // className="w-[200px] p-0"
      >
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandEmpty>No se encontraron productos.</CommandEmpty>
          <CommandGroup>
            {products.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === product.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
