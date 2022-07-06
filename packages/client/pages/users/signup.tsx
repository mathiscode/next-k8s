import type { NextPage } from 'next'
import type { ChangeEvent, MouseEvent } from 'react'
import type { User } from '../../types/user'

import { useContext, useEffect, useState } from 'react'
import Router from 'next/router'

import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import RootContext from '../../context/root'
import useRequest, { UseRequestHook } from '../../hooks/use-request'

const AuthSignup: NextPage = () => {
  const { user, setContext } = useContext(RootContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { doRequest, errors }: UseRequestHook = useRequest({
    url: '/api/users/signup',
    method: 'POST',
    body: { email, password },
    onSuccess: ({ user }: { user: User }) => {
      setContext((ctx: RootContext) => ({ ...ctx, user }))
      Router.push('/')
    }
  })

  const signup = async (e: MouseEvent) => {
    e.preventDefault()
    if (email === '' || password === '') return
    setLoading(true)
    await doRequest()
    setLoading(false)
  }

  useEffect(() => {
    if (user) Router.push('/')
  }, [user])

  return (
    <Container>
      <h1>Signup</h1>
      <Form>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder='Enter your email address' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder='Enter your password' />
        </Form.Group>

        {errors.map((err: any, index: number) => <Alert key={index} variant='danger'>{err.message}</Alert>)}

        <Button variant='primary' disabled={loading} onClick={e => signup(e)}>Signup</Button>
      </Form>
    </Container>
  )
}

export default AuthSignup
