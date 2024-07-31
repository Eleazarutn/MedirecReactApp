export const RegisterProduct = (app, dbMedirec) => {
  app.post("/RegisterProduct", (req, res) => {
    const {
      formNombre = req.body.Nombre,
      formDescripcion = req.body.Descripcion,
      formPrecio = req.body.Precio,
      formStock = req.body.Stock,
    } = req.body;

    const INSERT_PRODUCT_QUERY = `INSERT INTO producto(pro_nombre,pro_descripcion,pro_precio,pro_stock) VALUES(?,?,?,?)`;

    dbMedirec.query(
      INSERT_PRODUCT_QUERY,
      [
        formNombre,
        formDescripcion,
        formPrecio,
        formStock
      ],
      (err,result) =>{
        if(err){
          console.error("Error al registar el producto", err);
          res.status(400).send("Error al registrar doctor");
        }else{
          console.log("Producto Registrado correctamente");
          res.status(200).send("Producto registrado correctamente")
        }
      }
    )
  });
};
 