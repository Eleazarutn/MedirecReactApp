import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { IndividualCardServices } from "./IndividualCardServices";

import MedicalConsultation from "../../../assets/HomeImages/MedicalConsultation.jpg";
import PersonalConsultation from "../../../assets/HomeImages/PersonalConsultation.jpg";
import ServicesAndCare from "../../../assets/HomeImages/ServicesAndCare.jpg";
import PayOnLine from "../../../assets/HomeImages/PayOnLine.jpg";
import Pharmacy from "../../../assets/HomeImages/Pharmacy.jpg";
import Doctors from "../../../assets/HomeImages/Doctors.jpg";

export const CardServices = () => {
  return (
    <>
       <Container id="services">
      <Row className="mt-4">
        <div className="text-center w-100">
          <h2>Servicios y comodidades que ofrecemos</h2>
          <p className="lead">
            Descubre las soluciones en línea que te ofrecemos para disfrutar de
            una experiencia excepcional desde la comodidad de tu hogar.
          </p>
        </div>
      </Row>

      <Row className="mt-4">
        <IndividualCardServices
          imgSrc={MedicalConsultation}
          title="Consulta General"
        />
        <IndividualCardServices
          imgSrc={PersonalConsultation}
          title="Consulta Personalizada"
        />
        <IndividualCardServices
          imgSrc={ServicesAndCare}
          title="Servicios y Cuidados"
        />
        <IndividualCardServices
          imgSrc={PayOnLine}
          title="Pago en línea"
        />
        <IndividualCardServices
          imgSrc={Pharmacy}
          title="Farmacia"
        />
        <IndividualCardServices
          imgSrc={Doctors}
          title="Nuestro médicos"
        />
      </Row>
    </Container>
    </>
  );
};
