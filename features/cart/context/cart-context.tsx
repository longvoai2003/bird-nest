"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/shared/catalog/products";

export type CartLine = {
    productId: string;
    quantity: number;
    packagingId?: string;
};

type CartContextValue = {
    lines: CartLine[];
    addItem: (productId: string, packagingId?: string) => void;
    updateQuantity: (productId: string, quantity: number, packagingId?: string) => void;
    removeItem: (productId: string, packagingId?: string) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    detailedLines: Array<CartLine & { product: Product }>;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "bird-nest-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [lines, setLines] = useState<CartLine[]>([]);

    useEffect(() => {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
            setLines(JSON.parse(saved) as CartLine[]);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(lines));
    }, [lines]);

    const detailedLines = useMemo(
        () =>
            lines
                .map((line) => {
                    const product = products.find((item) => item.id === line.productId);
                    return product ? { ...line, product } : null;
                })
                .filter((line): line is CartLine & { product: Product } => Boolean(line)),
        [lines],
    );

    const subtotal = detailedLines.reduce((total, line) => total + line.product.price * line.quantity, 0);
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0);

    const value: CartContextValue = {
        lines,
        addItem: (productId, packagingId) => {
            setLines((current) => {
                const existing = current.find((line) => line.productId === productId && line.packagingId === packagingId);
                if (existing) {
                    return current.map((line) =>
                        line.productId === productId && line.packagingId === packagingId
                            ? { ...line, quantity: line.quantity + 1 }
                            : line,
                    );
                }
                return [...current, { productId, packagingId, quantity: 1 }];
            });
        },
        updateQuantity: (productId, quantity, packagingId) => {
            setLines((current) =>
                current
                    .map((line) =>
                        line.productId === productId && line.packagingId === packagingId
                            ? { ...line, quantity: Math.max(0, quantity) }
                            : line,
                    )
                    .filter((line) => line.quantity > 0),
            );
        },
        removeItem: (productId, packagingId) =>
            setLines((current) => current.filter((line) => !(line.productId === productId && line.packagingId === packagingId))),
        clearCart: () => setLines([]),
        itemCount,
        subtotal,
        detailedLines,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }
    return context;
}
