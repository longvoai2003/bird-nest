import { ContactForm } from "@/features/contact/components/contact-form";

const productNames: Record<string, string> = {
  "to-yen-chung-nguyen-chat": "Tổ yến chưng nguyên chất",
};

type ContactPageProps = {
  searchParams: {
    topic?: string;
    product?: string;
  };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const productSlug = searchParams.product ?? "";

  return (
    <section className="section">
      <ContactForm topic={searchParams.topic} relatedProduct={productNames[productSlug]} />
    </section>
  );
}
