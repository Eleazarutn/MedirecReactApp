import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { NavPaciente } from './NavPaciente';

export const PharmacyPaciente = () => {
  // Placeholder array to be replaced by fetched data
  const products = [
    { nombre: 'Ibuprofeno jarabe', descripcion: 'Tomado - Paracetamol', precio: 10 },
    { nombre: 'Paracetamol 500 mg', descripcion: 'Untable - Crema de hidrocortisona', precio: 5 },
    { nombre: 'Hidrocortisona crema', descripcion: 'Bebible - Jarabe para la tos con dextrometorfano', precio: 8 },
    { nombre: 'Dextrometorfano jarabe', descripcion: 'Tomado - Omeprazol', precio: 12 },
    { nombre: 'Omeprazol 20 mg', descripcion: 'Untable - Pomada de diclofenaco', precio: 7 },
  ];

  return (
    <>
      <NavPaciente />
      <Container>
        <h1 className="my-4 text-center">Productos de Farmacia</h1>
        <Row>
          {products.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{product.nombre}</Card.Title>
                  <Card.Text>{product.descripcion}</Card.Text>
                  <Card.Text className="text-muted">${product.precio}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};


