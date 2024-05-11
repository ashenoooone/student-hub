import React, { ReactNode } from "react";
import { Header } from "./header";

type NavBarProps = {
  children?: ReactNode;
};

export const NavBar = React.memo((props: NavBarProps) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});

NavBar.displayName = "NavBar";
