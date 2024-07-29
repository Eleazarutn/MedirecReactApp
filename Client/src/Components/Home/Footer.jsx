import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TyCMedirec from "../../assets/PacienteImages/TyCMedirec.pdf"

import Logo from "../../assets/HomeImages/logo.jpg";
import CofeprisImage from "../../assets/HomeImages/CofeprisImage.jpg";

export const Footer = () => {
  return (
    <>
      <footer className="mt-4 pt-4 pb-2 bg-light">
       
        <Container>
          <Row>
            {/* Primer reglón */}
            <Col className="text-start">
              <img
                src={Logo}
                alt="Logo"
                style={{ height: "30px", marginRight: "10px" }}
              />
              medirec9@gmail.com
            </Col>
          </Row>
          <Row className="mt-2">
            {/* Segundo reglón */}
            <Col className="d-flex justify-content-start align-items-center">
              <InstagramIcon style={{ fontSize: 30, margin: "0 5px" }} />
              <FacebookIcon style={{ fontSize: 30, margin: "0 5px" }} />
              <TwitterIcon style={{ fontSize: 30, margin: "0 5px" }} />
              <div style={{ marginLeft: "10px" }}>
                <strong>Legal</strong>, <a href={TyCMedirec} download={TyCMedirec}>Términos y condiciones</a>,{" "}
                <a href={TyCMedirec} download={TyCMedirec}>Aviso de privacidad</a>
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            {/* Tercer reglón */}
            <Col className="text-start">
              © Aviso de Funcionamiento COFEPRIS 2309155036X00088. Responsable
              Sanitario: Dr. Omar Luna Burgos. Cédula Profesional 8840290.
              Universidad Anáhuac.
              <div className="mt-2" style={{ maxWidth: "100%", overflow: "hidden" }}>
                <img
                  src={CofeprisImage}
                  alt="Imagen de ejemplo"
                  style={{
                    maxWidth: "150px",
                    height: "auto",
                    maxHeight: "150px",
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
