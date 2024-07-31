import React, { useState, useEffect } from "react";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";
import NavAdmin from "../NavAdmin";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const UsersTableAdmin = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/getUsuarios");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users); // Assuming your backend sends an object with users
      } else {
        console.error("Error fetching users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //Editar usuarios
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  //Borrar usuarios
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    if (!selectedUser || !selectedUser.id_usuario) {
      console.error("No user selected.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/updateUsuario/${selectedUser.id_usuario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedUser),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User updated:", data);
        setShowEditModal(false);
        fetchUsers(); // Call fetchUsers here to refresh the user list
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //Confirmar borrado
  const handleConfirmDelete = async () => {
    if (!selectedUser || !selectedUser.id_usuario) {
      console.error("No user selected or user ID is missing.");
      setShowDeleteModal(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/deleteUsuario/${selectedUser.id_usuario}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User deleted:", data);
        setShowDeleteModal(false);
        fetchUsers(); // Call fetchUsers here to refresh the user list
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //Generar pdf individual
  const generatePDF = async (user) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(`Nombre: ${user.usa_nombre}`, {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Apellidos: ${user.usa_apellidos}`, {
      x: 50,
      y: 320,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Edad: ${user.usa_edad}`, {
      x: 50,
      y: 290,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Teléfono: ${user.usa_telefono}`, {
      x: 50,
      y: 260,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Estado: ${user.usa_estado}`, {
      x: 50,
      y: 230,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Municipio: ${user.usa_municipio}`, {
      x: 50,
      y: 200,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Colonia: ${user.usa_colonia}`, {
      x: 50,
      y: 170,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Alergias: ${user.usa_alergias}`, {
      x: 50,
      y: 140,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${user.usa_email}`, {
      x: 50,
      y: 110,
      size: 20,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  //Generar pdf de todos los usuarios
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
      "Edad",
      "Teléfono",
      "Alergias",
      "Email",
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

    users.forEach((user) => {
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

      page.drawText(user.usa_nombre, {
        x: margin,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(user.usa_apellidos, {
        x: margin + columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(user.usa_edad.toString(), {
        x: margin + 2 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(user.usa_telefono, {
        x: margin + 3 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(user.usa_alergias, {
        x: margin + 4 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(user.usa_email, {
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
        <h1 className="my-4 text-center">Usuarios</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Edad</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Municipio</th>
              <th>Colonia</th>
              <th>Alergias</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id_usuario}>
                <td>{user.usa_nombre}</td>
                <td>{user.usa_apellidos}</td>
                <td>{user.usa_edad}</td>
                <td>{user.usa_telefono}</td>
                <td>{user.usa_estado_nombre}</td>
                <td>{user.usa_municipio_nombre}</td>
                <td>{user.usa_colonia_nombre}</td>
                <td>{user.usa_alergias}</td>
                <td>{user.usa_email}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(user)}>
                    <FaTrashAlt />
                  </Button>{" "}
                  <Button variant="info" onClick={() => generatePDF(user)}>
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

        {/* Edit Modal */}
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
                  value={selectedUser?.usa_nombre || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      usa_nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formSurname">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser?.usa_apellidos || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      usa_apellidos: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAge">
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedUser?.usa_edad || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      usa_edad: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser?.usa_telefono || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      usa_telefono: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAllergies">
                <Form.Label>Alergias</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser?.usa_alergias || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      usa_alergias: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser?.usa_email || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      usa_email: e.target.value,
                    })
                  }
                />
              </Form.Group>
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

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
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
