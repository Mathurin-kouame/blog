import { conduitApi } from "../shared/data-access/api";
import { Comment, CommentDTO } from "../shared/data-access/api/models/comment";


export const getComments = async (slug: string): Promise<{ comments: Comment[] }> => {
  const response = await conduitApi.get(`/articles/${slug}/comments`);
  return response.data
}

export const createComment = async (slug: string, comment: { comment: CommentDTO }): Promise<{ comment: Comment }> => {
  const response = await conduitApi.post(`/articles/${slug}/comments`, comment)
  return response.data
}

export const deleteComment = async (slug: string, id: number): Promise<{ comment: Comment }> => {
  const response = await conduitApi.delete(`/articles/${slug}/comments/${id}`)
  return response.data
}

