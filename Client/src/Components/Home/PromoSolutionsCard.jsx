import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import SolutionImage from '../../assets/HomeImages/SolutionImage.jpg';

export const PromoSolutionsCard = () => {
  return (
    <>
      <Container className="mt-4" id="solutions">
        <Row>
          <Col>
            <hr className="mb-4" /> {/* Línea de separación */}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <h1>Soluciones médicas desde tu casa.</h1>
            <div className="ml-3">
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Pagos en línea</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Experiencia personalizada</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Historial médico en tu bolsillo</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Recetas médicas en línea</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Farmacia virtual</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Renovación de recetas y medicamentos</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Conoce a tus médicos</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24} className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Confidencialidad médica</h5>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <FaCheckCircle size={24}  className="mr-3" /> {/* Ajuste del margen */}
                <div>
                  <h5>Fácil e intuitivo</h5>
                </div>
              </div>
            </div>
          </Col>
          <Col
            xs={12}
            md={6}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <img
              src= {SolutionImage}
              alt="Imagen de farmacia en línea"
              className="img-fluid mb-2"
              style={{ maxHeight: "500px", width: "100%" }}
            />
            <Button variant="primary" className="mt-2">
              Agenda tu primera consulta
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PromoSolutionsCard;
