import { api } from '@/services/api'
import { createContext, ReactNode, useContext } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { COOKIE_TOKEN } from '@/database/local'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface AuthProps {
  register(data: RegisterData): Promise<void>
  login(data: LoginData): Promise<void>
  logout(): void
  loggedIn: boolean
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData extends LoginData {
  name: string
  password_confirmation: string
}

interface AuthResponse {
  token: string
}

const AuthContext = createContext({} as AuthProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  const Router = useRouter()

  const { data } = useQuery({
    queryKey: ['token'],
    queryFn: fetchUserData,
    refetchInterval: 500
  })

  function fetchUserData(): boolean | null {
    const token = Cookie?.get(COOKIE_TOKEN)

    if (token) {
      return true
    }

    if (Router.pathname.match(/(login|register|test)$/)) return null

    logout()
    return null
  }

  async function logout() {
    try {
      await api.post('/logout')
      Cookie.remove(COOKIE_TOKEN)
      Router.push('/login')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  async function register(data: RegisterData): Promise<void> {
    try {
      const response = await api.post<AuthResponse>('/register', data)
      const token = response.data.token.split('|')[1]

      Cookie.set(COOKIE_TOKEN, token)
      Router.replace('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  async function login(data: LoginData): Promise<void> {
    try {
      const response = await api.post<AuthResponse>('/login', data)
      const token = response.data.token.split('|')[1]

      Cookie.set(COOKIE_TOKEN, token)
      Router.replace('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        loggedIn: !!data
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthProps {
  const context = useContext(AuthContext)

  return context
}
