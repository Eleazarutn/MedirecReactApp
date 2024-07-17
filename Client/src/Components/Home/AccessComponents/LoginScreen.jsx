import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavBar } from "../NavBar";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    // Add your login logic here
    console.log("Form submitted!");
  };

  return (
    <>
      <NavBar />

      <Container
        fluid
        className="vh-100 d-flex align-items-center justify-content-center"
      >
        <Row className="w-75">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src="https://via.placeholder.com/400"
              alt="Placeholder"
              style={{ width: "80%", height: "100%", border: "1px solid black" }}
            />
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center">
            <h1>Hola!</h1>
            <h3>Buenos días</h3>
            <p>Inicia sesión con tu cuenta.</p>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo / Usuario</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo o usuario"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un correo válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    minLength={6}
                    required
                  />
                  <Button
                    variant="link"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  La contraseña es requerida.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="d-flex justify-content-between mb-3">
                <Form.Text className="text-muted">
                  <a href="/forgotPassword">¿Olvidaste tu contraseña?</a>
                </Form.Text>
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Button variant="primary" type="submit">
                  Iniciar Sesión
                </Button>
                <Button variant="secondary" type="button" href="/register">
                  Regístrate
                </Button>
              </div>

              <div className="text-center">
                <p>Ó</p>
                <Button
                  variant="outline-dark"
                  className="d-flex align-items-center justify-content-center w-100 mb-2"
                >
                  <span className="me-2">G</span>Continuar con Google
                </Button>
                <Button
                  variant="outline-dark"
                  className="d-flex align-items-center justify-content-center w-100"
                >
                  <span className="me-2">f</span>Continuar con Facebook
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};


