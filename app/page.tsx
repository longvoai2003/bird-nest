import Image from "next/image";
import { news } from "@/server/content/news";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturedProducts } from "@/features/catalog/components/featured-products";
import { NewsCard } from "@/features/news/components/news-card";
import { products } from "@/shared/catalog/products";
import { company } from "@/shared/config/company";

export default function HomePage() {
    return (
        <>
            <section className="hero">
                <div className="container heroGrid">
                    <div>
                        <p className="eyebrow">Demo MVP ordering website</p>
                        <h1>{company.name}</h1>
                        <p>{company.tagline} Khám phá sản phẩm, chọn đóng gói quà tặng và gửi yêu cầu đặt hàng nhanh chóng.</p>
                        <div className="heroActions">
                            <LinkButton href="/products">Đặt hàng ngay</LinkButton>
                            <LinkButton href="/about" variant="secondary">Tìm hiểu thương hiệu</LinkButton>
                        </div>
                    </div>
                    <div className="heroPanel">
                        <div className="heroVideoFrame">
                            <iframe
                                src="https://www.youtube.com/embed/A1xlHUGhLlQ"
                                title="Giới thiệu Yến Sào Tiên Sa"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                        <div className="heroVideoContent">
                            <span>OCOP 4 sao</span>
                            <h2>Xem câu chuyện Yến Sào Tiên Sa</h2>
                            <p>Video giới thiệu giúp khách hàng hiểu rõ hơn về thương hiệu, sản phẩm và cam kết chất lượng trước khi đặt hàng.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section commitmentSection">
                <div className="container commitmentGrid">
                    <Image src="https://www.yensaotiensa.com/data/news/2025/banner-gioi-thieu.jpg" alt="Cam kết chất lượng Yến Sào Tiên Sa" width={720} height={430} />
                    <div>
                        <p className="eyebrow">Cam kết</p>
                        <h2>Sản phẩm yến sào minh bạch, uy tín và có nguồn gốc rõ ràng</h2>
                        <p>Yến Sào Tiên Sa đặt đạo đức nghề nghiệp và niềm tin khách hàng lên hàng đầu. Các sản phẩm như tổ yến thô, tổ yến làm sạch, cháo yến và yến chưng được giới thiệu với tinh thần trân trọng, tâm huyết và minh bạch.</p>
                        <p>Mỗi sản phẩm đều hướng đến chất lượng ổn định, nguồn gốc rõ ràng và trải nghiệm mua hàng an tâm cho khách hàng dùng hằng ngày hoặc làm quà biếu.</p>
                    </div>
                </div>
            </section>

            <section className="section sectionTint">
                <div className="container serviceContainerWide">
                    <SectionHeading
                        eyebrow="Sản phẩm"
                        title="Sản phẩm của chúng tôi"
                        align="center"
                    />
                    <div className="grid3 serviceGrid">
                        <article className="serviceCardSimple">
                            <h3>Kinh doanh tổ yến sào</h3>
                            <Image src="https://www.yensaotiensa.com/YQ8.jpg" alt="Kinh doanh tổ yến sào" width={500} height={300} />
                        </article>
                        <article className="serviceCardSimple">
                            <h3>Cung cấp vật tư gỗ nhà yến</h3>
                            <Image src="https://www.yensaotiensa.com/Artboard.jpg" alt="Cung cấp vật tư gỗ nhà yến" width={500} height={300} />
                        </article>
                        <article className="serviceCardSimple">
                            <h3>Tư vấn và thi công nhà yến</h3>
                            <Image src="https://www.yensaotiensa.com/data/news/2009/thi-cong-lap-dat-nha-nuoi-yen-5-tang-tai-eakar-daklak-8.jpg" alt="Tư vấn và thi công nhà yến" width={500} height={300} />
                        </article>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHeading eyebrow="Sản phẩm nổi bật" title="Yến sào cho sức khỏe và quà tặng" description="Các sản phẩm demo được thiết kế để thể hiện hành trình mua hàng đơn giản hơn website hiện tại." />
                    <FeaturedProducts products={products.slice(0, 3)} />
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <SectionHeading eyebrow="Tin tức" title="Câu chuyện và kiến thức yến sào" />
                    <div className="grid3">
                        {news.slice(0, 3).map((article) => <NewsCard key={article.slug} article={article} />)}
                    </div>
                </div>
            </section>
        </>
    );
}
