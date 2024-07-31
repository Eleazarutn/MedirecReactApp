export const deleteDoctor = (app,dbMedirec) =>{
    app.delete("/deleteDoctor/:id_doctor", async (req,res) =>{
        const {id_doctor} = req.params;

        try{
            //Elimina el usuario en la base de datos
            const result = await dbMedirec.query('DELETE FROM doctor WHERE id_doctor = ?', [id_doctor]);

            if(result.affectedRows === 0){
                //Si no se elimina el ningún usuario, significa que no se encontro el ID
                return res.status(404).json({message:"Doctor not found"});
            }

            res.status(200).json({message: "Doctor deleted successfully"});
        }catch(error){
            console.error("Error deleting user:", error);
            res.status(500).json({message:"Internal Server Error"});
        }
    })
}