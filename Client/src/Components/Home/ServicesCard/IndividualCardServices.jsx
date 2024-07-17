import React from "react";
import { Col, Card, Button } from "react-bootstrap";

export const IndividualCardServices = ({ imgSrc, title }) => {
  return (
    <Col xs={12} md={6} lg={3} className="mb-4">
      <Card style={{ width: "100%", height: "100%" }}>
        <Card.Img
          variant="top"
          src={imgSrc}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Descripción del servicio que ofrecemos. Puedes agregar detalles aquí
            sobre lo que incluye o características clave.
          </Card.Text>
          <Button variant="primary">Informes</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};


