import { useQuery } from "@tanstack/react-query"
import { getTags } from "../services/tag.service"

export const PopularTag = () => {

  const { isPending, data } = useQuery({ queryKey: ["popular-tags"], queryFn: getTags })

  if (isPending) return <div>Loading...</div>

  console.log(data)

  return (

    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {
          data?.tags.map(tag => (
            <a key={tag} className="tag-pill tag-default">{tag}</a>
          ))
        }
      </div>
    </div>
  )
}
