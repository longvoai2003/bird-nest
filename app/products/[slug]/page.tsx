import { notFound } from "next/navigation";
import { ProductDetail } from "@/features/catalog/components/product-detail";
import { products } from "@/shared/catalog/products";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
