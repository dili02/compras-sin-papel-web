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
  //   products: ProductSearch[];
};

export default function InCartStatusSearch({}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    searchParams.get("estado")?.toString()
  );

  const params = new URLSearchParams(searchParams);

  if (value) {
    params.set("estado", value);
  } else {
    params.delete("estado");
  }

  replace(`${pathname}?${params.toString()}`);

  const status = [
    { id: "1", name: "dentro" },
    { id: "2", name: "afuera" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
          //   className="w-[100px] justify-between"
        >
          {value ? status.find((s) => s.name === value)?.name : "estado"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        //   className="w-[200px] p-0"
      >
        <Command>
          <CommandInput placeholder="Buscar estado ..." />
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          <CommandGroup>
            {status.map((s) => (
              <CommandItem
                key={s.id}
                value={s.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === s.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {s.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
