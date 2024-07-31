export const RegisterDoctor = (app, dbMedirec) => {
  app.post("/RegisterDoctor", (req, res) => {
 
    const {
      formFirstName = req.body.Nombre,
      formLastName = req.body.Apellido,
      formEspecialidad = req.body.Especialidad,
      formFechaNacimiento = req.body.FechaNacimiento,
      formTelefono = req.body.Telefono,
      formEmail = req.body.Email,
      formEstado = req.body.Estado,
      formMunicipio = req.body.Estado,
      formColonia = req.body.Colonia,
      formLicencia = req.body.Licencia,
      formExperiencia = req.body.Experiencia,
      formHospitalProcedencia = req.body.HospitalProcedencia,
      formTarifa = req.body.Tarifa,
      formEducacion = req.body.Educación,
      rol = 2
    } = req.body;

    console.log(req.body.Estado);

    // Debemos asegurarnos que los nombnres de la columna sean correctos en la base de datos
    const INSERT_DOCTOR_QUERY = `INSERT INTO doctor(doc_nombre , doc_apellidos , doc_especialidad , doc_fecha_nacimiento , doc_telefono , doc_email , doc_estado , doc_municipio , doc_colonia , doc_numero_licencia , doc_anios_experiencia , doc_afiliacion_hospitalaria , doc_tarifa_consulta , doc_educacion , rol ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    dbMedirec.query(
      INSERT_DOCTOR_QUERY,
      [
        formFirstName,
        formLastName,
        formEspecialidad,
        formFechaNacimiento,
        formTelefono,
        formEmail,
        formEstado,
        formMunicipio,
        formColonia,
        formLicencia,
        formExperiencia,
        formHospitalProcedencia,
        formTarifa,
        formEducacion,
        rol
      ],
      (err, result) => {
        if (err) {
          console.error("Error al registrar el doctor:", err);
          res.status(400).send("Error al registrar doctor");
        } else {
          console.log("Doctor registrado correctamente");
          res.status(200).send("Doctor registrado correctamente");
        }
      }
    );
  });
};
