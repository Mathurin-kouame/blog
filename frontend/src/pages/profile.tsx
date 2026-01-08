import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { ArticlesList } from "../components/articles-list"
import { FeedToggle } from "../components/feed-toggle"
import { Pagination } from "../components/pagination"
import { ProfilePreview } from "../components/profile-preview"
import { getArticles } from "../services/article.service"
import { getProfile } from "../services/user.service"
import { useAuthStore } from "../shared/data-access/store/auth.store"



const getQueryOptions = (tab: string, currentPage: number, username: string) => {
  const offset = (currentPage - 1) * 10
  if (tab === `${username}'s Articles`) {
    return {
      queryKey: [`${username}'s_articles`, tab, currentPage, username],
      queryFn: () => getArticles({ offset, author: username }),
      gcTime: 0
    }
  } else {
    return {
      queryKey: ["favorited_articles", tab, currentPage, username],
      queryFn: () => getArticles({ offset, favorited: username }),
      gcTime: 0
    }
  }
}

export const Profile = () => {
  const { username } = useParams()
  const { user } = useAuthStore();
  const [tab, setTab] = useState<string>(`${username}'s Articles`)
  const [total, setTotal] = useState<number>(0)

  const [currentPage, setCurrentPage] = useState<number>(1)

  console.log(tab)

  const { isPending: isPendingProfile, data: dataProfile } = useQuery({
    queryKey: ["profile", username], queryFn: () => getProfile(username!), gcTime: 0
  })
  const { isPending: isPendingArticles, data: dataArticles, isSuccess: isSuccessArticles } = useQuery(getQueryOptions(tab, currentPage, username!))

  const isPending = isPendingProfile && isPendingArticles



  const isOwner = dataProfile?.profile.username === user?.username

  const tabsList = [
    `${username}'s Articles`,
    "Favorited Articles"
  ]
  const handleOnTabChange = (tab: string) => {
    setTab(tab)
  }

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page)
  }


  const totalResults = dataArticles?.articlesCount ? dataArticles.articlesCount : 0
  useMemo(() => {
    const totalPage = Math.ceil(totalResults / 10)
    setTotal(totalPage)
  }, [totalResults])


  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div className="profile-page">
      {isPendingProfile ? <div>Loading...</div> : <ProfilePreview profile={dataProfile?.profile!} isOwner={isOwner} />}
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <FeedToggle activeTab={tab} tabsList={tabsList} onTabChange={handleOnTabChange} />

            {
              isPendingArticles && <div className="article-preview">Loading...</div>
            }
            {
              isSuccessArticles && dataArticles.articles.length === 0 && <div className="article-preview"> No articles here... yet</div>
            }
            {
              isSuccessArticles && <ArticlesList articles={dataArticles.articles} />
            }
            <Pagination totalPage={total} currentPage={currentPage} onPageChange={handleOnPageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
