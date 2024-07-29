import React from "react";
import ReactDom from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FullPaciente } from "../../Components/PacienteScreens/PacienteView/FullPaciente";

import { PharmacyPaciente } from "../../Components/PacienteScreens/PharmacyPaciente";

export const RoutesPaciente = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/homePaciente" element={<FullPaciente/>} />
          <Route path="/farmaciaPaciente" element={<PharmacyPaciente/>} />
        </Routes>
      </BrowserRouter>
    </>
  ); 
};
