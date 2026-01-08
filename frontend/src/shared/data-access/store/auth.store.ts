import { create } from "zustand";
import { CONDUIT_TOKEN, CONDUIT_USER } from "../../constants";
import { User } from "../api/models/user";

interface AuthState {
  user: User | undefined;
  isAuthenticated: boolean;
  setAuthState: (user: User | undefined, isAuthenticated: boolean) => void,
  setUser: (user: User) => void
}

const token = localStorage.getItem(CONDUIT_TOKEN)
const userFromLocalStorage = localStorage.getItem(CONDUIT_USER)
const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : undefined

export const useAuthStore = create<AuthState>((set) => ({
  user: user,
  isAuthenticated: !!token,
  setAuthState: (user: User | undefined, isAuthenticated: boolean) => set(() => {
    console.log(user)
    if (user) {
      localStorage.setItem(CONDUIT_TOKEN, user.token)
      localStorage.setItem(CONDUIT_USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(CONDUIT_TOKEN)
      localStorage.removeItem(CONDUIT_USER)
    }
    return { user, isAuthenticated }
  }),
  setUser: (user: User) => set(() => {
    localStorage.setItem(CONDUIT_USER, JSON.stringify(user))
    return { user }
  })
}))
