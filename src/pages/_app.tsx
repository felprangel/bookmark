import { AuthProvider } from '@/hooks/useAuth'
import { GlobalStyle } from '@/styles/globals'
import '@/styles/globals.ts'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bookmark</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <GlobalStyle />
    </>
  )
}
