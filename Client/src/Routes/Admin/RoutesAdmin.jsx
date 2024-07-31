import React from "react";
import ReactDom from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomeAdminScreen } from "../../Components/Admin/HomeAdminScreen";
import { UsersTableAdmin } from "../../Components/Admin/AdminUsersScreen/UsersTableAdmin";
import { DoctorsTableScreen } from "../../Components/Admin/AdminDoctorScreen/DoctorsTableScreen";
import { DoctorsRegisterScreen } from "../../Components/Admin/AdminDoctorScreen/DoctorsRegisterScreen";
import { ProductsTableScreen } from "../../Components/Admin/AdminProductsScreen/ProductsTableScreen";
import { ProductRegisterScreen } from "../../Components/Admin/AdminProductsScreen/ProductRegisterScreen";


export const RoutesAdmin = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/homeAdmin" element={<HomeAdminScreen/>} />
          <Route path="/usersTableAdmin" element={<UsersTableAdmin/>} />
          <Route path="/doctorsTableAdmin" element={<DoctorsTableScreen/>}  />
          <Route path="/registerDoctorAdmin" element={<DoctorsRegisterScreen/>}/>
          <Route path="/productsTableAdmin" element={<ProductsTableScreen/>}/>
          <Route path="/productRegisterAdmin" element={<ProductRegisterScreen/>}/>
        </Routes>
      </BrowserRouter>
    </>
  ); 
};
 