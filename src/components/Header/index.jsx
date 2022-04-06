import React from 'react'
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap'
import bellIcon from '../../assets/img/header/bellIcon.gif'
import './style.scss'

function Header(props) {
  return (
    <>
      <Navbar className='header'>
        <Container fluid>
          <Navbar.Brand href='#home'>Digital Assistant</Navbar.Brand>
          <Nav className='me-auto header-left'>
            <Nav.Link href='#home'>Your Work</Nav.Link>
            <Nav.Link href='#features'>Project</Nav.Link>
          </Nav>

          <div className='header-right'>
            <div className='header-right-layout'>
              <img src={bellIcon} alt='' className='header-right-notification' />
              <div className='header-right-avatar'>
                <img
                  src='https://scontent.fvca2-1.fna.fbcdn.net/v/t1.6435-9/122996507_1061890174233466_3993675915816208415_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=SUslG17ETbUAX-vznsw&_nc_ht=scontent.fvca2-1.fna&oh=00_AT8tC80j5qTbRXiB3s2phFc53x8YutJPxV7YALN_SSGqzg&oe=6272B728'
                  alt=''
                  className='header-right-avatar-img'
                />
                <div className='header-right-avatar-info'>
                  <div className='header-right-avatar-info-name'>
                    <p>Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
