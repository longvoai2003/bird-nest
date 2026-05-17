import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonBase = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonProps = ButtonBase & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = ButtonBase & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const styles = {
  primary: "button buttonPrimary",
  secondary: "button buttonSecondary",
  ghost: "button buttonGhost",
};

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ children, variant = "primary", className = "", href, ...props }: LinkButtonProps) {
  return (
    <Link className={`${styles[variant]} ${className}`} href={href} {...props}>
      {children}
    </Link>
  );
}
