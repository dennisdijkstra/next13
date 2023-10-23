import { create } from 'zustand'

interface Authstate {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
  }

export const useAuthStore = create<Authstate>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false })
}))