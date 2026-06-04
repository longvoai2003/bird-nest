"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/context/cart-context";
import { company } from "@/shared/config/company";

type AuthCustomer = {
    id: string;
    fullName: string;
    phone: string;
    email: string;
};

const links = [
    { href: "/", label: "Trang chủ" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/news", label: "Tin tức" },
    { href: "/contact", label: "Liên hệ" },
];

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { itemCount } = useCart();
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<AuthCustomer | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadCustomer() {
            const response = await fetch("/api/auth/me");

            if (!response.ok) {
                return;
            }

            const data = (await response.json()) as { customer: AuthCustomer | null };

            if (!ignore) {
                setCustomer(data.customer);
            }
        }

        loadCustomer().catch(() => setCustomer(null));

        return () => {
            ignore = true;
        };
    }, [pathname]);

    async function signOut() {
        await fetch("/api/auth/sign-out", { method: "POST" });
        setCustomer(null);
        setOpen(false);
        router.refresh();
    }

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
                    {customer ? (
                        <>
                            <span className="customerGreeting">{customer.fullName}</span>
                            <button className="authLink authButton" onClick={signOut} type="button">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <Link className="authLink" href="/sign-in">
                            Đăng nhập
                        </Link>
                    )}
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
                    {customer ? (
                        <>
                            <span className="mobileCustomer">{customer.fullName}</span>
                            <button className="mobileSignOut" onClick={signOut} type="button">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <Link href="/sign-in" onClick={() => setOpen(false)}>
                            Đăng nhập
                        </Link>
                    )}
                </nav>
            ) : null}
        </header>
    );
}
