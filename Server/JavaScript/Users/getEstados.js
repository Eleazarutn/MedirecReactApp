export const getEstados = (app, db) => {
  app.get("/estados", (req, res) => {
    const query = "SELECT * FROM estados";
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  });
};
