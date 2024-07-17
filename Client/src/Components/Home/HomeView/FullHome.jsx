import React from 'react'
import { NavBar } from '../NavBar'
import { PromoCard } from '../PromoServiceCard'
import { CardServices } from '../ServicesCard/CardServices'
import { PromoPharmacyCard } from '../PromoPharmacyCard'
import { PromoSolutionsCard } from '../PromoSolutionsCard'
import { ScheduleAppointmentCard } from '../ShceduleAppointment'
import { PromoMedicalEquipment } from '../DoctorCard/PromoMedicalEquipment'
import { Footer } from '../Footer'


export const FullHome = () => {
  return (
    <>
        <NavBar/>
        <PromoCard/>
        <CardServices/>
        <PromoPharmacyCard/>
        <PromoSolutionsCard/>
        <ScheduleAppointmentCard/>
        <PromoMedicalEquipment/>
        <Footer/>
    </>
  )
}
