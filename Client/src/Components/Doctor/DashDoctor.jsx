import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
export const DashDoctor = () => {
  
  return (
    <Container>
      <h1 className="my-4 text-center">Dashboard del Médico</h1>
      <Row>
        <Col sm={12} md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Citas"
              alt="Citas"
            />
            <Card.Body>
              <Card.Title>Citas médicas asignadas</Card.Title>
              <Card.Text>
                Gestiona las citas del días y has operaciones con ella como
                aceptar, reagendar o cancelar la cita segun la situación
              </Card.Text>
              <Card.Link href="#usuarios">De click para más opciones</Card.Link>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150?text=Catalogo"
              alt="Catalogo"
            />
            <Card.Body>
              <Card.Title>Catalogo de médicamentos</Card.Title>
              <Card.Text>
                Ingresa al catalogo de médicamentos para poder asignarlos a una
                receta médica
              </Card.Text>
              <Card.Link href="#doctores">De click para más opciones</Card.Link>
            </Card.Body>
          </Card>
        </Col>

        
      </Row>
    </Container>
  );
};
