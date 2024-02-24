import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <main className="container flex flex-col items-center justify-center bg-background h-screen">
      <span className="w-auto px-6 py-3 rounded-full bg-secondary">
        <span className="text-sm font-medium text-primary uppercase">
          Organiza tus compras
        </span>
      </span>

      <h1 className="text-3xl mt-6 font-extrabold tracking-tight text-center sm:text-5xl lg:text-6xl">
        Optimiza tu tiempo de compras y disfruta más tiempo libre.
      </h1>

      <p className="mx-auto m-3 text-base text-center text-secondary-foreground md:text-2xl">
        La aplicación web que te permite hacer tus compras de manera rápida y
        eficiente. Dile adiós a las listas de papel y olvídate de perder tiempo
        buscando, productos en la vieja lista de papel. Con esta herramienta
        intuitiva, podrás crear tu lista de compras digital y acceder fácilmente
        a ella desde tus dispositivos. ¡Ahorra tiempo y disfruta más de tu
        tiempo libre; con Comprar Sin Papel!.
      </p>

      <div className="flex justify-between items-center w-full m-4 md:max-w-md">
        <Icons.facebook className="w-12 h-12" />
        <Icons.instagram className="w-12 h-12" />
        <Icons.youtube className="w-12 h-12" />
        <Icons.tiktok className="w-12 h-12" />
        <Icons.twitter className="w-12 h-12" />
      </div>

      <div className="flex flex-col gap-4 w-full justify-center mx-auto m-4 sm:flex-row md:max-w-md">
        <RegisterLink>
          <Button className="w-full h-12 text-xl sm:w-48">Registrarse</Button>
        </RegisterLink>
        <LoginLink>
          <Button variant="secondary" className="w-full h-12 text-xl sm:w-48">
            Ingresar
          </Button>
        </LoginLink>
      </div>
    </main>
  );
}
