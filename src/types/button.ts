import type { ReactNode, ButtonHTMLAttributes } from "react";
import type { UrlObject } from "url";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    href?: never;
    type?: "button" | "submit" | "reset";
  };

type ButtonAsLink = BaseProps & {
  href: string | UrlObject;
  onClick?: never;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export type ButtonProps = ButtonAsButton | ButtonAsLink;