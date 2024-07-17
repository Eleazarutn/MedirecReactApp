import React from "react";
import { Col, Card } from "react-bootstrap";

export const IndividualDoctorCard = ({ nombre , universidad , especialidad , cedula }) => {
  return (
    <>
      <Col md={4} className="mb-4">
        <Card>
          <Card.Img variant="top" src="https://via.placeholder.com/300" />
          <Card.Body className="text-center">
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>Escuela:  {universidad}</Card.Text>
            <Card.Text>Especialidad: {especialidad}</Card.Text>
            <Card.Text>Cédula Profesional: {cedula}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </> 
  );
};
