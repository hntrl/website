import { ComponentProps, HTMLAttributes } from "react";
import NextLink from "next/link";

import { twMerge as cs } from "tailwind-merge";

const linkStyles = (className?: string) =>
  cs("text-sky-400 hover:underline active:text-blue-700", className);

export function Link({ className, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} className={linkStyles(className)} />;
}

export function GenericLink({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      {...props}
      className={linkStyles(className)}
    />
  );
}
