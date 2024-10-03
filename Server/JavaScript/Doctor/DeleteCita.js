export const DeleteCita = (app, dbMedirec) => {
  app.delete("/deleteCita/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM cita WHERE id_cita = ?";
    dbMedirec.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error al eliminar la cita:", error);
        res.status(500).send("Error al eliminar la cita");
      } else {
        res.sendStatus(204);
      }
    });
  });
};