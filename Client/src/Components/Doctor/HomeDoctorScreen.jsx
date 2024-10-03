import React from 'react'
import { useEffect, useState } from 'react'
import { NavDoctorScreen } from './NavDoctorScreen';
import { DashDoctor } from './DashDoctor';


export const HomeDoctorScreen = () => {
  
  const[user, setUser] = useState(null);

 
 

  
  return (
    <>
      <NavDoctorScreen/>
      <DashDoctor/>
      

    </>
  );
}
