"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/features/cart/context/cart-context";
import { company } from "@/shared/config/company";
import { getCustomerTierInfo } from "@/shared/customer-tiers";

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
    const { itemCount, customerTier } = useCart();
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<AuthCustomer | null>(null);
    const tierInfo = getCustomerTierInfo(customerTier);

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
                    <Link className="cartPill" href="/cart">
                        Giỏ hàng <span>{itemCount}</span>
                    </Link>
                    <Link className={`tierHeaderBadge tierHeaderBadge-${tierInfo.id}`} href="/account" title="Chọn hạng thành viên">
                        {tierInfo.symbol}
                    </Link>
                    {customer ? (
                        <>
                            <Link className="customerGreeting" href="/account">
                                {customer.fullName}
                            </Link>
                            <button className="signOutIconButton" onClick={signOut} type="button" aria-label="Đăng xuất" title="Đăng xuất">
                                <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                                    <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
                                    <path d="M14 16l4-4-4-4" />
                                    <path d="M18 12H9" />
                                </svg>
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
                            <Link href="/account" onClick={() => setOpen(false)}>
                                {tierInfo.symbol} {customer.fullName}
                            </Link>
                            <button className="mobileSignOut" onClick={signOut} type="button">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/account" onClick={() => setOpen(false)}>
                                Tài khoản
                            </Link>
                            <Link href="/sign-in" onClick={() => setOpen(false)}>
                                Đăng nhập
                            </Link>
                        </>
                    )}
                </nav>
            ) : null}
        </header>
    );
}
