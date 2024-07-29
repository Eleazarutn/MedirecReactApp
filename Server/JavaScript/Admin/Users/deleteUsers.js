export const deleteUsers = (app, dbMedirec) => {
  app.delete("/deleteUsuario/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;

    try {
      // Elimina el usuario de la base de datos
      const result = await dbMedirec.query('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario]);

      if (result.affectedRows === 0) {
        // Si no se elimina ningún usuario, significa que no se encontró el ID
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};
