import Link from 'next/link'
import { useContext } from 'react'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import RootContext from '../../context/root'

const Header = () => {
  const { user } = useContext(RootContext)

  return (
    <Navbar sticky='top' bg='dark' variant='dark' expand='lg'>
      <Container fluid>
        <Link href='/' passHref><Navbar.Brand>Next.K8S Boilerplate</Navbar.Brand></Link>

        <Navbar.Toggle aria-controls='top-nav' />
        <Navbar.Collapse id='top-nav'>
          <Nav fill className='ms-auto'>
            {
              !user &&
                <>
                  <Link href='/users/signin' passHref><Nav.Link>Sign In</Nav.Link></Link>
                  <Link href='/users/signup' passHref><Nav.Link>Sign Up</Nav.Link></Link>
                </>
            }

            {
              user &&
                <>
                  <Link href='/users/signout' passHref><Nav.Link>Sign Out</Nav.Link></Link>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
