import { LinkButton } from "@/components/button";

export default function OrderSuccessPage() {
  return (
    <section className="section">
      <div className="container card successPage">
        <p className="eyebrow">Order submitted</p>
        <h1>Thank you. Your demo order request has been submitted.</h1>
        <p>This MVP simulates order submission without online payment, accounts, or external chat integrations.</p>
        <div className="heroActions">
          <LinkButton href="/products">Continue browsing</LinkButton>
          <LinkButton href="/" variant="secondary">Back to home</LinkButton>
        </div>
      </div>
    </section>
  );
}
