import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavBar } from "../NavBar";

export const Register = () => {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = (event) => {
    const form = formRef.current;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  };

  return (
    <>
      <NavBar/>

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="justify-content-md-center mt-5">
          <h2 className="text-center mb-4">
            Estás a un paso de transformar tu salud
          </h2>

          <Col md="6">
            <h3 className="mb-4">Crea una cuenta</h3>
            <Form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              className="needs-validation"
            >
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  required
                  minLength="2"
                  maxLength="50"
                  isInvalid={false} // Cambiar a true si hay error
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu nombre (mín. 2 caracteres).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellido"
                  required
                  minLength="2"
                  maxLength="50"
                  isInvalid={false} // Cambiar a true si hay error
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa tu apellido (mín. 2 caracteres).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  isInvalid={false} // Cambiar a true si hay error
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa un correo electrónico válido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    required
                    minLength="6"
                    isInvalid={false} // Cambiar a true si hay error
                  />
                  <Button
                    variant="link"
                    className="btn-icon"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  La contraseña debe tener al menos 6 caracteres.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar Contraseña"
                    required
                    minLength="6"
                    isInvalid={false} // Cambiar a true si hay error
                  />
                  <Button
                    variant="link"
                    className="btn-icon"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">
                  Las contraseñas no coinciden.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formTerms" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Crear una cuenta y aceptar términos y condiciones"
                  required
                  isInvalid={false} // Cambiar a true si hay error
                />
                <Form.Control.Feedback type="invalid">
                  Debes aceptar los términos y condiciones.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Crear una cuenta
              </Button>

              <Button
                variant="outline-dark"
                className="w-100 mb-3 d-flex align-items-center justify-content-center"
              >
                <FaGoogle className="me-2" />
                <span>Crea una cuenta con Google</span>
              </Button>

              <Button
                variant="primary"
                className="w-100 d-flex align-items-center justify-content-center"
              >
                <FaFacebook className="me-2" />
                <span>Crea una cuenta con Facebook</span>
              </Button>
            </Form>

            <p className="mt-3 text-center">
              ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
