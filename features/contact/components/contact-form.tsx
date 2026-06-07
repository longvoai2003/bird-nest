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

type ContactFormProps = {
  topic?: string;
  relatedProduct?: string;
};

export function ContactForm({ topic, relatedProduct }: ContactFormProps) {
  const initialRequestType = topic === "custom-design" ? "Tư vấn thiết kế hộp quà" : "Câu hỏi về sản phẩm";
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState({ fullName: "", phone: "", email: "" });
  const [requestType, setRequestType] = useState(initialRequestType);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [consultationMethod, setConsultationMethod] = useState("Gọi điện");
  const [message, setMessage] = useState(
    topic === "custom-design" && relatedProduct
      ? `Tôi muốn được tư vấn thiết kế hộp quà riêng cho sản phẩm ${relatedProduct}.`
      : "",
  );

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
          requestType,
          relatedProduct: relatedProduct ?? "",
          appointmentDate,
          appointmentTime,
          consultationMethod,
          message: String(formData.get("message") ?? ""),
        }),
      });

      const data = (await response.json()) as ApiError;

      if (!response.ok) {
        const issueText = data.issues?.map((issue) => issue.message).join(" ");
        throw new Error(issueText || data.error || "Unable to submit contact request");
      }

      form.reset();
      setRequestType(initialRequestType);
      setAppointmentDate("");
      setAppointmentTime("");
      setConsultationMethod("Gọi điện");
      setMessage("");
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit contact request");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container contactGrid">
      <div>
        <SectionHeading eyebrow="Liên hệ" title="Đặt lịch tư vấn cùng chăm sóc khách hàng" description="Gửi thông tin sản phẩm, nhu cầu thiết kế hoặc thời gian bạn muốn được tư vấn. Cửa hàng sẽ liên hệ lại để xác nhận lịch phù hợp." />
        {relatedProduct ? (
          <div className="card contactContextCard">
            <span>Yêu cầu đang chọn</span>
            <strong>{relatedProduct}</strong>
            <p>Chúng tôi sẽ chuẩn bị trước thông tin về mẫu hộp, màu sắc, lời chúc và phương án đóng gói phù hợp với nhu cầu của bạn.</p>
          </div>
        ) : null}
        <div className="card contactInfo">
          <h3>{company.legalName}</h3>
          <p>{company.address}</p>
          <p>Hotline: {company.phone} / {company.secondaryPhone}</p>
          <p>Email: {company.email}</p>
        </div>
      </div>
      <form className="card formCard" onSubmit={submit}>
        <label>Họ và tên<input className="input" required name="fullName" value={customer.fullName} onChange={(event) => setCustomer((current) => ({ ...current, fullName: event.target.value }))} /></label>
        <label>Số điện thoại<input className="input" required name="phone" value={customer.phone} onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value }))} /></label>
        <label>Email<input className="input" required type="email" name="email" value={customer.email} onChange={(event) => setCustomer((current) => ({ ...current, email: event.target.value }))} /></label>
        <label>
          Nhu cầu hỗ trợ
          <select className="input" name="requestType" value={requestType} onChange={(event) => setRequestType(event.target.value)}>
            <option>Tư vấn thiết kế hộp quà</option>
            <option>Đặt lịch tư vấn với chăm sóc khách hàng</option>
            <option>Câu hỏi về sản phẩm</option>
            <option>Hỗ trợ đơn hàng</option>
          </select>
        </label>
        <div className="appointmentGrid">
          <label>Ngày mong muốn<input className="input" name="appointmentDate" type="date" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value)} /></label>
          <label>
            Khung giờ mong muốn
            <select className="input" name="appointmentTime" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)}>
              <option value="">Cửa hàng đề xuất</option>
              <option>09:00-11:00</option>
              <option>14:00-16:00</option>
              <option>18:00-20:00</option>
            </select>
          </label>
        </div>
        <label>
          Hình thức tư vấn
          <select className="input" name="consultationMethod" value={consultationMethod} onChange={(event) => setConsultationMethod(event.target.value)}>
            <option>Gọi điện</option>
            <option>Trao đổi online</option>
            <option>Gặp trực tiếp tại cửa hàng</option>
          </select>
        </label>
        <label>Nội dung cần tư vấn<textarea className="input" required name="message" rows={5} value={message} onChange={(event) => setMessage(event.target.value)} /></label>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu tư vấn"}</Button>
        {error ? <p className="errorText">{error}</p> : null}
        {submitted ? <p className="successText">Cảm ơn bạn. Cửa hàng đã nhận yêu cầu và sẽ liên hệ để xác nhận lịch tư vấn.</p> : null}
      </form>
    </div>
  );
}
