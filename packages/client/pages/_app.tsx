import type { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import type { User } from '../types/user'

import Head from 'next/head'
import { useState } from 'react'

import '../styles/globals.scss'
import RootContext from '../context/root'
import ApiClient from '../api/client'
import Header from '../components/Header/Header'

interface AppComponentProps extends AppProps {
  user: User;
}

interface AppContext {
  Component: NextComponentType;
  ctx: NextPageContext;
}

function AppComponent({ Component, pageProps, user }: AppComponentProps) {
  const [context, setContext] = useState({ user })

  return (
    <RootContext.Provider value={{ ...context, setContext }}>
      <Head>
        <title>Next.K8S Boilerplate</title>
        <meta name='description' content='Kubernetes + NextJS Boilerplate Application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Component {...pageProps} />
    </RootContext.Provider>
  )
}

AppComponent.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = Component.getInitialProps?.(ctx) || {}
  const api = new ApiClient({ req: ctx.req })
  try {
    const { user } = await api.request('/users/current')
    return { pageProps, user }
  } catch {
    return { pageProps }
  }
}

export default AppComponent
