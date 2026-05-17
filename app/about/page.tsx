import { SectionHeading } from "@/components/section-heading";
import { company } from "@/data/company";

export default function AboutPage() {
  return (
    <>
      <section className="section sectionTint">
        <div className="container">
          <SectionHeading eyebrow="Giới thiệu" title="Một trải nghiệm thương hiệu rõ ràng hơn" description={`${company.name} được trình bày như một thương hiệu yến sào Việt đáng tin cậy, tập trung vào chất lượng, nguồn gốc và sự thuận tiện khi đặt hàng.`} />
          <div className="grid3">
            <div className="card trustCard"><h3>Câu chuyện công ty</h3><p>Website demo giữ tinh thần thương hiệu hiện tại nhưng giảm bớt các nhóm nội dung không thuộc hành trình mua sản phẩm.</p></div>
            <div className="card trustCard"><h3>Cam kết chất lượng</h3><p>Nội dung About nhấn mạnh sự trân trọng sản phẩm, đạo đức kinh doanh và niềm tin của khách hàng.</p></div>
            <div className="card trustCard"><h3>Phù hợp biếu tặng</h3><p>Yến sào được định vị là sản phẩm chăm sóc sức khỏe và quà tặng cao cấp cho gia đình, đối tác.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
