import { create } from 'zustand'
import { User } from '@/api/types'

interface Authstate {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuthStore = create<Authstate>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) => set({ user }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated}),
}))