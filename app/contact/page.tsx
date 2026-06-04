"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/shared/config/company";

type ApiError = {
  error?: string;
  issues?: Array<{ path: string; message: string }>;
};

type AuthCustomer = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState({ fullName: "", phone: "", email: "" });

  useEffect(() => {
    let ignore = false;

    async function loadCustomer() {
      const response = await fetch("/api/auth/me");

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { customer: AuthCustomer | null };

      if (!ignore && data.customer) {
        setCustomer({
          fullName: data.customer.fullName,
          phone: data.customer.phone,
          email: data.customer.email,
        });
      }
    }

    loadCustomer().catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setError(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: String(formData.get("fullName") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? ""),
        }),
      });

      const data = (await response.json()) as ApiError;

      if (!response.ok) {
        const issueText = data.issues?.map((issue) => issue.message).join(" ");
        throw new Error(issueText || data.error || "Unable to submit contact request");
      }

      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit contact request");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="container contactGrid">
        <div>
          <SectionHeading eyebrow="Liên hệ" title="Gửi câu hỏi cho doanh nghiệp" description="Form demo mô phỏng liên hệ trực tiếp trên website. Không sử dụng Zalo, Messenger hoặc chat bên ngoài." />
          <div className="card contactInfo">
            <h3>{company.legalName}</h3>
            <p>{company.address}</p>
            <p>Hotline: {company.phone} / {company.secondaryPhone}</p>
            <p>Email: {company.email}</p>
          </div>
        </div>
        <form className="card formCard" onSubmit={submit}>
          <label>Full name<input className="input" required name="fullName" value={customer.fullName} onChange={(event) => setCustomer((current) => ({ ...current, fullName: event.target.value }))} /></label>
          <label>Phone number<input className="input" required name="phone" value={customer.phone} onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value }))} /></label>
          <label>Email address<input className="input" required type="email" name="email" value={customer.email} onChange={(event) => setCustomer((current) => ({ ...current, email: event.target.value }))} /></label>
          <label>Message<textarea className="input" required name="message" rows={5} /></label>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit contact request"}</Button>
          {error ? <p className="errorText">{error}</p> : null}
          {submitted ? <p className="successText">Thank you. Your message has been submitted.</p> : null}
        </form>
      </div>
    </section>
  );
}
