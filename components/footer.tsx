import Link from "next/link";
import { company } from "@/data/company";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <h2>{company.name}</h2>
          <p>{company.tagline}</p>
        </div>
        <div>
          <h3>Điều hướng</h3>
          <Link href="/about">Giới thiệu</Link>
          <Link href="/products">Sản phẩm</Link>
          <Link href="/news">Tin tức</Link>
          <Link href="/contact">Liên hệ</Link>
        </div>
        <div>
          <h3>Liên hệ</h3>
          <p>{company.address}</p>
          <p>Hotline: {company.phone}</p>
          <p>Email: {company.email}</p>
        </div>
        <div>
          <h3>Demo MVP</h3>
          <p>Website mô phỏng đặt hàng, chọn đóng gói và gửi yêu cầu. Không tích hợp thanh toán hoặc mạng xã hội.</p>
        </div>
      </div>
    </footer>
  );
}
