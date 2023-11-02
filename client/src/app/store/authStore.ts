import { create } from 'zustand'
import { User } from '@/api/types'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) => set({ user }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated}),
}))