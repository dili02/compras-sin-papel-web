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
// import { Category } from "@prisma/client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Category } from "@/app/types";

type CategoryList = Omit<Category, "products" | "userId">;

type Props = {
  categories: CategoryList[];
};

export default function SearchCategory({ categories }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    searchParams.get("categoria")?.toString()
  );

  const params = new URLSearchParams(searchParams);

  if (value) {
    params.set("categoria", value);
  } else {
    params.delete("categoria");
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
          // className="w-[225px] justify-between"
        >
          {value
            ? categories.find((category) => category.name === value)?.name
            : "categoria"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        // className="w-[225px] p-0"
      >
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandEmpty>No se encontro categoria.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                value={category.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === category.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
