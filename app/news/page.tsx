import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { news } from "@/data/news";

export default function NewsPage() {
  return (
    <section className="section">
      <div className="container newsContainer">
        <SectionHeading eyebrow="Tin tức" title="Kỹ Thuật Nhà Yến" description="Các bài viết kỹ thuật được lấy từ nhóm tin tức nhà yến trên website gốc, trình bày ngắn gọn để người xem dễ quét nội dung." />
        <div className="newsGridCompact">
          {news.map((article) => <NewsCard key={article.slug} article={article} />)}
        </div>
      </div>
    </section>
  );
}
