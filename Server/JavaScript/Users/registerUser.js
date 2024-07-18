export const registerUser = (app, db) => {
  // Ruta para registrar usuarios
  app.post("/RegisterUser", (req, res) => {
    const {
      formFirstName = req.body.Nombre,
      formLastName = req.body.Apellido,
      formEdad = req.body.Edad,
      formTelefono = req.body.Telefono,
      formEstado = req.body.Estado,
      formMunicipio = req.body.Municipio,
      formColonia = req.body.Colonia,
      formAlergias = req.body.Alergias,
      formEmail = req.body.Correo,
      formPassword = req.body.Contraseña,
      id_rol = 2,
    } = req.body;

    // Asegúrate de usar los nombres de columna correctos en tu tabla de base de datos
    const INSERT_USER_QUERY = `INSERT INTO usuario (usa_nombre, usa_apellidos, usa_edad, usa_telefono, usa_estado, usa_municipio, usa_colonia, usa_alergias, usa_email, usa_contraseña, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      INSERT_USER_QUERY,
      [
        formFirstName,
        formLastName, // Asegúrate de que este campo esté correctamente definido en tu formulario
        formEdad,
        formTelefono,
        formEstado,
        formMunicipio,
        formColonia,
        formAlergias,
        formEmail,
        formPassword,
        id_rol,
      ],
      (err, result) => {
        if (err) {
          console.error("Error al registrar usuario:", err);
          res.status(400).send("Error al registrar usuario");
        } else {
          console.log("Usuario registrado correctamente");
          res.status(200).send("Usuario registrado correctamente");
        }
      }
    );
  });
};
