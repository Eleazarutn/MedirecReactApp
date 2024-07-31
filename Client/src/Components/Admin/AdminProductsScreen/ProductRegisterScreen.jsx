import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavAdmin from "../NavAdmin";
import axios from "axios";

export const ProductRegisterScreen = () => {
  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el envío automático del formulario
    const form = formRef.current;
    event.stopPropagation();
    setValidated(true); // Actualiza el estado para mostrar los errores de validación

    // Validación del formulario usando HTML5
    if (form.checkValidity() === false) {
      return;
    }

    //Recolección de los datos del formulario

    const formData = new FormData(form);
    const ProductData = {
      Nombre : formData.get("formNombre"),
      Descripcion : formData.get("formDescripcion"),
      Precio: formData.get("formPrecio"),
      Stock : formData.get("formStock")
    }

    axios
      .post("http://localhost:3001/RegisterProduct", ProductData)
      .then(() => {
        alert("Producto registrado con éxito");
        form.reset(); // Limpia el formulario despues del registro
      })
      .catch((error) => console.error("Hubo un error al registrar el producto"));
  };

  return (
    <>
      <NavAdmin />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="justify-content-md-center mt-5">
          <h2 className="text-center mb-4">Registra a un producto</h2>

          <Col md="8">
            <Form
              ref={formRef}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="needs-validation"
            >
              <Form.Group controlId="formNombre" className="mb-3">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="formNombre"
                  required
                  minLength="1"
                  maxLength="50"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el nombre del producto (mín. 1 caracter).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formDescripcion" className="mb-3">
                <Form.Label>Descripción del producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  name="formDescripcion"
                  required
                  minLength="1"
                  maxLength="50"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa la desripción del producto (mín. 1 caracter).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPrecio" className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  name="formPrecio"
                  required
                  min="1"
                  max="60"
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el precio del producto
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formStock" className="mb-3">
                <Form.Label>Ingresa el stok del producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Stock"
                  name="formStock"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa el stock
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group controlId="formTerms" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Registrar un nuevo producto"
                  required
                  name="formTerms"
                />
                <Form.Control.Feedback type="invalid">
                  Debes aceptar los términos y condiciones.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Crear una cuenta
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
