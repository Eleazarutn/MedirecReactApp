import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NavAdmin = () => {
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
            <Nav className="me-auto">
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
            <NavDropdown title="Doctores" id="offcanvasNavbarDropdownDoctors">
              <NavDropdown.Item href="/doctorsTableAdmin">Tabla doctores</NavDropdown.Item>
              <NavDropdown.Item href="#add-doctor">Informe Doctores</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Usuarios / Pacientes" id="offcanvasNavbarDropdownUsers">
              <NavDropdown.Item href="/usersTableAdmin">Tabla usuarios</NavDropdown.Item>
              <NavDropdown.Item href="#add-user">Informe usuarios</NavDropdown.Item>
              <NavDropdown.Item href="#edit-user">Editar Usuario</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Productos" id="offcanvasNavbarDropdownProducts">
              <NavDropdown.Item href="#view-products">Ver Productos</NavDropdown.Item>
              <NavDropdown.Item href="#add-product">Inventario</NavDropdown.Item>
              <NavDropdown.Item href="#edit-product">Informe productos stock</NavDropdown.Item>
              <NavDropdown.Item href="#edit-product">Informe productos ventas</NavDropdown.Item>
            </NavDropdown>





            <NavDropdown title="Citas" id="offcanvasNavbarDropdownAppointments">
              <NavDropdown.Item href="#view-appointments">Informe citas</NavDropdown.Item>
              <NavDropdown.Item href="#schedule-appointment">Informe citas ventas</NavDropdown.Item>              
            </NavDropdown>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavAdmin;
