import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NavPaciente = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleLogout = () => {
    // Logic to handle logout can be added here
    navigate('/'); // Redirect to the login page or homepage
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/homePaciente">Medirec</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Collapse id="offcanvasNavbar">
            <Nav className="me-auto">
              <Nav.Link href="/homePaciente">Home</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
            </Nav>
            <Button variant="primary" onClick={handleShow}>
              Más opciones
            </Button>
            <Button variant="danger" onClick={handleLogout} className="ms-2">
              Cerrar sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Medirec</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#home">Agendar una cita</Nav.Link>
            <Nav.Link href="#profile">Historial de citas</Nav.Link>
            <Nav.Link href="#action/3.1">Historial de recetas</Nav.Link>
            <Nav.Link href="/farmaciaPaciente">Farmacia</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
