import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Icons } from "./icons";
import Link from "next/link";
import { DoorClosedIcon, User2 } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from "./theme-toggle-button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type Props = {};

export const navItems = [
  { name: "Inicio", href: "/dashboard", icon: Icons.home },
  { name: "Categorias", href: "/dashboard/categorias", icon: Icons.category },
  // { name: "Productos", href: "/dashboard/productos", icon: Icons.product },
  { name: "Listas", href: "/dashboard/listas", icon: Icons.list },
  { name: "Suscripción", href: "/dashboard/suscripcion", icon: Icons.card },
];

export default async function Navigation({}: Props) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  return (
    <nav className="border-b bg-background h-[10vh] flex items-center text-2xl">
      <div className="container flex items-center justify-between">
        <span className="font-bold text-xl">Compar Sin Papel</span>

        <div className="flex items-center gap-5">
          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10 rounded-full">
                  <AvatarImage
                    src={user?.picture as string}
                    alt="user avatar image"
                  />
                  <AvatarFallback>
                    <User2 className="h-10 w-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-medium leading-none">
                    {`${user?.given_name} ${user?.family_name}`}
                  </p>
                  <p className="text-sm leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {navItems.map((item, index) => (
                  <DropdownMenuItem asChild key={index}>
                    <Link
                      href={item.href}
                      className="w-full flex items-center gap-3 cursor-pointer hover:bg-accent"
                    >
                      <span>
                        {" "}
                        <item.icon className="w-4 h-4" />
                      </span>
                      <p className="text-base">{item.name}</p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="w-full flex gap-3 items-center"
                asChild
              >
                <LogoutLink>
                  <span>
                    <DoorClosedIcon className="w-4 h-4" />
                  </span>
                  <span className="text-base">Salir</span>
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
