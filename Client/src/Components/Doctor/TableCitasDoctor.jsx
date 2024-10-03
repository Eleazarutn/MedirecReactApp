import React, { useEffect, useState } from "react";
import { NavDoctorScreen } from "./NavDoctorScreen";
import { Table, Button, Container, Modal, Card, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import { PDFDocument, rgb } from "pdf-lib";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TableCitasDoctor = () => {
  const [citas, setCitas] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showAddedProductsModal, setShowAddedProductsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCita, setEditCita] = useState({
    fecha: "",
    hora: "",
    doctor: "",
    paciente: "",
  });

  const fetchCitas = async () => {
    try {
      const response = await fetch("http://localhost:3001/getCitas");
      if (response.ok) {
        const data = await response.json();
        setCitas(data.citas);
      } else {
        console.error("Error fetching citas");
      }
    } catch (error) {
      console.error("Error fetching citas", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/getProducts");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleShowModal = (cita) => {
    setSelectedCita(cita);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCita(null);
  };

  const handleShowRecipeModal = () => {
    setShowRecipeModal(true);
  };

  const handleCloseRecipeModal = () => {
    setShowRecipeModal(false);
    generatePDF();
  };

  const handleShowAddedProductsModal = () => {
    setShowAddedProductsModal(true);
  };

  const handleCloseAddedProductsModal = () => {
    setShowAddedProductsModal(false);
  };

  const handleShowDeleteModal = (cita) => {
    setSelectedCita(cita);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCita(null);
  };

  const handleShowEditModal = (cita) => {
    setSelectedCita(cita);
    setEditCita({
      fecha: cita.cit_fecha,
      hora: cita.cit_hora,
      doctor: cita.doc_nombre,
      paciente: cita.usa_nombre,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedCita(null);
  };

  const handleEditCitaChange = (e) => {
    const { name, value } = e.target;
    setEditCita((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEditCita = async () => {
    try {
      const response = await fetch(`http://localhost:3001/updateCita/${selectedCita.id_cita}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCita),
      });

      if (response.ok) {
        fetchCitas();
        toast.success("Cita actualizada con éxito", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleCloseEditModal();
      } else {
        console.error("Error updating cita");
      }
    } catch (error) {
      console.error("Error updating cita", error);
    }
  };

  const handleDeleteCita = async () => {
    try {
      const response = await fetch(`http://localhost:3001/deleteCita/${selectedCita.id_cita}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCitas();
        toast.success("Cita eliminada con éxito", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleCloseDeleteModal();
      } else {
        console.error("Error deleting cita");
      }
    } catch (error) {
      console.error("Error deleting cita", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    fetchCitas();
    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.pro_nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
    toast.success(`${product.pro_nombre} ha sido agregado a la receta médica`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== productId)
    );
    toast.error(`El producto ha sido eliminado de la receta médica`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const fontSize = 12;

    page.drawText("Receta Médica", {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0),
    });

    if (selectedCita) {
      page.drawText(
        `Paciente: ${selectedCita.usa_nombre} ${selectedCita.usa_apellidos}`,
        { x: 50, y: height - 80, size: fontSize }
      );
      page.drawText(`Edad: ${selectedCita.usa_edad}`, {
        x: 50,
        y: height - 100,
        size: fontSize,
      });
      page.drawText(`Fecha de la Cita: ${formatDate(selectedCita.cit_fecha)}`, {
        x: 50,
        y: height - 120,
        size: fontSize,
      });
      page.drawText(`Hora de la Cita: ${selectedCita.cit_hora}:00`, {
        x: 50,
        y: height - 140,
        size: fontSize,
      });
    }

    let y = height - 180;
    page.drawText("Medicamentos:", { x: 50, y, size: fontSize });

    y -= 20;
    selectedProducts.forEach((product) => {
      page.drawText(
        `- ${product.pro_nombre}: ${product.pro_descripcion} (Precio: $${product.pro_precio})`,
        { x: 70, y, size: fontSize }
      );
      y -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <>
      <NavDoctorScreen />

      <Container>
        <h1 className="my-4 text-center">Citas asignadas</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Doctor</th>
              <th>Paciente</th>
              <th>Edad</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id_cita}>
                <td>{cita.id_cita}</td>
                <td>{formatDate(cita.cit_fecha)}</td>
                <td>{`${cita.cit_hora}:00`}</td>
                <td>{cita.doc_nombre}</td>
                <td>{`${cita.usa_nombre} ${cita.usa_apellidos}`}</td>
                <td>{cita.usa_edad}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleShowModal(cita)}
                    className="me-2"
                  >
                    <FaFilePdf />
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleShowEditModal(cita)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleShowDeleteModal(cita)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Modal para confirmar el borrado */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta cita?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteCita}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar una cita */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={editCita.fecha}
                onChange={handleEditCitaChange}
              />
            </Form.Group>
            <Form.Group controlId="formHora">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={editCita.hora}
                onChange={handleEditCitaChange}
              />
            </Form.Group>
            <Form.Group controlId="formDoctor">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                type="text"
                name="doctor"
                value={editCita.doctor}
                onChange={handleEditCitaChange}
              />
            </Form.Group>
            <Form.Group controlId="formPaciente">
              <Form.Label>Paciente</Form.Label>
              <Form.Control
                type="text"
                name="paciente"
                value={editCita.paciente}
                onChange={handleEditCitaChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveEditCita}>
            Reagendar cita para <strong>{editCita.paciente}</strong>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para la receta */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Generar Receta Médica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCita && (
            <>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Detalles del Paciente</Card.Title>
                  <Card.Text>
                    <strong>Paciente:</strong> {selectedCita.usa_nombre} {selectedCita.usa_apellidos}
                    <br />
                    <strong>Edad:</strong> {selectedCita.usa_edad}
                    <br />
                    <strong>Fecha de la Cita:</strong> {formatDate(selectedCita.cit_fecha)}
                    <br />
                    <strong>Hora de la Cita:</strong> {selectedCita.cit_hora}:00
                  </Card.Text>
                </Card.Body>
              </Card>
              <h5>Seleccionar Medicamentos</h5>
              <Form.Control
                type="text"
                placeholder="Buscar productos"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-3"
              />
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Agregar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.pro_nombre}</td>
                      <td>{product.pro_descripcion}</td>
                      <td>{product.pro_precio}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => handleAddProduct(product)}
                        >
                          Agregar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                variant="primary"
                onClick={handleShowAddedProductsModal}
                className="mt-3"
              >
                Ver Productos Agregados
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleShowRecipeModal}>
            Generar Receta
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para ver productos agregados */}
      <Modal show={showAddedProductsModal} onHide={handleCloseAddedProductsModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Productos Agregados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.pro_nombre}</td>
                  <td>{product.pro_descripcion}</td>
                  <td>{product.pro_precio}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddedProductsModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para generar receta */}
      <Modal show={showRecipeModal} onHide={handleCloseRecipeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Receta Médica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Receta médica generada correctamente.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseRecipeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};


