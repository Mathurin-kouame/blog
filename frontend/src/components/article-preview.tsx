import { useMutation } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { favoriteArticle, unfavoriteArticle } from "../services/article.service"
import { Article } from "../shared/data-access/api/models/article"
import { TagList } from "./tag-list"
import dayjs from "dayjs"

interface ArticleProps {
  article: Article
}

export const ArticlePreview = ({ article }: ArticleProps) => {
  const { mutate: favorite } = useMutation({
    mutationKey: ["favorited"], mutationFn: favoriteArticle, onSuccess: (data) => handleOnSuccess(data)
  })
  const { mutate: unfavorite } = useMutation({
    mutationKey: ["unfavorite"], mutationFn: unfavoriteArticle, onSuccess: (data) => handleOnSuccess(data)
  })

  const handleOnSuccess = (data: { article: Article }) => {
    article.favorited = data.article.favorited;
    article.favoritesCount = data.article.favoritesCount
  }

  const handleOnClick = () => {
    if (!article.favorited) {
      favorite(article.slug)
    } else {
      unfavorite(article.slug)
    }
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={article.author.username}><img src={article.author.image} /></a>
        <div className="info">
          <Link reloadDocument to={`/profile/${article.author.username}`} className="author">{article.author.username}</Link>
          <span className="date">{dayjs(article.createdAt).format('MMMM D, YYYY')}</span>
        </div>
        <button onClick={handleOnClick} className={`btn ${article.favorited ? "btn-primary" : "btn-outline-primary"} btn-sm pull-xs-right`}>
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <a href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tagList={article.tagList} />
      </a>
    </div>
  )
}
