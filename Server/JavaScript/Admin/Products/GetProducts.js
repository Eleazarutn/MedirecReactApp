export const GetProducts = (app,dbMedirec) =>{
    
    app.get("/getProducts", (req, res) =>{
        dbMedirec.query("SELECT * FROM producto",(err,results) =>{
            if(err){
                res.status(500).send(err);
            }else{
                const products = results
                res.json({
                    products: results
                });
            }
        })
    })

}