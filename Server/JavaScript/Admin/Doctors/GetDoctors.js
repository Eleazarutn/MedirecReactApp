export const GetDoctors = (app, dbMedirec) => {
  app.get("/getDoctors", (req, res) => {
    dbMedirec.query("SELECT * FROM doctor", (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const doctors = results;
        res.json({
          doctors: results,
        });
      }
    });
  });
};