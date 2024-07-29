export const getProducts = (app , db) =>{
    app.get('/products', (req, res) => {
        const sql = 'SELECT * FROM producto';
        db.query(sql, (err, results) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json(results);
        });
      });
}