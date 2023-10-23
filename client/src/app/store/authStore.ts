import { create } from 'zustand'

interface Authstate {
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
  }

export const useAuthStore = create<Authstate>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated}),
}))