import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { NavPaciente } from './NavPaciente';
import '../../Css/PacienteCss/PharmacyPaciente.css'; // Asegúrate de importar el archivo CSS

export const PharmacyPaciente = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Cambiado a 5

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Calcular el índice de inicio y fin de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <NavPaciente />
      <Container>
        <h1 className="my-4 text-center">Productos de Farmacia</h1>
        <Row>
          {currentProducts.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card className="card-equal-height">
                <Card.Img variant="top" src="https://via.placeholder.com/150" className="card-img" />
                <Card.Body>
                  <Card.Title>{product.pro_nombre}</Card.Title>
                  <Card.Text>{product.pro_descripcion}</Card.Text>
                  <Card.Text className="text-muted">${product.pro_precio}</Card.Text>
                  <div className="button-group">
                    <Button variant="primary" href="#">Más información</Button>
                    <Button variant="success" className="ms-2" onClick={() => addToCart(product)}>Agregar al carrito</Button>
                    <Button variant="danger" className="ms-2" onClick={() => buyNow(product)}>Comprar</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
};

// Funciones de ejemplo para los botones
const addToCart = (product) => {
  console.log('Agregar al carrito:', product);
};

const buyNow = (product) => {
  console.log('Comprar ahora:', product);
};
