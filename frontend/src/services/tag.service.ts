import { conduitApi } from "../shared/data-access/api"
import { TagDTO } from "../shared/data-access/api/models/tag"

export const getTags = async (): Promise<TagDTO> => {
  const response = await conduitApi.get("/tags")
  return response.data

}
