import Link from "next/link";
import Image from "next/image";
import { company } from "@/shared/config/company";

export function Footer() {
    return (
        <footer className="footer">
            <div className="container footerGrid">
                <div className="footerBrandColumn">
                    <Link className="footerLogo" href="/">
                        <Image
                            src="/logo.png"
                            alt="Yến Sào Tiên Sa logo"
                            width={58}
                            height={58}
                        />
                        <span>
                            <strong>{company.name}</strong>
                            <small>Tinh hoa đất Việt</small>
                        </span>
                    </Link>
                    <p>{company.tagline}</p>
                    <div className="footerCompanyInfo">
                        <p>{company.legalName}</p>
                        <p>{company.address}</p>
                        <p>Hotline: {company.secondaryPhone} / {company.phone}</p>
                        <p>Email: {company.email}</p>
                    </div>
                </div>
                <div className="footerColumns">
                    <div>
                        <h3>Điều hướng</h3>
                        <Link href="/about">Giới thiệu</Link>
                        <Link href="/products">Sản phẩm</Link>
                        <Link href="/news">Tin tức</Link>
                        <Link href="/contact">Liên hệ</Link>
                    </div>
                    <div>
                        <h3>Hỗ trợ</h3>
                        <Link href="/contact?topic=custom-design&product=to-yen-chung-nguyen-chat">Thiết kế hộp riêng</Link>
                        <Link href="/contact">Đặt lịch tư vấn</Link>
                        <Link href="/cart">Giỏ hàng</Link>
                        <Link href="/account">Tài khoản</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
