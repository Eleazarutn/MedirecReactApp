import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const NavDoctorScreen = () => {

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
          <Navbar.Brand href="/homeAdmin">Medirec</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
          <Navbar.Collapse id="offcanvasNavbar">
            <Nav className="me-auto"></Nav>
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
            <NavDropdown title="Citas" id="offcanvasNavbarDropdownDoctors">
              <NavDropdown.Item href="/tableCitasDoctor">
                Citas asignadas
              </NavDropdown.Item>
            </NavDropdown>

          
            <NavDropdown title="Productos" id="offcanvasNavbarDropdownProducts">
              <NavDropdown.Item href="">
                Catalogo de productos
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
