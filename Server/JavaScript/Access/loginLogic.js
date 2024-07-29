export const loginUser = (app, db) => {
  app.post("/LoginUser", (req, res) => {
    const { email, password } = req.body;

    // Consulta SQL para obtener toda la información del paciente
    const LOGIN_USER_QUERY = `
      SELECT 'paciente' AS rol, usa_nombre AS nombre, usa_email AS email, usa_telefono AS telefono 
      FROM usuario 
      WHERE usa_email = ? AND usa_contraseña = ?`;

    // Consulta SQL para obtener toda la información del doctor
    const LOGIN_DOCTOR_QUERY = `
      SELECT 'doctor' AS rol, doc_nombre AS nombre, doc_email AS email, doc_numero_licencia AS licencia 
      FROM doctor 
      WHERE doc_email = ? AND doc_numero_licencia = ?`;

    // Consulta SQL para obtener toda la información del administrador
    const LOGIN_ADMIN_QUERY = `
      SELECT 'administrador' AS rol, adm_nombre AS nombre, adm_email AS email 
      FROM administrador 
      WHERE adm_email = ? AND adm_password = ?`;

    // Primero intenta buscar en la tabla de usuarios
    db.query(LOGIN_USER_QUERY, [email, password], (err, result) => {
      if (err) {
        console.error("Error al verificar credenciales en la tabla de usuarios:", err);
        return res.status(500).send("Error al verificar credenciales");
      }
      if (result.length > 0) {
        return res.status(200).json(result[0]);
      }

      // Si no se encuentra en la tabla de usuarios, intenta buscar en la tabla de doctores
      db.query(LOGIN_DOCTOR_QUERY, [email, password], (err, result) => {
        if (err) {
          console.error("Error al verificar credenciales en la tabla de doctores:", err);
          return res.status(500).send("Error al verificar credenciales");
        }
        if (result.length > 0) {
          return res.status(200).json(result[0]);
        }

        // Si no se encuentra en la tabla de doctores, intenta buscar en la tabla de administradores
        db.query(LOGIN_ADMIN_QUERY, [email, password], (err, result) => {
          if (err) {
            console.error("Error al verificar credenciales en la tabla de administradores:", err);
            return res.status(500).send("Error al verificar credenciales");
          }
          if (result.length > 0) {
            return res.status(200).json(result[0]);
          }

          // Si no se encuentra en ninguna tabla
          return res.status(401).send("Correo electrónico o contraseña incorrectos");
        });
      });
    });
  });
};
