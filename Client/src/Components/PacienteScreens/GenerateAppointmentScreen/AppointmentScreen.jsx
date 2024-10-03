import React, { useEffect, useRef, useState } from "react";
import { NavPaciente } from "../NavPaciente";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { decodeFromBase64DataUri } from "pdf-lib";
import axios from "axios";

export const AppointmentScreen = () => {
  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);
  const horas = [
    1,
    2,
    3,
    4,
    ,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
  ];
  const userData = JSON.parse(localStorage.getItem("user"));
  
  
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3001/getDoctors");
      if (response.ok) {
        const data = await response.json();
        setDoctors(data.doctors);
      } else {
        console.error("Error fetching Doctors:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = () => {
    event.preventDefault(); // Evita el envío automático del formulario
    const form = formRef.current;
    event.stopPropagation();
    setValidated(true); // Actualiza el estado para mostrar los errores de validación

    // Validación del formulario usando HTML5
    if (form.checkValidity() === false) {
      return;
    }

    //Se recolectan los datos del formulario
    const formData = new FormData(form);

    const appointmentData = {
       Fecha: formData.get("formFecha"),
       Hora: formData.get("formHora"),
       Doctor: formData.get("formMedico"),
       Paciente: userData.email
    };
    

    axios
      .post("http://localhost:3001/RegisterAppointment", appointmentData)
      .then(() => {
        alert("Cita registrada con éxito");
        form.reset(); // Opcional: limpia el formulario después del registro
      })
      .catch((error) => {
        console.error("Hubo un error al agendar la cita", error);
      });
  };
  return (
    <>
      <NavPaciente />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="justify-content-md-center mt-5">
          <h2 className="text-center mb-4">Agenda una cita médica</h2>

          <Col md="8">
            <Form
              ref={formRef}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="needs-validation"
            >
              <Form.Group controlId="formFecha" className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Fecha"
                  name="formFecha"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Ingresa la fecha
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formHora" className="mb-3">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Hora"
                  name="formHora"
                  required
                >
                  <option value=""> Selecciona la hora</option>

                  {horas.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}:00
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Ingresa tu apellido (mín. 1 caracter).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formMedico" className="mb-3">
                <Form.Label>Médico</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Médico"
                  name="formMedico"
                  required
                >
                  <option value=""> Selecciona el medico</option>

                  {doctors.map((doctor) => (
                    <option key={doctor.id_doctor} value={doctor.id_doctor}>
                      {doctor.doc_nombre} {doctor.doc_apellidos}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecciona una hora
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formTerms" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Me comprometo a asistir y en caso de cancelar avisar con 5 horas de anticipo"
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
