import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { ArticlesList } from "../components/articles-list"
import { Banner } from "../components/banner"
import { FeedToggle } from "../components/feed-toggle"
import { Pagination } from "../components/pagination"
import { PopularTag } from "../components/popular-tags"
import { getArticles, getFeeds } from "../services/article.service"
import { GLOBAL_FEED, YOUR_FEED } from "../shared/constants"
import { useAuthStore } from "../shared/data-access/store/auth.store"



const getQueryOptions = (tab: string, currentPage: number) => {
  const offset = (currentPage - 1) * 10
  if (tab === YOUR_FEED) {
    return {
      queryKey: ["articles_feed", tab, currentPage],
      queryFn: () => getFeeds({ offset })
    }
  } else {
    return {
      queryKey: ["articles_global", tab, currentPage],
      queryFn: () => getArticles({ offset })
    }
  }
}

let tabsList: string[] = []

export const Home = () => {
  const { isAuthenticated } = useAuthStore()


  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [tab, setTab] = useState<string>(isAuthenticated ? YOUR_FEED : GLOBAL_FEED)

  const queryOptions = getQueryOptions(tab, currentPage)
  const { isPending, data, isSuccess } = useQuery(queryOptions)

  const totalResults = data?.articlesCount ? data.articlesCount : 0
  useMemo(() => {
    const totalPage = Math.ceil(totalResults / 10)
    setTotal(totalPage)
  }, [totalResults])


  useEffect(() => {
    if (isAuthenticated) {
      tabsList = ["Your Feed", "Global Feed"]
    } else {

      tabsList = ["Global Feed"]
    }
  }, [])

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleOnTabChange = (tab: string) => {
    setTab(tab)
  }
  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle activeTab={tab} onTabChange={handleOnTabChange} tabsList={tabsList} />
            {
              isPending && <div className="article-preview">chargement...</div>
            }
            {
              isSuccess && data.articles.length === 0 && <div className="article-preview"> pas d'article ici ...</div>
            }
            {
              isSuccess && <ArticlesList articles={data.articles} />
            }
            <Pagination totalPage={total} currentPage={currentPage} onPageChange={handleOnPageChange} />
          </div>
          <div className="col-md-3">
            <PopularTag />
          </div>
        </div>
      </div>
    </div>
  )
}
