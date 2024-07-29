import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import '../../Css/PacienteCss/Paciente.css'; // Asegúrate de importar el archivo CSS
import AgendarCita from '../../assets/PacienteImages/AgendarCita.jpg';
import RecetaMedica from '../../assets/PacienteImages/RecetaMedica.jpg';
import HisCitas from '../../assets/PacienteImages/HisCitas.jpg';

export const DashPaciente = () => {
  const [userName, setUserName] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData);

 

  const actions = [
    {
      title: "Agendar Cita",
      description:
        "Programa una nueva cita con tu médico de manera rápida y sencilla.",
      imageUrl: AgendarCita,
      link: "#",
    },
    {
      title: "Historial de Recetas", 
      description: "Consulta todas las recetas que te han sido prescritas.",
      imageUrl: RecetaMedica,
      link: "#",
    },
    {
      title: "Historial de Citas",
      description: "Revisa el historial de todas tus citas médicas anteriores.",
      imageUrl: HisCitas,
      link: "#",
    },
  ];

  return (
    <Container>
      <h1 className="my-4 text-center">Bienvenido {userData.nombre}</h1>
      <h2 className="my4 text-center">¿Qué haremos el día de hoy?</h2>
     
      <Row>
        {actions.map((action, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card className="card-equal-height">
              <Card.Img variant="top" src={action.imageUrl} className="card-img" />
              <Card.Body>
                <Card.Title>{action.title}</Card.Title>
                <Card.Text>{action.description}</Card.Text>
                <Button variant="primary" href={action.link}>
                  Más información
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
