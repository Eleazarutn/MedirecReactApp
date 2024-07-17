export const getMunicipios = (app ,db) => {
  app.get("/municipios/:estado", (req, res) => {
    const { estado } = req.params;
    const query = "SELECT * FROM municipios WHERE estado = ?";
    db.query(query, [estado], (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
};
