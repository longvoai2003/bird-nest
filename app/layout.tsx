import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./home.css";
import "./pages.css";
import "@/components/button.css";
import "@/components/shared.css";
import "@/components/layout.css";
import "@/components/cards.css";
import "@/components/cart.css";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { CartProvider } from "@/features/cart/context/cart-context";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin", "vietnamese"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Yến Sào Tiên Sa MVP",
  description: "Demo MVP website for browsing, packaging, and ordering bird-nest products.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
