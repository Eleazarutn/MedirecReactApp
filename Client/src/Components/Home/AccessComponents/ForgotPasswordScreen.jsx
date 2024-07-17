// ForgotPasswordScreen.js

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Logo from "../../../assets/HomeImages/logo.jpg";

import { NavBar } from "../NavBar";

export const ForgotPasswordScreen = () => {
  return (
    <>
      <NavBar/>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <Row className="justify-content-center text-center">
          <Col lg={6} xl={8}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "80%",
                maxHeight: "250px",
                marginBottom: "30px",
              }}
            />
            <h2>¿Olvidaste tu contraseña?</h2>
            <p>
              <strong>¡No te preocupes!</strong> Escribe el email con el que te
              diste de alta en <em>Medirec</em> y recibe instrucciones para
              recuperarla.
            </p>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  style={{ marginBottom: "15px" }}
                />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Enviar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
