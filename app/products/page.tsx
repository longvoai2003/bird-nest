import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCatalog } from "@/features/catalog/components/product-catalog";
import { products } from "@/shared/catalog/products";

export default function ProductsPage() {
  return (
    <section className="productsPage">
      <div className="productsHero">
        <div className="container productsHeroGrid">
          <SectionHeading
            eyebrow="Sản phẩm"
            title="Danh mục yến sào Tiên Sa"
            description="Chọn sản phẩm yến sào, thêm vào giỏ hàng và gửi yêu cầu đặt hàng nhanh chóng. Giá hiển thị là giá tham khảo cho demo MVP."
          />
          <div className="catalogSummary card">
            <span>{products.length} sản phẩm</span>
            <strong>Sẵn sàng đặt hàng</strong>
            <p>Tổ yến, yến chưng và các dòng yến làm sạch được trình bày như một catalog thương mại điện tử.</p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <div className="catalogToolbar">
            <div>
              <strong>Tất cả sản phẩm</strong>
              <span>Hiển thị {products.length} sản phẩm yến sào</span>
            </div>
            <label>
              Sắp xếp
              <select className="input" defaultValue="featured">
                <option value="featured">Nổi bật</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
              </select>
            </label>
          </div>

          <ProductCatalog products={products} />
        </div>
      </div>
    </section>
  );
}
