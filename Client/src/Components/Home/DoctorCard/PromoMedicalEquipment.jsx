import React from "react";
import { Container, Row } from "react-bootstrap";
import { IndividualDoctorCard } from "./IndividualDoctorCard";
export const PromoMedicalEquipment = () => {
  return (
    <>
      <Container id="medicalEquipment">
        <div className="text-center mt-4">
          <h2>Conoce nuestro equipo médico</h2>
        </div>
        <Row className="mt-4">
          <IndividualDoctorCard
            nombre={"José Eleazar Hernández Hernández"}
            universidad={"Universidad Técnologica de Nezahualcóyotl"}
            especialidad={"Cardiología"}
            cedula={"5514291751"}
          />
        </Row>
      </Container>
    </>
  );
};
