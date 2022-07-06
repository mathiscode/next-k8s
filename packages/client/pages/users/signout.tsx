import type { NextPage } from 'next'

import Router from 'next/router'
import { useContext, useEffect } from 'react'

import Container from 'react-bootstrap/Container'

import RootContext from '../../context/root'
import useRequest, { UseRequestHook } from '../../hooks/use-request'

const AuthSignout: NextPage = () => {
  const { setContext } = useContext(RootContext)

  const { doRequest }: UseRequestHook = useRequest({
    url: '/api/users/signout',
    onSuccess: () => {
      setContext((ctx: RootContext) => ({ ...ctx, user: null }))
      Router.push('/')
    }
  })

  useEffect(() => { doRequest() }, []) // eslint-disable-line

  return (
    <Container>
      <h1>Signing you out, one moment...</h1>
    </Container>
  )
}

export default AuthSignout
