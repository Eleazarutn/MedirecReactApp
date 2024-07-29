export const editUsers = (app, dbMedirec) => {
  app.put("/updateUsuario/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;
    const updatedUser = req.body;

    // Filtrar solo los campos necesarios para la actualización
    const {
      usa_nombre,
      usa_apellidos,
      usa_edad,
      usa_telefono,
      usa_estado,
      usa_municipio,
      usa_colonia,
      usa_alergias,
      usa_email,
      usa_contraseña,
      rol
    } = updatedUser;

    // Crear un objeto con solo los campos que se deben actualizar
    const updateFields = {
      usa_nombre,
      usa_apellidos,
      usa_edad,
      usa_telefono,
      usa_estado,
      usa_municipio,
      usa_colonia,
      usa_alergias,
      usa_email,
      usa_contraseña,
      rol
    };

    try {
      // Actualizar el usuario en la base de datos
      const result = await dbMedirec.query('UPDATE usuario SET ? WHERE id_usuario = ?', [updateFields, id_usuario]);

      if (result.affectedRows === 0) {
        // Si no se actualizó ningún usuario, significa que no se encontró el ID
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
