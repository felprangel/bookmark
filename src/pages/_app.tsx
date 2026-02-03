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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
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
