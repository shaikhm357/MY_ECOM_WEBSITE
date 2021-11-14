import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='#home'>Ecom</Navbar.Brand>
          <Nav className='ml-auto'>
            <Nav.Link href='/cart'>
              <i class='fas fa-shopping-cart'></i> Cart
            </Nav.Link>
            <Nav.Link href='/login'>
              <i class='fas fa-user'></i> Sign In
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
