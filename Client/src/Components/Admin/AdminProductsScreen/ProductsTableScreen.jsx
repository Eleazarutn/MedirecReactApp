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

export const ProductsTableScreen = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/getProducts");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error("Error fetching products", error);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleEdit = (product) => {
    setSelectProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectProduct(product);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    if (!selectProduct || !selectProduct.id_producto) {
      console.error("No product selected.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/updateProduct/${selectProduct.id_producto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectProduct),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Product updated", data);
        setShowEditModal(false);
        fetchProducts(); //Llama a fectchDoctors para refrescar la información
      } else {
        console.error("Error updating Product:", response.statusText);
      }
    } catch (error) {
      console.error("Error", error.message);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectProduct || !selectProduct.id_producto) {
      console.error("No product selected or user ID is missing.");
      setShowDeleteModal(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/deleteProduct/${selectProduct.id_producto}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Product deleted", data);
        setShowDeleteModal(false);
        fetchProducts(); //Llama a fetchDoctor para referescar todos los datos de los doctores
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const generatePDF = async (product) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(`Nombre: ${product.pro_nombre}`, {
      x: 50,
      y: 350,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Descripción: ${product.pro_descripcion}`, {
      x: 50,
      y: 320,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Precio: ${product.pro_precio}`, {
      x: 50,
      y: 290,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Stock ${product.pro_stock}`, {
      x: 50,
      y: 260,
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
  
    // Dibujar encabezados de la tabla con fuente en negrita
    const headers = ["Nombre", "Descripción", "Precio", "Stock"];
    headers.forEach((header, index) => {
      page.drawText(header, {
        x: margin + index * columnWidth,
        y: yPosition,
        size: 10,
        color: rgb(0, 0, 0),
        font: boldFont,
      });
    });
  
    // Dibujar bordes de la tabla
    const tableWidth = columnWidth * headers.length;
    const tableHeight = yPosition - rowHeight; // Distancia desde la parte superior de la página hasta el final de la tabla
    page.drawRectangle({
      x: margin - 5,
      y: yPosition - rowHeight,
      width: tableWidth + 10,
      height: tableHeight - yPosition + rowHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
  
    yPosition -= rowHeight;
  
    products.forEach((product) => {
      if (yPosition < margin) {
        page.addPage([1000, 700]); // Nueva página con orientación horizontal
        yPosition = tableTop - rowHeight;
  
        // Dibujar encabezados de la tabla en la nueva página
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
  
        // Dibujar bordes de la tabla
        page.drawRectangle({
          x: margin - 5,
          y: yPosition - rowHeight,
          width: tableWidth + 10,
          height: tableHeight - yPosition + rowHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
      }
  
      page.drawText(product.pro_nombre, {
        x: margin,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(product.pro_descripcion, {
        x: margin + columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(product.pro_precio.toString(), {
        x: margin + 2 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
      page.drawText(product.pro_stock.toString(), {
        x: margin + 3 * columnWidth,
        y: yPosition,
        size: 8,
        color: rgb(0, 0, 0),
        font,
      });
  
      // Dibujar líneas de fila de la tabla
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
  
    // Dibujar el borde inferior de la última fila
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
        <h1 className="my-4 text-center">Productos</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id_producto}>
                <td>{product.id_producto}</td>
                <td>{product.pro_nombre}</td>
                <td>{product.pro_descripcion}</td>
                <td>{product.pro_precio}</td>
                <td>{product.pro_stock}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(product)}>
                    <FaEdit />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product)}
                  >
                    <FaTrashAlt />
                  </Button>{" "}
                  <Button variant="info" onClick={() => generatePDF(product)}>
                    <FaFilePdf />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="primary" onClick={handleGenerateAllUsersPDF}>
          Generar PDF de todos los productos
        </Button>

        {/**Modal para editar datos de doctores */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={selectProduct?.pro_nombre || ""}
                  onChange={(e) =>
                    setSelectProduct({
                      ...selectProduct,
                      pro_nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDescripcion">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  value={selectProduct?.pro_descripcion || ""}
                  onChange={(e) =>
                    setSelectProduct({
                      ...selectProduct,
                      pro_descripcion: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPrecio">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="text"
                  value={selectProduct?.pro_precio || ""}
                  onChange={(e) =>
                    setSelectProduct({
                      ...selectProduct,
                      pro_precio: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="text"
                  value={selectProduct?.pro_stock || ""}
                  onChange={(e) =>
                    setSelectProduct({
                      ...selectProduct,
                      pro_stock: e.target.value,
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
