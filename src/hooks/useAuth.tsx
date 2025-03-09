import { createContext, ReactNode, useContext } from 'react'

interface AuthProps {
  register(): void
  login(): void
}

const AuthContext = createContext({} as AuthProps)

export function AuthProvider({ children }: { children: ReactNode }) {
  function register() {}

  function login() {}

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
