export const getColonias = (app, db) =>{
    app.get('/colonias/:municipio', (req, res) => {
        const { municipio } = req.params;
        const query = 'SELECT * FROM colonias WHERE municipio = ?';
        db.query(query, [municipio], (err, results) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json(results);
          }
        });
      });
} 