export const DeleteProduct =(app, dbMedirec) =>{
    
        app.delete("/deleteProduct/:id_producto", async (req,res) =>{
            const {id_producto} = req.params;
            
    
            try{
                //Elimina el usuario en la base de datos
                const result = await dbMedirec.query('DELETE FROM producto WHERE id_producto = ?', [id_producto]);
    
                if(result.affectedRows === 0){
                    //Si no se elimina el ningún usuario, significa que no se encontro el ID
                    return res.status(404).json({message:"Product not found"});
                }
    
                res.status(200).json({message: "Product deleted successfully"});
            }catch(error){
                console.error("Error deleting Product:", error);
                res.status(500).json({message:"Internal Server Error"});
            }
        })
    
}