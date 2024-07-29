import React from 'react'
import ReactDOM from 'react-dom/client'
import { NavBar } from './Components/Home/NavBar'
import { PromoCard } from './Components/Home/PromoServiceCard'
import { RoutesHome } from './Routes/Home/RoutesHome'
import { RoutesPaciente } from './Routes/Paciente/RoutesPaciente'
import { RoutesAdmin } from './Routes/Admin/RoutesAdmin'
import { RoutesDoctor } from './Routes/Doctor/RoutesDoctor'
import './Css/Bootstrap/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RoutesHome/>
    <RoutesPaciente/>
    <RoutesDoctor/>
    <RoutesAdmin/>
  </React.StrictMode>,
)
