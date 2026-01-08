import { conduitApi } from "../shared/data-access/api";
import { Profile, UpdateUserDTO, User } from "../shared/data-access/api/models/user";

export const getUser = async (): Promise<{ user: User }> => {
  const response = await conduitApi.get("/user");
  return response.data
}

export const updateUser = async (user: { user: UpdateUserDTO }): Promise<{ user: User }> => {
  console.log(user)
  const response = await conduitApi.put("/user", user);
  return response.data
}

export const getProfile = async (username: string): Promise<{ profile: Profile }> => {
  const response = await conduitApi.get(`/profiles/${username}`);
  return response.data
}

export const followProfile = async (username: string): Promise<{ profile: User }> => {
  const response = await conduitApi.post(`/profiles/${username}/follow`);
  return response.data
}

export const unfollowProfile = async (username: string): Promise<{ profile: User }> => {
  const response = await conduitApi.delete(`/profiles/${username}/follow`);
  return response.data
}

