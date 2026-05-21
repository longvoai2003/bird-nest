"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/features/cart/context/cart-context";
import { company } from "@/shared/config/company";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/news", label: "Tin tức" },
  { href: "/contact", label: "Liên hệ" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link className="logo" href="/" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Yến Sào Tiên Sa logo"
            width={48}
            height={48}
            className="logoAvatar"
          />
          <span>
            <strong>{company.name}</strong>
            <small>Tinh hoa đất Việt</small>
          </span>
        </Link>
        <nav className="desktopNav" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              className={pathname === link.href ? "active" : ""}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="headerActions">
          <a className="hotline" href={`tel:${company.phone.replaceAll(".", "")}`}>
            {company.phone}
          </a>
          <Link className="cartPill" href="/cart">
            Giỏ hàng <span>{itemCount}</span>
          </Link>
          <button
            className="menuButton"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <nav className="mobileNav container" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setOpen(false)}>
            Giỏ hàng ({itemCount})
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
