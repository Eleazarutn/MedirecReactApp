export const EditProduct = (app, dbMedirec) => {
  app.put("/updateProduct/:id_producto", async (req, res) => {

    const {id_producto} = req.params;
        const updateProduct = req.body;


    const { pro_nombre, pro_descripcion, pro_precio, pro_stock } =
      updateProduct;

    const updateFields = {
      pro_nombre,
      pro_descripcion,
      pro_precio,
      pro_stock,
    };

    try {
      //Actualizar el usuario en la base de datos
      const result = await dbMedirec.query(
        "UPDATE producto SET ? WHERE id_producto = ?",
        [updateFields, id_producto]
      );

      if (result.affectedRows == 0) {
        //Si no se actualizo ningun usuario, significa que no se encontro el ID
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product update successfully" });
    } catch (error) {
      console.error("Error updating Product:", error);
      res.statud(500).json({ message: "Internal Server Error" });
    }
  });
};
