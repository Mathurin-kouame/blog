import { Article } from "../shared/data-access/api/models/article";
import { ArticlePreview } from "./article-preview";

interface ArticlesListProps {
  articles: Article[];
}

export const ArticlesList = ({ articles }: ArticlesListProps) => {

  return (
    <>
      {
        articles.map(article => <ArticlePreview key={article.slug} article={article} />)
      }
    </>
  )
}
