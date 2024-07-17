import React from "react";
import ReactDom from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { FullHome } from "../../Components/Home/HomeView/FullHome";
import { Login } from "../../Components/Home/AccessComponents/LoginScreen";
import { ForgotPasswordScreen } from "../../Components/Home/AccessComponents/ForgotPasswordScreen";
import { Register } from "../../Components/Home/AccessComponents/RegisterScreen";


export const RoutesHome = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FullHome/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgotPassword" element={<ForgotPasswordScreen/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
