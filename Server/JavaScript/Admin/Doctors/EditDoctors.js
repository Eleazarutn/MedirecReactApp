export const editDoctors = (app, dbMedirec) =>{
    app.put("/uptadeDoctor/:id_doctor", async (req,res) =>{
        const {id_doctor} = req.params;
        const updateDoctor = req.body;

        //Filtramos solo los campos necesarios para la actualización

        const{
            doc_nombre,
            doc_apellidos,
            doc_telefono,
            doc_fecha_nacimiento,
            doc_especialidad,
            doc_numero_licencia,
            doc_afiliacion_hospitalaria,
            doc_educacion
        } = updateDoctor;

        //Crear un objeto con solo campos que se deben actualizar

        const updateFields = {
            doc_nombre,
            doc_apellidos,
            doc_telefono,
            doc_fecha_nacimiento,
            doc_especialidad,
            doc_numero_licencia,
            doc_afiliacion_hospitalaria,
            doc_educacion
        };

        try{
            //Actualizar el usuario en la base de datos
            const result = await dbMedirec.query('UPDATE doctor SET ? WHERE id_doctor = ?', [updateFields , id_doctor]);

            if(result.affectedRows == 0){
                //Si no se actualizo ningun usuario, significa que no se encontro el ID
                return res.status(404).json({message:"Doctor not found"});
            }
            
            res.status(200).json({message: "User update successfully"});
        }catch(error){
            console.error('Error updating doctor:', error);
            res.statud(500).json({message: "Internal Server Error"})
        }
    })
}