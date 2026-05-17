"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/data/company";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
          <label>Full name<input className="input" required name="name" /></label>
          <label>Phone number<input className="input" required name="phone" /></label>
          <label>Email address<input className="input" required type="email" name="email" /></label>
          <label>Message<textarea className="input" required name="message" rows={5} /></label>
          <Button type="submit">Submit contact request</Button>
          {submitted ? <p className="successText">Thank you. Your message has been submitted for the demo.</p> : null}
        </form>
      </div>
    </section>
  );
}
