import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import { NavPaciente } from './NavPaciente';
import { jsPDF } from "jspdf";
import '../../Css/PacienteCss/PharmacyPaciente.css'; // Asegúrate de importar el archivo CSS
import { FaShoppingCart } from 'react-icons/fa'; // Icono de carrito de compras

export const PharmacyPaciente = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Estado para el modal de confirmación
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para el modal de éxito
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const addToCart = (product) => {
    setCart([...cart, product]);
    toast.success(`${product.pro_nombre} ha sido agregado al carrito`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(product => product.id_producto !== productId);
    setCart(updatedCart);
    toast.error(`El producto ha sido eliminado del carrito`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const viewCart = () => {
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirmPurchase = () => {
    setShowConfirmModal(true);
    setShowModal(false);
  };

  const handleSuccessPurchase = () => {
    generatePDF();
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.text("Resumen de Compra", 10, y);
    y += 10;

    cart.forEach((product, index) => {
      doc.text(`Producto ${index + 1}:`, 10, y);
      y += 10;
      doc.text(`Nombre: ${product.pro_nombre}`, 10, y);
      y += 10;
      doc.text(`Descripción: ${product.pro_descripcion}`, 10, y);
      y += 10;
      doc.text(`Precio: $${product.pro_precio}`, 10, y);
      y += 10;
    });

    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <>
      <NavPaciente />
      <Container>
        <h1 className="my-4 text-center">Productos de Farmacia</h1>
        <Button variant="outline-info" className="mb-4" onClick={viewCart}>
          <FaShoppingCart /> Ver Carrito
        </Button>
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
        <ToastContainer />

        {/* Modal del carrito de compras */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Carrito de Compras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <div key={index} className="cart-item">
                  <h5>{product.pro_nombre}</h5>
                  <p>{product.pro_descripcion}</p>
                  <p className="text-muted">${product.pro_precio}</p>
                  <Button variant="danger" onClick={() => removeFromCart(product.id_producto)}>Eliminar</Button>
                  <hr />
                </div>
              ))
            ) : (
              <p>El carrito está vacío.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleConfirmPurchase}>
              Finalizar Compra
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de confirmación de compra */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Compra</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro de que deseas finalizar la compra?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSuccessPurchase}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de éxito */}
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Compra Realizada</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¡Compra realizada con éxito!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

// Funciones de ejemplo para los botones
const buyNow = (product) => {
  console.log('Comprar ahora:', product);
};
