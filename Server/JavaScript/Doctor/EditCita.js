export const EditCita = (app, dbMedirec) => {
  app.put("/updateCita/:id", (req, res) => {
    const { id } = req.params;
    const { fecha, hora, doctor, paciente } = req.body;
    const query =
      "UPDATE citas SET cit_fecha = ?, cit_hora = ?, doc_nombre = ?, usa_nombre = ? WHERE id_cita = ?";
    connection.query(
      query,
      [fecha, hora, doctor, paciente, id],
      (error, results) => {
        if (error) {
          console.error("Error al actualizar la cita:", error);
          res.status(500).send("Error al actualizar la cita");
        } else {
          res.sendStatus(204);
        }
      } 
    );
  });
};
