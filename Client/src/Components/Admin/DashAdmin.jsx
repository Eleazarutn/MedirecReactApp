import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

export const DashAdmin = () => {
  return (
    <Container>
      <h1 className="my-4 text-center">Dashboard del Administrador</h1>
      <Row>
        <Col sm={12} md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Usuarios" alt="Usuarios" />
            <Card.Body>
              <Card.Title>Usuarios / Pacientes</Card.Title>
              <Card.Text>
                Gestiona los usuarios y pacientes registrados en el sistema. Consulta y modifica la información según sea necesario.
              </Card.Text>
              <Card.Link href="#usuarios">De click para más opciones</Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Doctores" alt="Doctores" />
            <Card.Body>
              <Card.Title>Doctores</Card.Title>
              <Card.Text>
                Administra la información de los doctores. Revisa sus especialidades, horarios y demás detalles importantes.
              </Card.Text>
              <Card.Link href="#doctores">De click para más opciones</Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Productos" alt="Productos" />
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <Card.Text>
                Gestiona el inventario de productos. Agrega, edita o elimina productos según las necesidades del sistema.
              </Card.Text>
              <Card.Link href="#productos">De click para más opciones</Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src="https://via.placeholder.com/150?text=Consultas" alt="Consultas" />
            <Card.Body>
              <Card.Title>Consultas</Card.Title>
              <Card.Text>
                Revisa y gestiona las consultas realizadas en el sistema. Administra los registros y realiza un seguimiento adecuado.
              </Card.Text>
              <Card.Link href="#consultas">De click para más opciones</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
