import { useMutation } from "@tanstack/react-query"
import { Field, Form, Formik } from "formik"
import { createComment } from "../services/comment.service"
import { Comment, CommentDTO } from "../shared/data-access/api/models/comment"
import { useAuthStore } from "../shared/data-access/store/auth.store"

interface CommentFormProps {
  slug: string;
  addComment: (comment: Comment) => void
}
const initialValues: CommentDTO = {
  body: ""
}

export const CommentForm = ({ addComment, slug }: CommentFormProps) => {
  const { user } = useAuthStore()

  const mutation = useMutation({
    mutationKey: ["create_comment", slug],
    mutationFn: (comment: CommentDTO) => createComment(slug, { comment }),
    onSuccess: (data) => {
      addComment(data.comment)
    }
  })

  console.log(user)
  if (!user) {
    return (

      <p><a href="/login">Sign in</a> or <a href="/register">sign up</a> to add comments on this article</p>
    )
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(comment: CommentDTO, { resetForm }) => {
        mutation.mutate(comment, {
          onSuccess: () => {
            resetForm()
          }
        })
      }}
    >
      <Form className="card comment-form">
        <div className="card-block">
          <Field as="textarea" className="form-control" placeholder="Write a comment..." rows={3} name="body" />
        </div>
        <div className="card-footer">
          <img src={user?.image} className="comment-author-img" />
          <button className="btn btn-sm btn-primary" type="submit">Post Comment</button>
        </div>
      </Form>
    </Formik >
  )
}
