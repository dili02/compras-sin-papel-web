import { ReactNode } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Navigation from "@/components/navigation";
import prisma from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {
  noStore();

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: { id: true },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;

    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) return redirect("/");

  await getData({
    email: user.email as string,
    firstName: user.given_name,
    id: user.id,
    lastName: user.family_name,
    profileImage: user.picture,
  });

  return (
    <div className="flex flex-col">
      <Navigation />
      <main className="h-[90vh] container">{children}</main>
    </div>
  );
}
