import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavBar } from "../NavBar";
import axios from 'axios';

export const Register = () => {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [validated, setValidated] = useState(false);

  const [states, setStates] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [colonies, setColonies] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedColonia, setSelectedColonia] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/estados')
      .then(response => setStates(response.data))
      .catch(error => console.error('Error al cargar los estados:', error));
  }, []);

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    console.log(stateId);
    setSelectedState(stateId);
    setMunicipalities([]);
    setColonies([]);
    axios.get(`http://localhost:3001/municipios/${stateId}`)
      .then(response => setMunicipalities(response.data))
      .catch(error => console.error('Error al cargar los municipios:', error));
  };

  const handleMunicipalityChange = (event) => {
    const municipalityId = event.target.value;
    setSelectedMunicipality(municipalityId);
    setColonies([]);
    axios.get(`http://localhost:3001/colonias/${municipalityId}`)
      .then(response => setColonies(response.data))
      .catch(error => console.error('Error al cargar las colonias:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;
    const password = form.formPassword.value;
    const confirmPassword = form.formConfirmPassword.value;

    let valid = true;

    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe contener al menos un número y un carácter especial.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (form.checkValidity() === false || !valid) {
      event.stopPropagation();
      setValidated(true);
    } else {
      // Aquí puedes manejar el envío del formulario si es válido
      console.log("Formulario válido, enviar datos...");
    }
  };

  const validatePassword = (password) => {
    // Implementa la lógica de validación de contraseña
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return regex.test(password);
  };

  return (
    <>
      <NavBar />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="justify-content-md-center mt-5">
          <h2 className="text-center mb-4">
            Estás a un paso de transformar tu salud
          </h2>

          <Col md="8">
            <h3 className="mb-4">Crea una cuenta</h3>
            <Form
              ref={formRef}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="needs-validation"
            >
              {/* Otros campos del formulario */}

              <Form.Group controlId="formEstado" className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">Selecciona tu estado</option>
                  {Array.isArray(states) && states.map((state) => (
                    <option key={state.id} value={state.id}>{state.nombre}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecciona tu estado.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formMunicipio" className="mb-3">
                <Form.Label>Municipio</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={selectedMunicipality}
                  onChange={handleMunicipalityChange}
                >
                  <option value="">Selecciona tu municipio</option>
                  {Array.isArray(municipalities) && municipalities.map((municipality) => (
                    <option key={municipality.id} value={municipality.id}>{municipality.nombre}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecciona tu municipio.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formColonia" className="mb-3">
                <Form.Label>Colonia</Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={selectedColonia}
                  onChange={(e) => setSelectedColonia(e.target.value)}
                >
                  <option value="">Selecciona tu colonia</option>
                  {Array.isArray(colonies) && colonies.map((colonia) => (
                    <option key={colonia.id} value={colonia.id}>{colonia.nombre}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecciona tu colonia.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Otros campos del formulario */}

              <Button type="submit" className="w-100 mb-3">Crear cuenta</Button>
            </Form>

            <hr className="my-4" />

            <Button variant="danger" className="w-100 mb-3">
              <FaGoogle className="me-2" /> Registrarse con Google
            </Button>
            <Button variant="primary" className="w-100 mb-3">
              <FaFacebook className="me-2" /> Registrarse con Facebook
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
