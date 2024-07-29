import React from "react";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import PromoImage from "../../assets/HomeImages/PromoImage.jpeg";
import GiftIcon from "../../assets/HomeImages/Icons/GiftIcon.png";
import "../../Css/HomeCss/Promo.css";

export const PromoCard = () => {
  return (
    <>
      <Card className="m-4 p-3 shadow-sm">
        <Row className="g-0">
          <Col md={8} className="d-flex flex-column justify-content-center">
            <Card.Body>
              <Button bg="secondary" className="mb-2" href="/register">
                <Image
                  src={GiftIcon}
                  height={"30px"}
                  style={{ marginRight: "10px" }}
                />
                Tu primera consulta gratis
              </Button>
              <Card.Title className="display-5">
                Atención médica en línea por solo $99 MXN
              </Card.Title>
              <Button variant="primary" className="mt-3" href = "/register">
                Comenzar consulta
              </Button>
              <div className="mt-3 d-flex align-items-center">
                <div className="me-2">
                  <Image
                    src={PromoImage}
                    roundedCircle
                    height="30"
                    width="30"
                    alt="Pacientes Atendidos"
                    className="me-1"
                  />
                  <Image
                    src={PromoImage}
                    roundedCircle
                    height="30"
                    width="30"
                    alt="Pacientes Atendidos"
                    className="me-1"
                  />
                  <Image
                    src={PromoImage}
                    roundedCircle
                    height="30"
                    width="30"
                    alt="Pacientes Atendidos"
                    className="me-1"
                  />
                </div>
                <small className="text-muted">
                  Pacientes Atendidos +10,000
                </small>
              </div>
            </Card.Body>
          </Col>
          <Col md={4}>
            <Image src={PromoImage} alt="Promotional" fluid />
          </Col>
        </Row>
      </Card>
    </>
  );
};
