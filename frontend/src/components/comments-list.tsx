import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { deleteComment } from "../services/comment.service";
import { Comment } from "../shared/data-access/api/models/comment";
import dayjs from "dayjs";

interface CommentListProps {
  slug: string;
  comments: Comment[];
  removeComment: (id: number) => void
}


export const CommentsList = ({ slug, comments, removeComment }: CommentListProps) => {

  const mutation = useMutation({
    mutationKey: ["remove_comment", slug], mutationFn: (id: number) => deleteComment(slug, id)
  })

  return (
    comments.map((comment) => (
      <div className="card" key={comment.id}>
        <div className="card-block">
          <p className="card-text">
            {comment.body}
          </p>
        </div>
        <div className="card-footer">
          <a href={`/profile/${comment.author.username}`} className="comment-author">
            <img src={comment.author.image} className="comment-author-img" />
          </a>
          &nbsp; &nbsp;
          <Link reloadDocument to={`/profile/${comment.author.username}`} className="comment-author">{comment.author.username}</Link>
          <span className="date-posted">{dayjs(comment.createdAt).format("MMMM D, YYYY")}</span>
          <span style={{ float: "right", color: "#333", fontSize: "1rem" }}>
            <i className="ion-trash-a" style={{ opacity: "0.6", cursor: "pointer" }} onClick={() => mutation.mutate(comment.id, {
              onSuccess: () => {
                removeComment(comment.id)
              }
            })} />
          </span>
        </div>
      </div>
    ))
  )
}
