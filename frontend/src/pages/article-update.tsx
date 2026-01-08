
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getArticle, updateArticle } from "../services/article.service"
import { ArticleForm } from "../components/article-form"

export const ArticleUpdateForm = () => {
  const { slug } = useParams()
  const { isPending, data } = useQuery({ queryKey: ["get_single_article", slug], queryFn: () => getArticle(slug!), gcTime: 0 })

  if (isPending) {
    return <div>chargement...</div>
  }

  return (
    <ArticleForm
      article={data?.article}
      mutationFn={updateArticle} />
  )
}
