import { conduitApi } from "../shared/data-access/api"
import { User, UserLoginDTO, UserRegisterDTO } from "../shared/data-access/api/models/user"


export const login = async (user: { user: UserLoginDTO }): Promise<{ user: User }> => {
  const response = await conduitApi.post("/users/login", user)
  return response.data
}

export const register = async (user: { user: UserRegisterDTO }): Promise<{ user: User }> => {
  const response = await conduitApi.post("/users", user)
  return response.data
}
