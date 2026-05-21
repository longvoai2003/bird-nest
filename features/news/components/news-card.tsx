import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/server/content/news";

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link className="newsCard" href={`/news/${article.slug}`}>
      <article className="newsCardInner">
        <Image src={article.image} alt={article.title} width={300} height={300} />
        <div className="newsCardBody">
          <span>{article.category}</span>
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <strong>Read more</strong>
        </div>
      </article>
    </Link>
  );
}
