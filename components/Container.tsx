import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
};

export const Container = ({ children }: Props) => {
  return <div className="container">{children}</div>;
};
