import { notFound } from "next/navigation";
import Image from "next/image";
import { news } from "@/server/content/news";

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = news.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="section articlePage">
      <div className="container articleContainer">
        <p className="eyebrow">{article.category}</p>
        <h1>{article.title}</h1>
        <p className="articleDate">{article.date}</p>
        <Image src={article.image} alt={article.title} width={900} height={520} />
        {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </article>
  );
}
