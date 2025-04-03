import { AuthProvider } from '@/hooks/useAuth'
import { GlobalStyle } from '@/styles/globals'
import '@/styles/globals.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Bookmark</title>
        </Head>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <GlobalStyle />
        <Toaster />
      </QueryClientProvider>
    </>
  )
}
