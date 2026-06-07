import { LinkButton } from "@/components/ui/button";

export default function OrderSuccessPage({ searchParams }: { searchParams: { orderId?: string } }) {
  return (
    <section className="section">
      <div className="container card successPage">
        <p className="eyebrow">Đặt hàng thành công</p>
        <h1>Cảm ơn bạn. Yêu cầu đặt hàng đã được ghi nhận.</h1>
        {searchParams.orderId ? <p>Mã đơn hàng của bạn là <strong>{searchParams.orderId}</strong>.</p> : null}
        <p>Đội ngũ Bird Nest sẽ kiểm tra thông tin sản phẩm, địa chỉ giao hàng và liên hệ xác nhận trước khi chuẩn bị đơn.</p>
        <p>Vui lòng giữ điện thoại sẵn sàng để chúng tôi có thể trao đổi thời gian giao hàng và các lưu ý đóng gói nếu cần.</p>
        <div className="heroActions">
          <LinkButton href="/products">Tiếp tục xem sản phẩm</LinkButton>
          <LinkButton href="/" variant="secondary">Về trang chủ</LinkButton>
        </div>
      </div>
    </section>
  );
}
