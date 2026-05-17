"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartLine = {
    productId: string;
    quantity: number;
};

type CartContextValue = {
    lines: CartLine[];
    addItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeItem: (productId: string) => void;
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
        addItem: (productId) => {
            setLines((current) => {
                const existing = current.find((line) => line.productId === productId);
                if (existing) {
                    return current.map((line) =>
                        line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line,
                    );
                }
                return [...current, { productId, quantity: 1 }];
            });
        },
        updateQuantity: (productId, quantity) => {
            setLines((current) =>
                current
                    .map((line) => (line.productId === productId ? { ...line, quantity: Math.max(0, quantity) } : line))
                    .filter((line) => line.quantity > 0),
            );
        },
        removeItem: (productId) => setLines((current) => current.filter((line) => line.productId !== productId)),
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
