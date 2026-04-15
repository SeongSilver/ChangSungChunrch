import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 단일 관리자 계정
const CREDENTIALS = {
  username: 'admin',
  password: 'church1234',
}

interface AuthStore {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        if (
          username === CREDENTIALS.username &&
          password === CREDENTIALS.password
        ) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: 'church-auth' }
  )
)
