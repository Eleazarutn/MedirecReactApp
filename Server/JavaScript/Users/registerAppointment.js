export const registerAppointment = (app, dbMedirec) => {
  app.post("/RegisterAppointment", (req, res) => {
    const {
      formFecha = req.body.Fecha,
      formHora = req.body.Hora,
      formMedico = req.body.Doctor,
      email = req.body.Paciente,
    } = req.body;

    // Consulta para obtener el id_usuario basado en el correo electrónico
    const GET_USER_ID_QUERY = `SELECT id_usuario FROM usuario WHERE usa_email = ?`;

    dbMedirec.query(GET_USER_ID_QUERY, [email], (err, result) => {
      if (err) {
        console.error("Error al obtener id_usuario:", err);
        res.status(400).send("Error al obtener id_usuario");
        return;
      }

      if (result.length === 0) {
        console.error("No se encontró el usuario con ese correo electrónico");
        res.status(404).send("Usuario no encontrado");
        return;
      }

      const idPaciente = result[0].id_usuario;

      // Consulta para insertar la cita
      const INSERT_APPOINTMENT_QUERY = `INSERT INTO cita (cit_fecha, cit_hora, id_doctor, id_usuario) VALUES (?,?,?,?)`;

      dbMedirec.query(
        INSERT_APPOINTMENT_QUERY,
        [formFecha, formHora, formMedico, idPaciente],
        (err, result) => {
          if (err) {
            console.error("Error al registrar cita:", err);
            res.status(400).send("Error al registrar cita");
          } else {
            console.log("Cita registrada correctamente");
            res.status(200).send("Cita registrada correctamente");
          }
        }
      );
    });
  });
};
