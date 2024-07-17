import React from "react";
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import Logo from "../../assets/HomeImages/logo.jpg";
import { useLocation } from "react-router-dom";

const IndexButtons = () => {
  const Location = useLocation();

  return (
    Location.pathname == "/" && (
      <>
        <Button variant="outline-primary" className="me-2" href="/login">
          Login
        </Button>
        <Button variant="primary" href="/register" >Registro</Button>
      </>
    )
  );
};

const ForgotButtons = () => {
  const Location = useLocation();

  return (
    Location.pathname == "/forgotPassword" && (
      <>
        <Button variant="outline-primary" className="me-2" href="/login">
          Login
        </Button>
        <Button variant="primary" href="/register" >Registro</Button>
      </>
    )
  );
};

export const NavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom sticky-top">
        <Container>
          <Navbar.Brand href="/">
            <Image src={Logo} height="50" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            <Nav className="mx-auto">
              <Nav.Link href="#services">Servicios</Nav.Link>
              <Nav.Link href="#pharmacy">Farmacia</Nav.Link>
              <Nav.Link href="#solutions">Soluciones</Nav.Link>
              <Nav.Link href="#schedule">¿Como agendar?</Nav.Link>
              <Nav.Link href="#medicalEquipment">Equipo médico</Nav.Link>
            </Nav>
            <div className="d-flex">
              <IndexButtons />
              <ForgotButtons />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
