import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-center uppercase text-4xl font-extrabold lg:text-5xl">
      {children}
    </h1>
  );
}
