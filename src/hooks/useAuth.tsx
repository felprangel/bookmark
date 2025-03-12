import { api } from '@/services/api'
import { createContext, ReactNode, useContext } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { COOKIE_TOKEN } from '@/database/local'

interface AuthProps {
  register(data: RegisterData): Promise<void>
  login(data: LoginData): Promise<void>
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

  async function register(data: RegisterData): Promise<void> {
    const response = await api.post<AuthResponse>('/register', data)
    const token = response.data.token.split('|')[1]

    Cookie.set(COOKIE_TOKEN, token)
    Router.replace('/')
  }

  async function login(data: LoginData): Promise<void> {
    const response = await api.post<AuthResponse>('/login', data)
    const token = response.data.token.split('|')[1]

    Cookie.set(COOKIE_TOKEN, token)
    Router.replace('/')
  }

  return (
    <AuthContext.Provider
      value={{
        register,
        login
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
