import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useFormik } from "formik"
import { KeyboardEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { Article, ArticleDTO } from "../shared/data-access/api/models/article"
import { ArticleValidationSchema } from "../shared/data-access/zod-schema"


export const ArticleForm = ({ article, mutationFn }: { article?: Article, mutationFn: (article: { article: ArticleDTO }, slug: string) => Promise<{ article: Article }> }) => {
  const initialValues = {
    title: article?.title ?? "",
    description: article?.description ?? "",
    body: article?.body ?? "",
    tagList: article?.tagList ?? []
  }

  const slug = article?.slug

  const navigate = useNavigate()
  const [tagList, setTagList] = useState<string[]>(article?.tagList || [])
  const [currentTag, setCurrentTag] = useState<string>("")
  const [errors, setErrors] = useState<string[]>([])


  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: toFormikValidationSchema(ArticleValidationSchema),
    onSubmit: () => { }
  })

  const mutationKey = !!article ? ["update_article"] : ["create_article"]

  const mutaion = (article: ArticleDTO) => {
    if (!!article) {
      return mutationFn({ article }, slug!)
    } else {
      return mutationFn({ article }, "")
    }
  }

  const { mutate } = useMutation({
    mutationKey: mutationKey,
    mutationFn: mutaion,
    onSuccess: (data) => {
      navigate(`/article/${data.article.slug}`)
    },
    onError: (error: AxiosError) => {
      const errors = (error.response?.data as any).errors as Record<string, string[]>
      const currentErrors = []
      for (const [field, message] of Object.entries(errors)) {
        currentErrors.push(field + " " + message.join(""))
      }
      setErrors(currentErrors)
    }
  })

  const handleOnSubmit = () => {
    if (!formik.isValid) {
      const currentErrors = []
      for (const [error, value] of Object.entries(formik.errors)) {
        const message = typeof value === "string" ? value : value.join("")
        currentErrors.push(`That ${error} is ${message.toLowerCase()}`)
      }
      setErrors(currentErrors)
    } else {
      setErrors([])
      mutate(formik.values)
    }
  }

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const tag = (e.target as HTMLInputElement).value
      tagList.push(tag)
      setTagList([...tagList])
      formik.setFieldValue("tagList", [...tagList])
      setCurrentTag("")
    }
  }

  const handleOnRemoveTag = (tag: string) => {
    const newTag = [...tagList.filter(currentTag => currentTag !== tag)]
    setTagList(newTag)
    formik.setFieldValue("tagList", newTag)
  }

  return (
    <div className="editor-page" >
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              {
                errors.map((error, index) => <li key={index}>{error}</li>)
              }
            </ul>

            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input name="title" type="text" className="form-control form-control-lg" placeholder="Article Title" onChange={formik.handleChange} value={formik.values.title} />
                </fieldset>
                <fieldset className="form-group">
                  <input name="description" type="text" className="form-control" placeholder="What's this article about?" onChange={formik.handleChange} value={formik.values.description} />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    name="body"
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input type="text" className="form-control" placeholder="Enter tags" value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyUp={handleAddTag}
                  />
                  <div className="tag-list">
                    {
                      tagList.map((tag, index) => (
                        <span key={tag + index} className="tag-default tag-pill"> <i className="ion-close-round" onClick={() => handleOnRemoveTag(tag)}></i> {tag}</span>
                      ))
                    }
                  </div>
                </fieldset>
                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handleOnSubmit}>
                  {!!article ? "Update Article" : "Public Article"}
                </button>
              </fieldset>
            </form>

          </div>
        </div>
      </div>
    </div >
  )
}
