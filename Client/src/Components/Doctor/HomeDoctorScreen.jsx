import React from 'react'
import { useEffect, useState } from 'react'


export const HomeDoctorScreen = () => {
  
  const[user, setUser] = useState(null);

  useEffect(() =>{
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData);
    setUser(userData);
  });

  
  return (
    <>
    
      <div>
        <h1>Bienvenido médico {user.usa_nombre}</h1>
      </div>

    </>
  );
}
