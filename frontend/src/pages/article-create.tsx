
import { ArticleForm } from "../components/article-form"
import { createArticle } from "../services/article.service"


export const ArticleCreateForm = () => {

  return (
    <ArticleForm mutationFn={createArticle} />
  )
}
