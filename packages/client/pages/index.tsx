import type { NextPage } from 'next'

import { useContext } from 'react'

import Container from 'react-bootstrap/Container'

import RootContext from '../context/root'

const Home: NextPage = () => {
  const { user } = useContext(RootContext)

  return (
    <Container>
      <main>
        <h1>K8S Ticketing</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </Container>
  )
}

export default Home
