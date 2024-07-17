import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

import { getEstados } from './JavaScript/Users/getEstados.js';
import { getMunicipios } from './JavaScript/Users/getMunicipios.js';
import { getColonias } from './JavaScript/Users/getColonias.js';

const app = express();
app.use(cors());
app.use(express.json());

const dbMedirec = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database2medirec"
});

const dbSepomex = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sepomex"
});

getEstados(app,dbSepomex);
getMunicipios(app,dbSepomex);
getColonias(app,dbSepomex);


app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001");
})
