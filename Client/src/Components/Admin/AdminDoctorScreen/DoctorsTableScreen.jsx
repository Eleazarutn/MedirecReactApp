import { React, useEffect , useState} from "react";
import axios from "axios";
import NavAdmin from "../NavAdmin";
import { Table, Button, Container, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa";
export const DoctorsTableScreen = () => {

  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3001/getDoctors");
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        console.error("Error fetching Doctors:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching doctors", error);
    }
  };

  useEffect(() =>{
    fetchDoctors();
  },[])

  

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
              <th>Edad</th>
              <th>Télefono</th>
              <th>Estado</th>
              <th>Municipio</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map(doctor =>(
              <tr key={doctor.id_doctor}>
                <td>{doctor.doc_nombre}</td>
                <td>{doctor.doc_nombre}</td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
