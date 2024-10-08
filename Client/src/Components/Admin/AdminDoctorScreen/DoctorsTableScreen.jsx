import { React, useEffect, useState } from "react";
import axios from "axios";
import NavAdmin from "../NavAdmin";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  Table,
  Button,
  Container,
  Modal,
  Form,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";

export const DoctorsTableScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectDoctor, setSelectedDoctor] = useState(null);

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

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setShowEditModal(true);
  };

  const handleDelete = (doctor) =>{
    setSelectedDoctor(doctor);
    setShowDeleteModal(true);
  }

  const handleSave = async () => {
    if (!selectDoctor || !selectDoctor.id_doctor) {
      console.error("No doctor selected.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/uptadeDoctor/${selectDoctor.id_doctor}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectDoctor),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Doctor updated", data);
        setShowDeleteModal(false);
        fetchDoctors(); //Llama a fectchDoctors para refrescar la información
      } else {
        console.error("Error updating doctor:", response.statusText);
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectDoctor || !selectDoctor.id_doctor) {
      console.error("No doctor selected or user ID is missing.");
      setShowDeleteModal(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/deleteDoctor/${selectDoctor.id_doctor}`,
        {
          method: "DELETE",
        }
      );

      if(response.ok){
        const data = await response.json();
        console.log("User deleted", data);
        setShowDeleteModal(false);
        fetchDoctors(); //Llama a fetchDoctor para referescar todos los datos de los doctores
      }else{
        console.error("Error deleting doctor:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const generatePDF = async (doctor) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(`Nombre: ${doctor.doc_nombre}`, {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Apellidos: ${doctor.doc_apellidos}`, {
      x: 50,
      y: 320,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Telefono: ${doctor.doc_telefono}`, {
      x: 50,
      y: 290,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Fecha de nacimiento: ${doctor.doc_fecha_nacimiento}`, {
      x: 50,
      y: 260,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Especialidad: ${doctor.doc_especialidad}`, {
      x: 50,
      y: 230,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`No.Licencia: ${doctor.doc_numero_licencia}`, {
      x: 50,
      y: 200,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Hospital de procedencia: ${doctor.doc_afiliacion_hospitalaria}`, {
      x: 50,
      y: 170,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Universdidad de procedencia: ${doctor.doc_educacion}`, {
      x: 50,
      y: 140,
      size: 20,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleGenerateAllUsersPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([1000, 700]); // Aumenta el ancho de la página para mayor espacio horizontal
    let yPosition = 650; // Ajusta la posición inicial en la hoja horizontal
    const tableTop = yPosition;
    const rowHeight = 20;
    const columnWidth = 150; // Ajusta el ancho de columna según sea necesario
    const margin = 40;

    // Carga la fuente estándar
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Draw table headers with bold font
    const headers = [
      "Nombre",
      "Apellidos",
      "Fecha de nacimiento",
      "Especialidad",
      "No.Licencia",
      "Hospital de procedencia",
      "Escuela de procedencia"
    ];
    headers.forEach((header, index) => {
      page.drawText(header, {
        x: margin + index * columnWidth,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
        font: boldFont,
      });
    });

    // Draw table borders
    const tableWidth = columnWidth * headers.length;
    const tableHeight = yPosition - rowHeight; // Distance from top of the page to the end of the table
    page.drawRectangle({
      x: margin - 5,
      y: yPosition - rowHeight,
      width: tableWidth + 10,
      height: tableHeight - yPosition + rowHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    yPosition -= rowHeight;

    doctors.forEach((doctor) => {
      if (yPosition < margin) {
        page.addPage([1000, 700]); // Nueva página con orientación horizontal
        yPosition = tableTop - rowHeight;

        // Draw table headers on the new page
        headers.forEach((header, index) => {
          page.drawText(header, {
            x: margin + index * columnWidth,
            y: yPosition,
            size: 10,
            color: rgb(0, 0, 0),
            font: boldFont,
          });
        });

        yPosition -= rowHeight;

        // Draw table borders
        page.drawRectangle({
          x: margin - 5,
          y: yPosition - rowHeight,
          width: tableWidth + 10,
          height: tableHeight - yPosition + rowHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }

      page.drawText(doctor.doc_nombre, {
        x: margin,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(doctor.doc_apellidos, {
        x: margin + columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(doctor.doc_telefono, {
        x: margin + 2 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(doctor.doc_fecha_nacimiento, {
        x: margin + 3 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(doctor.doc_especialidad, {
        x: margin + 4 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(doctor.doc_numero_licencia, {
        x: margin + 5 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });

      // Draw table row lines
      page.drawRectangle({
        x: margin - 5,
        y: yPosition - rowHeight,
        width: tableWidth + 10,
        height: rowHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });

      yPosition -= rowHeight;
    });

    // Draw the bottom border of the last row
    page.drawRectangle({
      x: margin - 5,
      y: yPosition - rowHeight,
      width: tableWidth + 10,
      height: rowHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <>
      <NavAdmin />
      <Container>
        <h1 className="my-4 text-center">Doctores</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Telefono</th>
              <th>Fecha Nacimiento</th>
              <th>Especialidad</th>
              <th>No. Cedula profesional</th>
              <th>Hospital practicas</th>
              <th>Univiersidad egreso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id_doctor}>
                <td>{doctor.doc_nombre}</td>
                <td>{doctor.doc_apellidos}</td>
                <td>{doctor.doc_telefono}</td>
                <td>{doctor.doc_fecha_nacimiento}</td>
                <td>{doctor.doc_especialidad}</td>
                <td>{doctor.doc_numero_licencia}</td>
                <td>{doctor.doc_afiliacion_hospitalaria}</td>
                <td>{doctor.doc_educacion}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(doctor)}>
                    <FaEdit />
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(doctor)}>
                    <FaTrashAlt />
                  </Button>{" "}
                  <Button variant="info" onClick={() => generatePDF(doctor)}>
                    <FaFilePdf />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" onClick={handleGenerateAllUsersPDF}>
          Generar PDF de todos los usuarios
        </Button>

        {/**Modal para editar datos de doctores */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_nombre || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <FormGroup controlId="forSurname">
                <FormLabel>Apellido</FormLabel>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_apellidos || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_apellidos: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup controlId="formPhone">
                <FormLabel>Telefono</FormLabel>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_telefono || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_telefono: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup controlId="formBirthday">
                <FormLabel>Fecha de nacimiento</FormLabel>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_fecha_nacimiento || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_fecha_nacimiento: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup controlId="formEspecial">
                <FormLabel>Especialidad</FormLabel>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_especialidad || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_especialidad: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup controlId="formLicnese">
                <FormLabel>No.Licencia</FormLabel>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_numero_licencia || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_numero_licencia: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup controlId="formHospital">
                <FormLabel>Hospital de procedencia</FormLabel>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_afiliacion_hospitalaria || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_afiliacion_hospitalaria: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup controlId="formEducation">
                <FormLabel>Universidad de procedencia</FormLabel>
                <Form.Control
                  type="text"
                  value={selectDoctor?.doc_educacion || ""}
                  onChange={(e) =>
                    setSelectedDoctor({
                      ...selectDoctor,
                      doc_educacion: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Modal>

        {/**Modal para eliminar un doctor */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas eliminar a este usuario?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};
