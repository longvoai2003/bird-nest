import Image from "next/image";
import { company } from "@/shared/config/company";

const highlights = [
  "Kinh nghiệm xây dựng và vận hành nhiều nhà yến trên khắp Việt Nam.",
  "Sản phẩm có mã truy xuất nguồn gốc và số lượng thu hoạch.",
  "Đóng gói linh hoạt 10g, 50g, 100g để nhiều gia đình dễ tiếp cận hơn.",
];

const nutritionFacts = [
  "18 loại axit amin và 31 nguyên tố vi lượng có lợi cho sức khỏe.",
  "Aspartic acid hỗ trợ tái tạo tế bào cơ, mô và da.",
  "Cystein, Phenylalanine, Tyrosine và Sialic acid hỗ trợ phục hồi cơ thể.",
  "Glucosamine góp phần hỗ trợ sụn khớp và người cần bồi bổ.",
];

export default function AboutPage() {
  return (
    <article className="section articlePage aboutArticlePage">
      <div className="container articleContainer aboutArticleContainer">
        <p className="eyebrow">Giới thiệu</p>
        <h1>{company.name} - tinh hoa đất Việt từ nghề yến</h1>
        <p className="articleDate">Câu chuyện thương hiệu, nguồn gốc sản phẩm và cam kết đạo đức nghề nghiệp</p>

        <Image
          src="https://www.yensaotiensa.com/data/news/2007/banner-gioi-thieu.jpg"
          alt="Đội ngũ Yến Sào Tiên Sa thu hoạch tổ yến tại hệ thống nhà yến"
          width={900}
          height={520}
          priority
        />

        <section className="aboutLead card">
          <p>
            {company.name} hình thành từ tình yêu với nghề nuôi chim yến và mong muốn đưa sản phẩm yến sào thật, sạch, an toàn đến gần hơn với từng gia đình Việt.
          </p>
          <p>
            Từ những kinh nghiệm tích lũy qua nhiều năm, doanh nghiệp chia sẻ kiến thức về nghề yến, xây dựng hệ thống nhà yến và phát triển các dòng sản phẩm chăm sóc sức khỏe từ tổ yến.
          </p>
        </section>

        <div className="aboutHighlightGrid">
          {highlights.map((item) => (
            <div className="card aboutHighlightCard" key={item}>
              <span />
              <p>{item}</p>
            </div>
          ))}
        </div>

        <section className="aboutSection">
          <h2>Yến sào - món quà quý từ thiên nhiên</h2>
          <p>
            Yến sào, hay tổ chim yến, từ lâu được xem là thực phẩm quý có giá trị dinh dưỡng cao. Tổ yến được kết thành từ nhiều lớp sợi mảnh do chim yến tạo nên, trước đây thường được khai thác ở các vách hang tự nhiên nên rất khan hiếm và có giá trị cao.
          </p>
          <p>
            Theo thông tin giới thiệu từ Yến Sào Tiên Sa, tổ yến chứa nhiều thành phần có lợi cho sức khỏe, phù hợp với người cần bồi bổ, người suy nhược, ăn uống kém, phụ nữ sau sinh hoặc người cần phục hồi thể trạng.
          </p>
          <div className="aboutFactList card">
            {nutritionFacts.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>

        <section className="aboutSection aboutSplitSection">
          <div>
            <h2>Nguồn gốc sản phẩm</h2>
            <p>
              Nhận thấy giá trị sức khỏe và kinh tế của yến sào, anh Trần Phước Sỹ - Giám đốc công ty - đã theo đuổi nghề nuôi yến với mục tiêu đưa chim yến tự nhiên vào nhà để sinh sống và làm tổ.
            </p>
            <p>
              Bằng sự đam mê và quá trình học hỏi liên tục, đội ngũ Yến Sào Tiên Sa góp phần đưa nghề nuôi yến trong nhà trở thành một hướng phát triển mới cho nhiều địa phương. Công ty tham gia tư vấn, thi công kỹ thuật và chuyển giao công nghệ nhà yến cho nhiều đối tác, hộ nuôi yến trên cả nước.
            </p>
          </div>
          <aside className="card aboutSideNote">
            <strong>Hệ thống nhà yến thực tế</strong>
            <p>Yến Sào Tiên Sa cho biết đã xây dựng hàng trăm nhà yến trên khắp Việt Nam, tạo nguồn tổ yến ổn định để cung ứng ra thị trường.</p>
          </aside>
        </section>

        <section className="aboutSection">
          <h2>Đạo đức nghề nghiệp</h2>
          <p>
            Trong bối cảnh thị trường yến sào có nhiều sản phẩm thật giả lẫn lộn, Yến Sào Tiên Sa đặt uy tín và đạo đức nghề nghiệp làm nền tảng. Các sản phẩm như tổ yến thô, tổ yến làm sạch, cháo yến, yến chưng đường phèn và nước yến được giới thiệu với tinh thần trân trọng, trách nhiệm và minh bạch.
          </p>
          <p>
            Doanh nghiệp nhấn mạnh việc tạo ra sản phẩm bằng sự tận tâm, giữ gìn giá trị của yến sào như một món quà từ thiên nhiên, đồng thời giúp khách hàng an tâm hơn thông qua mã kiểm tra nguồn gốc và số lượng thu hoạch trên website chính thức.
          </p>
        </section>

        <section className="aboutSection aboutPromise card">
          <div>
            <span className="aboutPromiseLabel">Cam kết</span>
            <h2>Sản phẩm thật, sạch và dễ tiếp cận hơn</h2>
          </div>
          <p>
            Yến sào thường được xem là thực phẩm cao cấp, nhưng Yến Sào Tiên Sa mong muốn nhiều gia đình có thể sử dụng khi cần bồi bổ sức khỏe. Vì vậy, sản phẩm được đóng gói theo quy cách nhỏ như 10g, 50g và 100g; một tổ có thể dùng 2-3 lần tùy độ tuổi và nhu cầu.
          </p>
          <p>
            Mục tiêu của công ty là đưa yến sào thật, sạch, an toàn đến gần hơn với người tiêu dùng, đồng thời góp phần tạo việc làm ổn định cho các hộ nuôi yến và phát triển nguồn tổ yến chất lượng tại Việt Nam.
          </p>
        </section>

        <section className="aboutContactBlock card">
          <div>
            <p className="eyebrow">Thông tin doanh nghiệp</p>
            <h2>{company.legalName}</h2>
            <p>{company.address}, Việt Nam</p>
          </div>
          <div>
            <p>Hotline: {company.secondaryPhone} / {company.phone}</p>
            <p>Email: {company.email}</p>
            <p>Website: www.yensaotiensa.com</p>
          </div>
        </section>
      </div>
    </article>
  );
}
