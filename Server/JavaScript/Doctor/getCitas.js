export const GetCitas = (app, dbMedirec) => {
  app.get("/getCitas", (req, res) => {
    

    dbMedirec.query(
      "SELECT * FROM cita , usuario , doctor WHERE cita.id_usuario = usuario.id_usuario AND cita.id_doctor = doctor.id_doctor ",
      (err, results) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.json({
                citas: results,
            })
        }
      }
    );
  });
};
